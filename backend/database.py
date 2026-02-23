from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from . import models

connection_string = f"mongodb://mongodb-local:27017/users"

async def init_db():
    client = AsyncIOMotorClient(connection_string)
    await init_beanie(database=client["localdb"], document_models=[models.users])