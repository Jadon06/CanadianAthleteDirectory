from playwright.sync_api import sync_playwright
from lxml import html
from scrapy.http import HtmlResponse

from usports_scraper.spiders.usports import UsportsSpider

url = "https://en.usports.ca/sports/mbkb/2025-26p/players/aaronrhoomsy5zn"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1366, "height": 768})
    page.goto(url, wait_until="networkidle")
    content = page.content()
    browser.close()

response = HtmlResponse(url=url, body=content.encode("utf-8"), encoding="utf-8")
spider = UsportsSpider()
games = spider._extract_recent_games(response)
print("Parsed game rows:", len(games))
if games:
    print(games[0])

tree = html.fromstring(content)
tables = tree.xpath("//table")
print("Total tables:", len(tables))
for idx, table in enumerate(tables, start=1):
    headers = table.xpath(
        ".//thead//tr[1]//th|.//tr[1]//th|.//thead//tr[1]//td|.//tr[1]//td"
    )
    header_texts = [" ".join(h.text_content().split()) for h in headers]
    preview = header_texts if idx == 3 else header_texts[:8]
    print(f"Table {idx} header count: {len(header_texts)} -> {preview}")
    sample_row = table.xpath(".//tr[position()>1][1]")
    if sample_row:
        cells = sample_row[0].xpath("./th|./td")
        sample_values = [" ".join(c.text_content().split()) for c in cells]
        print(f"  First row sample: {sample_values[:8]}")
    if idx >= 6:
        break

game_table = tables[2]
with open("game_table.html", "w", encoding="utf-8") as f:
    f.write(html.tostring(game_table, encoding="unicode"))
print("Saved table HTML to game_table.html")
