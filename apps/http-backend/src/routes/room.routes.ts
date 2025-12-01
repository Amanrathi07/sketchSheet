import { Router } from "express";
import { cookiesCheck } from "../middleware/auth.middleware.ts";
import { createRoom } from "../controller/room.controller.ts";


const router:Router = Router();

router.post("/room",cookiesCheck,createRoom)



export default router ;