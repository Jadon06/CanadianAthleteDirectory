from typing import Dict, List
from fastapi import WebSocket
from .redis_pubsub import publish

# NOTE - a websocket is a session(tab, device, etc)
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {} # initializes connections between user and server

    async def connect(self, websocket: WebSocket, room: str, user: str):
        await websocket.accept() # accept the websocket handshake
        if room not in self.active_connections:
            self.active_connections[room] = [] # create a room if it doesn't exist
        self.active_connections[room].append(websocket) # add the websocket to the empty room

    async def disconnect(self, websocket: WebSocket, room: str):
        self.active_connections[room].remove(websocket) # remove the websocket from the room
        if not self.active_connections[room]:
            del self.active_connections[room] # if the room is empty delete the room

    async def broadcast(self, room: str, message: str):
        await publish(room, message)
        if room in self.active_connections:
            for conn in self.active_connections[room]:
                await conn.send_text(message) # send the message to every websocket in the room

manager = ConnectionManager()

# User sends message
# → FastAPI receives it
# → manager.broadcast(room, message)
# → publish(room, message) sends it to Redis
# → Redis forwards it to all subscribers
# → redis_listener() receives it
# → manager.broadcast() sends it to all WebSockets
# → message disappears forever
