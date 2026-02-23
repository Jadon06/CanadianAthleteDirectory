from beanie import Document, PydanticObjectId
from pydantic import BaseModel, EmailStr, BeforeValidator, ConfigDict
from typing import Optional, Annotated, List, Literal, Dict
from functools import partial
from datetime import datetime, timezone
from redis_om import HashModel, Field, Migrator

from .redis import redis_sync

from . import schemas

class users(Document):
    Athlete: Optional[bool] = False
    Coach: Optional[bool] = False
    Scout: Optional[bool] = False
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    phone_number: Optional[int] = None
    headline: Optional[str] = None
    education: Optional[schemas.Education] = None
    about: Optional[str] = None
    highlights: Optional[schemas.highlight] = None
    upcoming_events: Optional[schemas.upcoming_event] = None
    interests: Optional[str] = None

    class Settings:
        name = "Users"

class pending_users(HashModel, index=True):
    Athlete: Optional[bool] = False
    Coach: Optional[bool] = False
    Scout: Optional[bool] = False
    first_name: str
    last_name: str
    email: EmailStr = Field(primary_key=True)
    password: str
    phone_number: Optional[int] = None
    headline: Optional[str] = None
    education: Optional[schemas.Education] = None
    about: Optional[str] = None
    highlights: Optional[schemas.highlight] = None
    upcoming_events: Optional[schemas.upcoming_event] = None
    interests: Optional[str] = None
    code: int

    class Meta:
        database = redis_sync

Migrator().run()