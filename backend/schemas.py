from pydantic import BaseModel, EmailStr, model_serializer
from datetime import datetime
from typing import Optional, Annotated
from pydantic import EmailStr, field_validator, StringConstraints
from fastapi import UploadFile, HTTPException, status

class Education(BaseModel):
    school: str
    degree: str
    major: str = None
    minor: str = None
    start_date: str
    end_date: str
    grade: float = None
    activities: str = None
    description: str = None
    skills: str = None

class upcoming_event(BaseModel):
    title: str
    description: str = None
    location: str
    date: datetime

class userCreate(BaseModel):
    Athlete: Optional[bool] = False
    Coach: Optional[bool] = False
    Scout: Optional[bool] = False
    first_name: str
    last_name: str
    email: EmailStr
    phone_number: int
    password: str
    headline: str = None
    education: Optional[Education] = None
    about: str = None
    upcoming_events: upcoming_event = None
    interests: str = None

class userReturn(BaseModel):
    Athlete: Optional[bool] = False
    Coach: Optional[bool] = False
    Scout: Optional[bool] = False
    first_name: str
    last_name: str
    email: EmailStr
    phone_number: int
    headline: Optional[str] = None
    education: Optional[Education] = None
    about: Optional[str] = None
    upcoming_events: Optional[upcoming_event] = None
    interests: Optional[str] = None

    @model_serializer
    def serialize(self):
        data = self.__dict__.copy()

        roles = ["Athlete", "Coach", "Scout"]
        for role in roles:
            if not data.get(role):
                data.pop(role, None)
        return data
    
class userUpdate(userCreate):
    pass

class verificationRequest(BaseModel):
    email: EmailStr
    code: int

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None

class highlight(BaseModel):
    title: str
    content: UploadFile
    description: Optional[Annotated[str, StringConstraints(max_length=150)]] = None
    creator_email: str
    like: Optional[bool] = None

    @field_validator('content')
    @classmethod
    def validate_attatchment(cls, v: UploadFile):
        allowed_extensions = {'.mp4', '.mov', '.avi', '.mkv'}
        if v not in allowed_extensions:
            raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, 
                                detail="content must be a .mp4, .mov, .avi or .mkv file!")
        size_limit = 3 * 1024**3
        if v.size > size_limit:
            raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, 
                                detail="file size too large, must be 3GB or less!")
        return v
    class Settings:
        name = "highlights"

class comment(BaseModel):
    post_id: str
    user_email: str
    content: str