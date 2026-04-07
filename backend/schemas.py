from pydantic import BaseModel, EmailStr, model_serializer, field_serializer
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
    height: Optional[str] = None
    weight: Optional[str] = None
    age: Optional[str] = None

class userReturn(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    email: EmailStr
    phone_number: int
    school: Optional[str] = None
    about: Optional[str] = None
    upcoming_events: Optional[upcoming_event] = None
    height: Optional[str] = None
    weight: Optional[str] = None
    age: Optional[str] = None

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

class userBuild(BaseModel):
    height: Optional[str]
    weight: Optional[str]
    age: Optional[str]
    school: Optional[str]
    user_type: Optional[str]

class verificationRequest(BaseModel):
    email: EmailStr
    code: int

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[EmailStr] = None
    first_time_login: Optional[bool] = None


class VerificationTokenData(BaseModel):
    email: Optional[EmailStr] = None

class highlight(BaseModel):
    title: str
    content: str
    description: Optional[Annotated[str, StringConstraints(max_length=150)]] = None
    thumbnail: Optional[str]
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

class overall_stat_return(BaseModel):
    first_name: str
    last_name: str
    position: str
    Games: str
    Games_started: str
    Minutes: str
    Minutes_per_game: str
    FG: str
    FG_Pct: str
    threePT: str
    threePT_Pct: str
    FT: str
    FT_Pct: str
    Off_rebounds: str
    Def_rebounds: str
    Total_rebounds: str
    Rebounds_per_game: str
    Personal_fouls: str
    Disqualifications: str
    Assists: str
    Turnovers: str
    Assist_to_turnover_ratio: str
    Steals: str
    Blocks: str
    Points: str
    Points_per_game: str
    Points_per_40_min: str

    class Config:
        orm_mode = True

class highlight_return(BaseModel):
    title: str
    content: str
    description: Optional[Annotated[str, StringConstraints(max_length=150)]] = None
    thumbnail: Optional[str]
    date: str

    @field_serializer('content')
    def embed_yt_url(self, v: str):
        if 'youtube' in v:
            embed_id = v.split("v=")[1]
            v = f"https://www.youtube.com/embed/{embed_id}"
            return v

    class Config:
        orm_mode = True
        json_encoders = {
            datetime: lambda v: v.strftime("%d/%m/%Y")
        }

class user_query(BaseModel):
    content: Optional[str]