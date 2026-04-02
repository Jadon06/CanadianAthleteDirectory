import re
from collections import OrderedDict

import scrapy
from scrapy_playwright.page import PageMethod

from ..items import PlayerOverview, PlayerRecentGame

class UsportsSpider(scrapy.Spider):
    name = "usports"
    allowed_domains = ["en.usports.ca"]
    start_urls = ["https://en.usports.ca/sports/mbkb/2025-26p/players?pos=sh&sort=pts"]

    default_context = "stealth"
    fallback_context = "standard"
    recent_games_limit = 0
    game_log_heading_keywords = ("game-by-game", "game log", "recent games")
    game_log_column_clues = ("date", "opponent", "score", "pts", "reb", "ast", "min", "fg", "3pt")
    min_table_count = 5
    table_wait_timeout = 8000
    extra_wait_ms = 2000
    box_score_columns = ("score", "result")
    game_identity_fields = {
        "game_index",
        "box_score_url",
        "date",
        "date_1",
        "opponent",
        "opponent_1",
        "score",
        "score_1",
        "result",
        "result_1",
    }
    game_key_groups = (
        ("box_score_url",),
        ("date", "date_1", "col", "col_1"),
        ("opponent", "opponent_1", "opponent_2"),
        ("score", "result", "score_1", "result_1"),
    )
    stat_selection_field_map = {
        "min": ("min", "minutes"),
        "ast": ("ast", "assists"),
        "pts": ("pts", "points"),
        "reb": ("reb", "total_rebounds"),
        "stls": ("stl", "stls", "steals"),
        "oreb": ("off", "oreb", "offensive_rebounds", "off_reb"),
        "dreb": ("defense", "dreb", "def_rebounds", "def_reb", "def"),
        "fg": ("fg", "field_goals", "field_goal", "fgm_a"),
        "ft": ("ft", "free_throws", "free_throw"),
        "threept": ("3pt", "three_pt", "three_point", "three_point_field_goals"),
    }

    custom_settings = {
        "FEEDS": {
            "recent_players.json": {
                "format": "json",
                "encoding": "utf8",
                "indent": 2,
                "overwrite": True,
                "item_classes": ["usports_scraper.items.PlayerOverview"],
            },
            "recent_games.json": {
                "format": "json",
                "encoding": "utf8",
                "indent": 2,
                "overwrite": True,
                "item_classes": ["usports_scraper.items.PlayerRecentGame"],
            },
        }
    }

    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(
                url,
                callback=self.parse,
                meta=self.build_playwright_meta(),
            )

    def build_playwright_meta(self, context=None, extra=None):
        page_methods = [
            PageMethod("wait_for_selector", "h1"),
            PageMethod("wait_for_load_state", "networkidle"),
            PageMethod(
                "wait_for_function",
                f"document.querySelectorAll('table').length >= {self.min_table_count}",
                timeout=self.table_wait_timeout,
            ),
            PageMethod("wait_for_timeout", self.extra_wait_ms),
        ]
        meta = {
            "playwright": True,
            "playwright_context": context or self.default_context,
            "playwright_page_methods": page_methods,
        }
        if extra:
            meta.update(extra)
        return meta

    def _retry_with_fallback(self, response, marker):
        if response.meta.get(marker):
            self.logger.warning(
                f"No-JS placeholder persists after retry: {response.url}"
            )
            return None
        self.logger.info(
            f"Retrying {response.url} with context '{self.fallback_context}'"
        )
        return response.follow(
            response.url,
            callback=self.parse_player,
            meta=self.build_playwright_meta(
                context=self.fallback_context,
                extra={marker: True},
            ),
            dont_filter=True,
        )

    def _table_rows(self, table):
        rows = table.xpath(".//tbody/tr[td|th]")
        if rows:
            return rows
        return table.xpath(".//tr[position()>1 and (td|th)]")

    def _table_has_rows(self, table):
        return bool(self._table_rows(table))

    def _extract_table_rows(self, table, response):
        header_nodes = table.xpath(".//thead//tr[1]//th[normalize-space()]")
        if not header_nodes:
            header_nodes = table.xpath(".//tr[1]//th[normalize-space()]")
        if not header_nodes:
            header_nodes = table.xpath(".//tr[1]//td[normalize-space()]")
        if not header_nodes:
            return []

        headers = [node.xpath("normalize-space(.)").get(default="") for node in header_nodes]
        header_keys = self._build_header_keys(headers)
        row_nodes = self._table_rows(table)
        if not row_nodes:
            return []

        parsed_rows = []
        for row in row_nodes:
            cells = row.xpath("./th|./td")
            values = [cell.xpath("normalize-space(.)").get(default="") for cell in cells]
            if not any(values):
                continue
            entry = {}
            for idx, key in enumerate(header_keys):
                entry[key] = values[idx] if idx < len(values) else ""
                if (
                    key in self.box_score_columns
                    and "box_score_url" not in entry
                    and idx < len(cells)
                ):
                    href = cells[idx].xpath(".//a/@href").get()
                    if href:
                        entry["box_score_url"] = response.urljoin(href)
            parsed_rows.append(entry)
        return parsed_rows

    def _collect_gamelog_tables(self, response):
        tables = response.xpath(
            "//div[@id='gamelog']//div[contains(@class, 'dt-scroll-body')]//table"
        )
        parsed = []
        for table in tables:
            rows = self._extract_table_rows(table, response)
            if rows:
                parsed.append(rows)
        return parsed

    def _extract_position(self, response):
        position = response.xpath(
            "normalize-space((//div[contains(@class,'player-attributes')]//ul/li[1])[1])"
        ).get()
        return position if position else ""

    def _build_game_key(self, row, fallback_index=None):
        parts = []
        for group in self.game_key_groups:
            value = ""
            for field in group:
                candidate = row.get(field)
                if candidate:
                    value = candidate
                    break
            parts.append(value)
        if not any(parts) and fallback_index is not None and parts:
            parts[-1] = str(fallback_index)
        return tuple(parts)

    def _merge_gamelog_tables(self, parsed_tables):
        if not parsed_tables:
            return []

        merged = OrderedDict()
        base_rows = parsed_tables[0]
        for idx, row in enumerate(base_rows, start=1):
            key = self._build_game_key(row, fallback_index=idx)
            enriched = dict(row)
            enriched.setdefault("game_index", idx)
            merged[key] = enriched

        for rows in parsed_tables[1:]:
            for row in rows:
                key = self._build_game_key(row)
                target = merged.get(key)
                if not target:
                    fallback_key = self._build_game_key(row, fallback_index=len(merged) + 1)
                    target = {"game_index": len(merged) + 1}
                    target.update(row)
                    merged[fallback_key] = target
                    continue

                for field, value in row.items():
                    if not value or field in self.game_identity_fields:
                        continue
                    if field not in target or not target[field]:
                        target[field] = value

                if row.get("box_score_url") and not target.get("box_score_url"):
                    target["box_score_url"] = row["box_score_url"]

        return list(merged.values())

    def _find_game_log_table(self, response):
        heading_nodes = response.xpath("//h2|//h3|//h4|//h5|//h6")
        for heading in heading_nodes:
            text = heading.xpath("normalize-space(.)").get(default="").lower()
            if any(keyword in text for keyword in self.game_log_heading_keywords):
                table = heading.xpath("following::table[1]")
                if table:
                    candidate = table[0]
                    if self._table_has_rows(candidate):
                        return candidate

        table_candidates = response.xpath(
            "//table[contains(translate(@class, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'game-by-game')]"  # noqa: E501
        )
        if table_candidates:
            for candidate in table_candidates:
                if self._table_has_rows(candidate):
                    return candidate
        return self._guess_game_log_table(response)

    def _guess_game_log_table(self, response):
        for table in response.xpath("//table"):
            header_nodes = table.xpath(
                ".//thead//tr[1]//th[normalize-space()]|.//tr[1]//th[normalize-space()]"
            )
            if not header_nodes:
                header_nodes = table.xpath(
                    ".//thead//tr[1]//td[normalize-space()]|.//tr[1]//td[normalize-space()]"
                )
            headers = [node.xpath("normalize-space(.)").get(default="") for node in header_nodes]
            normalized = [header.lower() for header in headers]
            if len(normalized) < 3:
                continue
            clue_hits = sum(
                1 for clue in self.game_log_column_clues if any(clue in header for header in normalized)
            )
            if clue_hits >= 2 and self._table_has_rows(table):
                return table
        return None

    def _build_header_keys(self, headers):
        seen = {}
        normalized = []
        for header in headers:
            slug = re.sub(r"[^0-9a-zA-Z]+", "_", header).strip("_").lower() or "col"
            count = seen.get(slug, 0)
            seen[slug] = count + 1
            normalized_key = slug if count == 0 else f"{slug}_{count + 1}"
            normalized.append(normalized_key)
        return normalized

    def _normalize_stat_key(self, raw_key):
        return re.sub(r"[^0-9a-zA-Z]+", "_", raw_key).strip("_")

    def _pick_stat_value(self, row, candidates):
        for key in candidates:
            value = row.get(key)
            if value is None:
                continue
            normalized = str(value).strip()
            if normalized and normalized != "-":
                return normalized
        return ""

    def _build_stat_selection_payload(self, row):
        payload = {}
        for target, candidates in self.stat_selection_field_map.items():
            payload[target] = self._pick_stat_value(row, candidates)
        return payload

    def _extract_game_date(self, row):
        # Keep date as a string because game_stats.game_date is a string column.
        for key in ("game_date", "date", "date_1", "col", "col_1"):
            value = row.get(key)
            if value is None:
                continue
            normalized = str(value).strip()
            if normalized and normalized != "-":
                return normalized

        box_score_url = row.get("box_score_url", "")
        if box_score_url:
            match = re.search(r"/(\d{8})_", str(box_score_url))
            if match:
                raw = match.group(1)
                return f"{raw[0:4]}-{raw[4:6]}-{raw[6:8]}"

        return ""

    def _extract_recent_games(self, response):
        parsed_tables = self._collect_gamelog_tables(response)
        if not parsed_tables:
            fallback_table = self._find_game_log_table(response)
            if fallback_table:
                rows = self._extract_table_rows(fallback_table, response)
                if rows:
                    parsed_tables = [rows]

        if not parsed_tables:
            return []

        merged_games = self._merge_gamelog_tables(parsed_tables)
        limit = self.recent_games_limit or 0
        if limit > 0:
            merged_games = merged_games[:limit]
        return merged_games

    def parse(self, response):

        player_links = response.css("a::attr(href)").getall()

        for link in player_links:

            # only real player pages
            if "/sports/mbkb/" not in link:
                continue

            if "/players/" not in link:
                continue

            # remove junk patterns
            if "javascript" in link.lower():
                continue

            if len(link.split("/")) < 6:
                continue

            yield scrapy.Request(
                response.urljoin(link),
                callback=self.parse_player,
                meta=self.build_playwright_meta(),
            )

    def parse_player(self, response):
        name = response.css("h1::text").get(default="")
        if not name:
            retry_request = self._retry_with_fallback(response, "missing_name_retry")
            if retry_request:
                yield retry_request
            else:
                self.logger.warning(f"Blocked page: {response.url}")
            return

        # Strip extra whitespace and skip noscript placeholders like "JavaScript is disabled"
        name = " ".join(name.split())
        if name.lower() == "javascript is disabled":
            retry_request = self._retry_with_fallback(response, "no_js_retry")
            if retry_request:
                yield retry_request
            return

        parts = name.split()
        first_name = parts[0] if len(parts) > 0 else ""
        last_name = " ".join(parts[1:]) if len(parts) > 1 else ""

        overview = {
            "first_name": first_name,
            "last_name": last_name,
            "full_name": name,
            "profile_url": response.url,
        }

        position = self._extract_position(response)
        if position:
            overview["position"] = position

        rows = response.css("table tr")
        terminal_prefix = "points_per_40"

        for row in rows:
            cells = row.css("td")

            if len(cells) < 2:
                continue

            key = cells[0].xpath("normalize-space(.)").get()
            value = cells[1].xpath("normalize-space(.)").get()

            if not key or not value:
                continue

            # skip garbage UI rows
            if "____" in key:
                continue

            normalized_key = self._normalize_stat_key(key)
            overview[normalized_key] = value

            # Stop after the Points_per_40_min stat to avoid schedule clutter rows
            if normalized_key.lower().startswith(terminal_prefix):
                break

        recent_games = self._extract_recent_games(response)
        if not recent_games:
            self.logger.debug(
                "No recent games detected for %s (%s)",
                name,
                response.url,
            )
            if not getattr(self, "_dumped_response", False):
                self._dumped_response = True
                debug_path = "debug_player.html"
                with open(debug_path, "w", encoding="utf-8") as handle:
                    handle.write(response.text)
                self.logger.debug("Saved fallback HTML to %s", debug_path)
        yield PlayerOverview(overview)

        for game in recent_games:
            canonical_stats = self._build_stat_selection_payload(game)
            enriched = {
                "first_name": first_name,
                "last_name": last_name,
                "game_date": self._extract_game_date(game),
            }
            enriched.update(canonical_stats)
            yield PlayerRecentGame(enriched)