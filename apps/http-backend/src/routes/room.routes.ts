import { Router } from "express";
import { cookiesCheck } from "../middleware/auth.middleware.ts";
import { createRoom, getRoomId } from "../controller/room.controller.ts";


const router:Router = Router();

router.post("/room",cookiesCheck,createRoom)

router.get("/room/:title",getRoomId)

export default router ;