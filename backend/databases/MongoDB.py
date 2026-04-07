from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie

from .. import models

from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")

async def init_db():
    client = AsyncIOMotorClient(MONGODB_URL)
    await init_beanie(database=client["localdb"], document_models=[models.users]) # for pending users