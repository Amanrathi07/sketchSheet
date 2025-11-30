
import { Router  } from "express";
import { signin, singup } from "../controller/auth.controller.ts";

const router:Router= Router();


router.post("/signup",singup)
router.post("/signin",signin)

// router.get("/users",)

// router.get("/user",)
// router.put("/user",)
// router.delete("/user",)



export default router;