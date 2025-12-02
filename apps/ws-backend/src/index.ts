import { WebSocketServer,WebSocket } from "ws"
import jwt, { JwtPayload } from "jsonwebtoken" 
const wss = new WebSocketServer({port:8080})


import dotenv from "dotenv";

dotenv.config({
    path:"../../.env"
})

async function checkUser(token: string) {
  try {
    return jwt.verify(token, process.env.SECRET!) as JwtPayload;
  } catch (err) {
    return null;
  }
}

// User structure
interface User {
  userId: string;
  rooms: string[];
  ws: WebSocket;
}

const users: User[] = [];

interface IncomingData {
  type: string;
  roomId?: string;
  message?: string;
}

wss.on("connection", async (ws, request) => {
  const url = request.url;
  if (!url) return ws.close();

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";

  const decoded = await checkUser(token);
  if (!decoded || !decoded.id) {
    ws.close();
    return;
  }

  // Register user
  const currentUser: User = {
    userId: decoded.id,
    rooms: [],
    ws,
  };

  users.push(currentUser);

  ws.on("message", (rawData) => {
    let data: IncomingData;
    try {
      data = JSON.parse(rawData.toString());
    } catch {
      return;
    }

    // JOIN ROOM
    if (data.type === "join_room" && data.roomId) {
      if (!currentUser.rooms.includes(data.roomId)) {
        currentUser.rooms.push(data.roomId);
      }
      return;
    }

    // LEAVE ROOM
    if (data.type === "leave_room" && data.roomId) {
      currentUser.rooms = currentUser.rooms.filter(
        (r) => r !== data.roomId
      );
      return;
    }

    // CHAT MESSAGE
    if (data.type === "chat" && data.roomId && data.message) {
      users.forEach((u) => {
        if (u.rooms.includes(data.roomId)) {
          u.ws.send(
            JSON.stringify({
              type: "chat",
              message: data.message,
              roomId: data.roomId,
              sender: currentUser.userId,
            })
          );
        }
      });
    }
  });

  ws.on("close", () => {
    const index = users.findIndex((u) => u.ws === ws);
    if (index !== -1) users.splice(index, 1);
  });
});