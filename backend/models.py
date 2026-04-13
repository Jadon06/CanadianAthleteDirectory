from beanie import Document
from pydantic import EmailStr, field_validator, StringConstraints, Field
from typing import Optional, Annotated, List, Dict
from datetime import datetime, timezone
from functools import partial
import time
import logging
from redis_om import HashModel, Field, Migrator
from fastapi import File, UploadFile, HTTPException, status

from .databases.redis_db import redis_sync

from . import schemas

from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, CheckConstraint, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from .databases.PostgresDB import Base

logger = logging.getLogger(__name__)

class users(Document):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    full_name: Optional[str] = None
    middle_name: Optional[str] = None
    email: EmailStr
    password: str
    profile_picture: Optional[str] = None
    phone_number: Optional[str] = None
    school: Optional[str] = None
    position: Optional[str] = None
    height: Optional[str] = None
    weight: Optional[str] = None
    age: Optional[str] = None
    user_type: Optional[str] = None
    bio: Optional[str] = None

    class Settings:
        name = "Users"

class pending_users(HashModel, index=True):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    full_name: Optional[str] = None
    middle_name: Optional[str] = None
    email: str = Field(primary_key=True)
    password: str
    phone_number: Optional[str] = None
    highlights: Optional[schemas.highlight] = None
    upcoming_events: Optional[schemas.upcoming_event] = None
    position: Optional[str] = None

    class Meta:
        database = redis_sync

class pending_connections(HashModel, index=True):
    following_id: str
    follower_id: str

    class Meta:
        database = redis_sync

class notifications(HashModel, index=True):
    id: str
    type: str
    title: str
    message: str
    timestamp: str
    read: bool = False

    class Meta:
        database = redis_sync

class stat_selection(HashModel, index=True):
    email: str = Field(primary_key=True)
    Ast: bool = True
    Pts: bool = True
    Reb: bool = True
    Stls: bool = False
    OReb: bool = False
    DReb: bool = False
    Fg: bool = False
    Ft: bool = False
    ThreePt: bool = False

    class Meta:
        database = redis_sync

def run_redis_migrations(max_attempts: int = 10, delay_seconds: float = 1.0) -> bool:
    """Create/update Redis OM indexes with retry to handle container startup timing."""
    for attempt in range(1, max_attempts + 1):
        try:
            Migrator().run()
            logger.info("Redis OM migrations completed.")
            return True
        except Exception as exc:
            if attempt == max_attempts:
                logger.warning("Redis OM migrations skipped after %s attempts: %s", max_attempts, exc)
                return False
            logger.warning(
                "Redis not ready for Redis OM migration (attempt %s/%s): %s",
                attempt,
                max_attempts,
                exc,
            )
            time.sleep(delay_seconds)

class highlights(Base):
    __tablename__ = "highlights"

    id = Column(Integer, primary_key=True, nullable=False)
    User_id = Column(String, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    description = Column(String, nullable=True)
    thumbnail = Column(String, nullable=True)
    date = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))

# class comments(Base):
#     __tablename__ = "comments"
    
#     id = Column(Integer, primary_key=True, nullable=False)
#     post_id = Column(Integer, ForeignKey("highlights", ondelete="CASCADE"), nullable=False)
#     User_id = Column(String, nullable=False)
#     content = Column(String, nullable=False)
#     date = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))

class messages(Base):
    __tablename__ = "messages"
    
    id = Column(Integer, primary_key=True, nullable=False)
    User_id = Column(String, nullable=False)
    content = Column(String, nullable=True)
    sent_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    read = Column(Boolean)

class basketball_stats(Base):
    __tablename__ = "basketball_stats"

    id = Column(Integer, primary_key=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    position = Column(String, nullable=True)
    Games = Column(String, nullable=True)
    Games_started = Column(String, nullable=True)
    Minutes = Column(String, nullable=True)
    Minutes_per_game = Column(String, nullable=True)
    FG = Column(String, nullable=True)
    FG_Pct = Column(String, nullable=True)
    threePT = Column(String, nullable=True)
    threePT_Pct = Column(String, nullable=True)
    FT = Column(String, nullable=True)
    FT_Pct = Column(String, nullable=True)
    Off_rebounds = Column(String, nullable=True)
    Def_rebounds = Column(String, nullable=True)
    Total_rebounds = Column(String, nullable=True)
    Rebounds_per_game = Column(String, nullable=True)
    Personal_fouls = Column(String, nullable=True)
    Disqualifications = Column(String, nullable=True)
    Assists = Column(String, nullable=True)
    Turnovers = Column(String, nullable=True)
    Assist_to_turnover_ratio = Column(String, nullable=True)
    Steals = Column(String, nullable=True)
    Blocks = Column(String, nullable=True)
    Points = Column(String, nullable=True)
    Points_per_game = Column(String, nullable=True)
    Points_per_40_min = Column(String, nullable=True)

class game_stats(Base):
    __tablename__ = "game_stats"

    id = Column(Integer, primary_key=True, nullable=False)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    game_date = Column(String, nullable=True)
    min = Column(String, nullable=True)
    ast = Column(String, nullable=True)
    pts = Column(String, nullable=True)
    reb = Column(String, nullable=True)
    stls = Column(String, nullable=True)
    oreb = Column(String, nullable=True)
    dreb = Column(String, nullable=True)
    fg = Column(String, nullable=True)
    ft = Column(String, nullable=True)
    threept = Column(String, nullable=True)

class connections(Base):
    __tablename__ = "connections"

    following_id = Column(String, nullable=False, primary_key=True)
    follower_id = Column(String, nullable=False)