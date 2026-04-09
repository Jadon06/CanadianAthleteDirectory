from fastapi import APIRouter, HTTPException, status, Depends
from .. import oauth2, schemas, models
import os
from dotenv import load_dotenv

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)

load_dotenv()

NOTIFICATION_TTL = os.getenv("NOTIFICATION_TTL")

@router.post("/")
def create_notification(notification: schemas.notification, current_user: int = Depends(oauth2.get_current_user)):
    new_notification = models.notifications(**notification.dict(), sender=current_user.id)
    new_notification.save()
    new_notification.expire(NOTIFICATION_TTL)
    return {"status" : "Notification sent"}

@router.get("/")
def get_notifications(current_user: int = Depends(oauth2.get_current_user)):
    notifications = models.notifications.find(models.notifications.id == current_user.id).all()
    if not notifications:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No notifications found")
    return notifications