from redis import asyncio as aioredis
import asyncio

redis = aioredis.from_url("redis://localhost:6379", decode_responses=True)

async def publish(room: str, message: str):
    await redis.publish(room, message)

async def subscribe(room: str, callback):
    pubsub = redis.pubsub()
    await pubsub.subscribe(room)

    async for msg in pubsub.listen():
        if msg['type'] == 'message':
            await callback(msg['data'])