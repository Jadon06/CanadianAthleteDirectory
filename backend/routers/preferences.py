from fastapi import HTTPException, status, APIRouter, Depends
from .. import oauth2, models, schemas
import os
from dotenv import load_dotenv

load_dotenv()

TTL = os.getenv("ACCESS_TOKEN_EXPIRE_SECONDS")

router = APIRouter(
    prefix="/filters",
    tags=["Filters"]
)

@router.post("/")
def create_stat_selection(selection: schemas.stat_selection, current_user: int = Depends(oauth2.get_current_user)):
    preferences = models.stat_selection(**selection.dict())
    preferences.save()
    preferences.expire(TTL)
    return preferences

@router.get("/")
def get_stat_selection(current_user: int = Depends(oauth2.get_current_user)):
    selection = models.stat_selection.get(current_user.email)
    if not selection:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="no selections found")
    
    return selection

@router.get("/")
def get_feed(current_user: int = Depends(oauth2.get_current_user)):
    return