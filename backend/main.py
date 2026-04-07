from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from .databases.MongoDB import init_db
from .routers import preferences, users, auth, highlights, stats
# from .messaging_system import messaging_router
from . import models
import asyncio
from .routers.messaging_system.redis_pubsub import subscribe
from .routers.messaging_system.websocket_manager import manager
from .routers.messaging_system import messaging_router

import json
from .databases.PostgresDB import get_db, engine, SessionLocal
from sqlalchemy.orm import Session

models.Base.metadata.create_all(bind=engine)

def populate_dbs():
    print("started")
    db = SessionLocal()
    with open("/usr/src/backend/usports_scraper/recent_players.json", "r") as f1, open("/usr/src/backend/usports_scraper/recent_games.json", 'r') as f2:
        player_data = json.load(f1)
        game_data = json.load(f2)

        player_extra_fields = ("position",)

        try:
            for row in player_data:
                stats = models.basketball_stats(**row)
                db.add(stats)
                db.commit()

            for row in game_data:
                stats = models.game_stats(**row)
                db.add(stats)
                db.commit()
        except Exception as e:
            print(e)

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    populate_dbs()
    yield

async def redis_listener():
    async def forward(msg):
        await manager.broadcast("general", msg)

    asyncio.create_task(subscribe("general", forward))

app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

async def on_startup():
    await redis_listener()

app.include_router(users.router)
# app.include_router(messaging_router.router)
app.include_router(auth.router)
app.include_router(highlights.router)
app.include_router(messaging_router.router)
app.include_router(stats.router)
app.include_router(preferences.router)