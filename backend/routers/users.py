from fastapi import APIRouter, HTTPException, status, Depends
from beanie.odm.operators.update.general import Set
from typing import List
from .. import schemas, models, oauth2
from ..utils import Search_system, email_verification

from dotenv import load_dotenv
import os

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

load_dotenv()
TTL = os.getenv("TTL")

@router.post("/", response_model=schemas.userReturn)
async def create_user(user_info: schemas.userCreate):
    exists = await models.users.find_one(models.users.email == user_info.email)
    if exists:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"User with email:{user_info.email} already exists!")
    code = email_verification.verification_code()
    pending_user = models.pending_users(**user_info.dict(), code=code)
    await pending_user.save()
    await pending_user.expire(TTL)
    email_verification.send_verification_email(user_info.email, code)
    return {"status" : "verify email"}

@router.post("/verify")
async def verify_and_create_user(verification_request: schemas.verificationRequest):
    pending = await models.pending_users.find(models.pending_users.email == verification_request.email).first()
    if not pending:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail="Pending user not found!!")
    if verification_request.code != pending.code:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
                             detail="verification code expired or incorrect!!")
    new_user = models.users(**pending.dict())
    await models.users.insert(new_user)
    return new_user

@router.put("/")
async def update_user(updated_user: schemas.userUpdate, current_user = Depends(oauth2.get_current_user)):
    user = await models.users.find_one(models.users.email == updated_user.email)
    data = updated_user.model_dump(exclude_unset=True)
    for field, value in data.items():
        setattr(user, field, value)
    await user.save()
    return user

@router.get("/{first_name}:{last_name}", response_model=List[schemas.userReturn])
async def get_user(first_name: str, last_name: str):
    results = await Search_system.recommendations(first_name, last_name)
    if not results:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="user not found!")
    return results
