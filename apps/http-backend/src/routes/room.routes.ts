import { Router } from "express";
import { cookiesCheck } from "../middleware/auth.middleware.ts";
import { createRoom, getAllMessage, getRoomId } from "../controller/room.controller.ts";


const router:Router = Router();

router.post("/room",cookiesCheck,createRoom)

router.post("/allmessage",getAllMessage)


router.get("/room/:title",getRoomId)

export default router ; 