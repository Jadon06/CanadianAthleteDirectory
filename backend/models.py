from beanie import Document, PydanticObjectId
from pydantic import BaseModel, EmailStr, BeforeValidator, Field, ConfigDict
from typing import Optional, Annotated, List, Literal, Dict
from functools import partial
from datetime import datetime, timezone

from . import schemas

class users(Document):
    Athlete: Optional[bool] = False
    Coach: Optional[bool] = False
    Scout: Optional[bool] = False
    first_name: str
    last_name: str
    email: EmailStr
    phone_number: Optional[int] = None
    headline: Optional[str] = None
    education: Optional[schemas.Education] = None
    about: Optional[str] = None
    highlights: Optional[schemas.highlight] = None
    upcoming_events: Optional[schemas.upcoming_event] = None
    interests: Optional[str] = None

    class Settings:
        name = "Users"

