
import { Router  } from "express";
import { signin, singup } from "../controller/auth.controller.ts";
import { cookiesCheck } from "../middleware/auth.middleware.ts";
import { prismaClient } from "../lib/db.ts";

const router:Router= Router();


router.post("/signup",singup)
router.post("/signin",signin)

router.get("/checkAuth",cookiesCheck,async(req,res)=>{
    if(req.user){
        console.log(req.user)
        const dbresponce =await prismaClient.user.findFirst({
            where:{id:req.user}
        })
        return res.json({ auth: true, user:dbresponce });
    }else{
        return res.json({auth:false , user:req.user})
    }
})



// router.get("/users",)

// router.get("/user",)
// router.put("/user",)
// router.delete("/user",)



export default router;