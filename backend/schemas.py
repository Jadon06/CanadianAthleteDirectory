from pydantic import BaseModel, EmailStr, model_serializer
from datetime import datetime
from typing import Optional, Annotated, List
from pydantic import EmailStr, field_validator, StringConstraints
from fastapi import UploadFile, HTTPException, status

class stats(BaseModel):
    height: str
    weight: str
    age: str
    ppg: str
    assists: str
    rebounds: str
    field_goal_pct: str

class upcoming_event(BaseModel):
    title: str
    description: Optional[str] = None
    location: str
    date: datetime

# class userCreate(BaseModel):
#     first_name: str
#     last_name: str
#     middle_nmae: Optional[str]
#     email: EmailStr
#     phone_number: int
#     password: str
#     headline: Optional[str] = None
#     education: Optional[Education] = None
#     about: Optional[str] = None
#     upcoming_events: Optional[upcoming_event] = None
#     interests: Optional[str] = None

class userCreate(BaseModel):
    email: EmailStr
    password: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    profile_picture: Optional[str] = None
    phone_number: Optional[str] = None
    school: Optional[str] = None
    upcoming_events: Optional[upcoming_event] = None

class userReturn(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    email: EmailStr
    phone_number: int
    school: Optional[str] = None
    about: Optional[str] = None
    upcoming_events: Optional[upcoming_event] = None

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

class userUpdateHeader(BaseModel):
    first_name: Optional[str] 
    last_name: Optional[str]
    middle_name: Optional[str]
    headline: Optional[str]
    phone_number: Optional[str]
    email: Optional[EmailStr]

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

class VerificationTokenData(BaseModel):
    email: Optional[EmailStr] = None

class highlight(BaseModel):
    title: str
    content: UploadFile
    description: Optional[Annotated[str, StringConstraints(max_length=150)]] = None

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

class stat_selection(BaseModel):
    email: EmailStr
    Ast: Optional[bool] = True
    Pts: Optional[bool] = True
    Reb: Optional[bool] = True
    Stls: Optional[bool] = False
    OReb: Optional[bool] = False
    DReb: Optional[bool] = False
    Fg: Optional[bool] = False
    Ft: Optional[bool] = False
    ThreePt: Optional[bool] = False