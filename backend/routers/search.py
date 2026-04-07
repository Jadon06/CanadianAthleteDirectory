from fastapi import APIRouter, HTTPException, status, Depends
from .. import oauth2, schemas
from ..Search_System import Rag_Agent

router = APIRouter(
    prefix="/search",
    tags=["Search"]
)

@router.post("/")
def user_query(query: schemas.user_query, current_user: int = Depends(oauth2.get_current_user)):
    results = Rag_Agent.agent.invoke(input=query.content)
    return results