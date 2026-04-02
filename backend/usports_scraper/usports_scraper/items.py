# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

class PlayerOverview(dict):
    """Container for roll-up stats scraped from the player profile."""


class PlayerRecentGame(dict):
    """Container for a single game-log row tied to a player."""


__all__ = ["PlayerOverview", "PlayerRecentGame"]
