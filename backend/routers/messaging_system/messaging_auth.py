from fastapi import WebSocket, HTTPException
from jose import jwt
from starlette.websockets import WebSocketDisconnect
from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

async def get_current_user(websocket: WebSocket):
    token = websocket.query_params.get("token")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get("username")
    except jwt.JWTError:
        await websocket.close(code=1008)
        raise WebSocketDisconnect(code=1008)