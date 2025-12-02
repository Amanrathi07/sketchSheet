import { WebSocketServer, WebSocket } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getDb } from "@repo/database";
import dotenv from "dotenv";

dotenv.config({
  path: "../../.env",
});

const prismaClient = getDb({ connectionString: process.env.DATABASE_URL! });
const wss = new WebSocketServer({ port: 8080 });

interface user {
  userId: string | JwtPayload;
  rooms: number[];
  ws: WebSocket;
}

interface dataprops {
  type: "join_room" | "leave_room" | "chat";
  roomsId?: number;
  message?: string;
}

const users: user[] = [];

function checkUser(token: string) {
  try {
    return jwt.verify(token, process.env.SECRET!);
  } catch (error) {
    console.log("error in checkUser function ", error);
    return null;
  }
}

wss.on("connection", (ws, req) => {
  const token = req.headers.cookie || " ";
  const decoded = checkUser(token);
  if (!decoded) {
    ws.close();
    return null;
  }
  const currentUser = {
    userId: decoded,
    rooms: [],
    ws,
  };
  users.push(currentUser);
  console.log(
    `User ${currentUser.userId} connected. Total users: ${users.length}`
  );

  ws.on("message", async (rawData) => {
    const data: dataprops = JSON.parse(rawData.toString());
    //join-room
    if (data.type === "join_room" && data.roomsId) {
      try {
        const dbResponce = await prismaClient.room.findUnique({
          where: { id: data.roomsId },
        });

        if (!dbResponce) {
          ws.send(
            JSON.stringify({
              type: "error",
              message: "Room not found",
            })
          );
          return;
        }

        if (!currentUser.rooms.includes(data.roomsId)) {
          currentUser.rooms.push(data.roomsId);
          ws.send(
            JSON.stringify({
              type: "joined",
              roomId: data.roomsId,
            })
          );
        }
      } catch (error) {
        console.error("database error", error);
        ws.send(
          JSON.stringify({
            type: "error",
            message: "Failed to join room",
          })
        );
      }
    }

    //leave-room
    if (data.type === "leave_room" && data.roomsId) {
      currentUser.rooms = currentUser.rooms.filter((x) => x !== data.roomsId);
      return;
    }

    //message
    if (data.type === "chat" && data.roomsId && data.message) {
      users.forEach((auser) => {
        if (auser.rooms.includes(data.roomsId as unknown as number)) {
          auser.ws.send(
            JSON.stringify({
              type: "chat",
              message: data.message,
              roomId: data.roomsId,
              sender: currentUser.userId,
            })
          );
        }
      });
      await prismaClient.message.create({
        data: {
          message: data.message,
          roomId: data.roomsId,
          senderId: currentUser.userId as string,
        },
      });
    }
  });

  ws.on("close", () => {
    const index = users.findIndex((u) => {
      u.ws === ws;
    });
    if (index !== -1) users.splice(index, 1);
  });
});
