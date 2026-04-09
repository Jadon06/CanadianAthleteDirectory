from fastapi import APIRouter, HTTPException, status, Depends, Body
from .. import oauth2, schemas, models
from ..databases.PostgresDB import get_db
from sqlalchemy.orm import Session

import os
from dotenv import load_dotenv

router = APIRouter(
    prefix="/connect",
    tags=["Connect"]
)

load_dotenv()

CONNECT_REQUEST_TTL = os.getenv("CONNECT_REQUEST_TTL")

@router.post("/request")
def connect_request(ids: schemas.pending_connection, current_user: int = Depends(oauth2.get_current_user)):
    request = models.pending_connections.find(
                (models.pending_connections.following_id == ids.following_id) & 
                (models.pending_connections.follower_id == ids.follower_id)).first()
    
    if request:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Request already exists")
    
    new_request = models.pending_connections(**ids.dict())
    new_request.save()
    new_request.expire(CONNECT_REQUEST_TTL)
    return {"status" : "request sent"}

@router.post("/confirm")
def connnect(connection_request: schemas.notification, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    pending_connection = models.pending_connections.find(
        (models.pending_connections.following_id == current_user.id) & 
        (models.pending_connections.follower_id == connection_request.connect_request.follower_id)).first()
    new_connection = models.connections(**pending_connection.dict())
    db.add(new_connection)
    db.commit()

    notification = models.notifications.find(
        (models.notifications.connnect_request.following_id == current_user.id) &
        (models.notifications.connnect_request.follower_id == connection_request.connect_request.follower_id)
    )
    models.notifications.delete(notification)
    models.pending_connections.delete(pending_connection)

    return {"status" : "connection confirmed"}