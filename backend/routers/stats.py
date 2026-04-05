from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..databases.PostgresDB import get_db
from .. import oauth2, models, schemas

router = APIRouter(
    prefix="/stats",
    tags=['Stats']
)

@router.get("/")
def get_player_stats(current_user: int = Depends(oauth2.get_current_user), db: Session = Depends(get_db)):
    player_stats = db.query(models.basketball_stats).filter(
        models.basketball_stats.first_name == current_user.first_name).filter(
            models.basketball_stats.last_name == current_user.last_name).first()
    if not player_stats:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Stats not found.")
    return player_stats

@router.get("/game_stats", status_code=status.HTTP_200_OK)
def get_player_game_stats(current_user: int = Depends(oauth2.get_current_user), db: Session = Depends(get_db)):
    # all_stats = db.query(models.game_stats).all()
    # print(all_stats)
    game_stats = db.query(models.game_stats).filter(
        models.game_stats.last_name == current_user.last_name).filter(
            models.game_stats.first_name == current_user.first_name).limit(10).all()
    
    labels = [
        "first_name",
        "last_name",
        "game_date",
        "min",
        "ast",
        "pts",
        "reb",
        "stls",
        "oreb",
        "dreb",
        "fg",
        "ft",
        "threept"
    ]
    data = {key: [] for key in labels}
    for game in game_stats:
        for label in labels:
            data[label].append(getattr(game, label))
    if not game_stats:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No games found")
    # print(data)
    return data

@router.get("/overall_stats", response_model=schemas.overall_stat_return)
def get_overall_stats(current_user: int = Depends(oauth2.get_current_user), db: Session = Depends(get_db)):
    overall_stats = db.query(models.basketball_stats).filter(
        models.basketball_stats.last_name == current_user.last_name).filter(
            models.basketball_stats.first_name == current_user.first_name).first()
    
    if not overall_stats:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No stats found")
    print(f"returne value: {overall_stats.__dict__}")
    return overall_stats
    