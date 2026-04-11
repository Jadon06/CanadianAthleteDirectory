import os

from dotenv import load_dotenv
from redis_om import get_redis_connection

load_dotenv()

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

redis_sync = get_redis_connection( # for messaging system
    url=REDIS_URL,
    decode_responses=True
)