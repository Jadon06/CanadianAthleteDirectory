from fastapi import APIRouter
from .. import oauth2

router = APIRouter(
    prefix="/stats",
    tags=['Stats']
)

@router.post("")
def get_player_stats(current_user: int = oauth2.get_current_user):
    first_name = current_user.first_name
    last_name = current_user.last_name
    