from fastapi import APIRouter
from fastapi import WebSocket, Request, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from . import connection

router = APIRouter(
    prefix="/messages",
    tags=["Messages"]
)

templates = Jinja2Templates(directory="frontend")

@router.get("/", response_class=HTMLResponse)
def read_index(request: Request):
    # Render the HTML template
    return templates.TemplateResponse("messaging.html", {"request" : request})

@router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    #accept connections 
    await connection.connectionmanager.connect(websocket)
    try:
        while True:
            #receive text from the user
            data = await websocket.receive_text()
            await connection.connectionmanager.send_personal_message(f"You : {data}", websocket)
            #broadcast message to the connected user
            await connection.connectionmanager.broadcast(f"Client #{client_id}: {data}", websocket)
            
    #WebSocketDisconnect exception will be raised when client is disconnected
    except WebSocketDisconnect:
        connection.connectionmanager.disconnect(websocket)
        await connection.connectionmanager.broadcast(f"Client #{client_id} left the chat")