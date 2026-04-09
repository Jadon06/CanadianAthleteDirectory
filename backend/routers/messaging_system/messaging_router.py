from fastapi import APIRouter, WebSocket, Depends
from .websocket_manager import manager
from .messaging_auth import get_current_user

router = APIRouter(
    prefix="/messaging",
    tags=["Messaging"]
)

@router.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str, current_user: int = Depends(get_current_user)):
    await manager.connect(websocket, room_id, current_user)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(room_id, f"{current_user}: {data}")
    except Exception:
        await manager.disconnect(websocket, room_id)