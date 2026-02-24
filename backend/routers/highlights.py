from fastapi import APIRouter, Depends, HTTPException, status
from beanie import PydanticObjectId
from .. import oauth2, schemas, models

router = APIRouter(
    prefix="/highlights",
    tags=["Highlights"]
)

@router.post("/")
async def create_highlight(highlight: schemas.highlight, current_user: int = Depends(oauth2.get_current_user)):
    new_highlight = models.highlights(**highlight.dict())
    new_highlight.creator_email = current_user.email
    await models.highlights.insert(new_highlight)
    return new_highlight

@router.get("/")
async def get_all_posts(current_user = Depends(oauth2.get_current_user)):
    all_highlights = await models.highlights.find_all(models.highlights.creator_email == current_user.email)
    if not all_highlights:
        raise HTTPException(status_code=status.HTTP_204_NO_CONTENT, detail = "No posts found")
    return all_highlights

@router.delete("/{highlight_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_highlight(highlight_id: str, current_user = Depends(oauth2.get_current_user)):
    highlight = await models.highlights.find_one(models.highlights.id == PydanticObjectId(highlight_id))
    if not highlight:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail="Highlight not found!")
    await models.highlights.delete(highlight)
