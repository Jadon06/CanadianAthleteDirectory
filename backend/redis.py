from redis import asyncio as aioredis

redis_async = aioredis.Redis(
    host="redis",
    port=6379,
    decode_responses=True
)