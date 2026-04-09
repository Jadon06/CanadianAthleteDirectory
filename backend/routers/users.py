from fastapi import APIRouter, HTTPException, status, Depends
from beanie.odm.operators.update.general import Set
from typing import List

from .. import schemas, models, oauth2
from ..utils import email_verification, auth_helpers
from dotenv import load_dotenv
import os

load_dotenv()
TTL = os.getenv("TTL")

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.post("/")#, response_model=schemas.userReturn)
async def create_user(user_info: schemas.userCreate):
    exists = await models.users.find_one(models.users.email == user_info.email)
    if exists:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"User with email:{user_info.email} already exists!")
    
    verification_token = email_verification.verification_token({'email' : user_info.email, "first_time_login" : True})
    pending_user = models.pending_users(**user_info.dict())
    pending_user.password = auth_helpers.hash(pending_user.password)
    pending_user.save()
    pending_user.expire(TTL)
    email_verification.send_verification_email(user_info.email, verification_token)
    return {"status" : "verify email"}

@router.put("/")
async def update_user_header(updated_user: schemas.userUpdate, current_user: int = Depends(oauth2.get_current_user)):
    user = await models.users.find_one(models.users.email == current_user.email)
    data = updated_user.model_dump(exclude_unset=True)
    for field, value in data.items():
        setattr(user, field, value)
    await user.save()
    return user

@router.get("/me" )#, response_class=schemas.userReturn)
async def get_current_user(current_user: int = Depends(oauth2.get_current_user)):
    user = await models.users.find_one(models.users.email == current_user.email)
    print(user)
    if user:
        return user
    else:
        print("failed")

@router.delete("/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(current_user: int = Depends(oauth2.get_current_user)):
    user = models.users.find_one(models.users.email == current_user.email)
    await models.users.delete(user)
