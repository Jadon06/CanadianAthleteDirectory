from fastapi import HTTPException, status, APIRouter, Depends
from .. import oauth2, models

router = APIRouter(
    prefix="/filters",
    tags=["Filters"]
)

@router.post("/")
def create_stat_selection(selection, current_user: int = Depends(oauth2.get_current_user)):
    preferences = models.stat_selection

    return