from fastapi import APIRouter, HTTPException, status, Depends
from beanie.odm.operators.update.general import Set
from typing import List
from .. import schemas, models, oauth2
from ..utils import Search_system

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.post("/", response_model=schemas.userReturn)
async def create_user(user_info: schemas.userCreate):
    exists = await models.users.find_one(models.users.email == user_info.email)
    if exists:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"User with email:{user_info.email} already exists!")
    new_user = models.users(**user_info.dict())
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
