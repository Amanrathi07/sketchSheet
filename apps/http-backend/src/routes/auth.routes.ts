
import { Router  } from "express";
import { signin, singup } from "../controller/auth.controller.ts";
import { cookiesCheck } from "../middleware/auth.middleware.ts";

const router:Router= Router();


router.post("/signup",singup)
router.post("/signin",signin)

router.get("/checkAuth",cookiesCheck,(req,res)=>{
    if(req.user){
        return res.json({ auth: true, user:req.user });
    }else{
        return res.json({auth:false , user:req.user})
    }
})

// router.get("/users",)

// router.get("/user",)
// router.put("/user",)
// router.delete("/user",)



export default router;