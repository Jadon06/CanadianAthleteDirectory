from beanie import Document
from pydantic import EmailStr, field_validator, StringConstraints, Field
from typing import Optional, Annotated, List, Dict
from datetime import datetime, timezone
from functools import partial
from redis_om import HashModel, Field, Migrator
from fastapi import File, UploadFile, HTTPException, status

from .redis_db import redis_sync

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
    headline: Optional[Annotated[str, StringConstraints(max_length=150)]] = None
    education: Optional[schemas.Education] = None
    about: Optional[Annotated[str, StringConstraints(max_length=500)]] = None
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
    headline: Optional[Annotated[str, StringConstraints(max_length=150)]] = None
    education: Optional[schemas.Education] = None
    about: Optional[Annotated[str, StringConstraints(max_length=400)]] = None
    upcoming_events: Optional[schemas.upcoming_event] = None
    interests: Optional[str] = None
    code: int

    class Meta:
        database = redis_sync

Migrator().run()

class highlights(Document):
    title: str
    content: UploadFile
    description: Optional[Annotated[str, StringConstraints(max_length=150)]] = None
    date: datetime = Field(default_factory=partial(datetime.now, timezone.utc))
    creator_email: str
    like: Optional[bool] = None

class comments(Document):
    post_id: str
    user_email: str
    content: str
    date: datetime = Field(default_factory=partial(datetime.now, timezone.utc))