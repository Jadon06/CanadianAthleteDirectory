from fastapi import APIRouter, Depends, HTTPException, status

from sqlalchemy.orm import Session
from sqlalchemy import func

from typing import List

from .. import models, schemas
from ..oauth2 import get_current_user
from ..schemas import highlight
from ..databases.PostgresDB import get_db

router = APIRouter(
    prefix="/highlights",
    tags=["Highlights"]
)

@router.post("/")
def create_highlight(highlight: highlight, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    print(highlight.dict())
    new_post = models.highlights(User_id=str(current_user.id), **highlight.dict())
    print(new_post.__dict__)
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

@router.put("/{id}")
def update_highlight(id: int, highlight_updates: highlight, db: Session = Depends(get_db), current_user: str = get_current_user):
    highlight = db.query(models.highlights).filter(models.highlights.id == id).filter(models.highlights.User_id == current_user.id).first()
    if not highlight:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Highlight not found!")
    updated_highlights = highlight.update(highlight_updates.dict(), synchronize_session=False)
    db.commit()
    return updated_highlights

@router.get("/", response_model=List[schemas.highlight_return])
def get_highlights(db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    highlights = db.query(models.highlights).filter(models.highlights.User_id == str(current_user.id)).all()
    if not highlights:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No highlights found")
    for highlight in highlights:
        highlight.date = highlight.date.strftime("%d/%m/%Y")
    print(highlights)
    return highlights
