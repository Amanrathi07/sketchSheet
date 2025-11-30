
import jwt from "jsonwebtoken"
import { Response } from "express"


export  function genToken( userId :string , res:Response) {
    
    const token =  jwt.sign(userId,"secret")
    res.cookie("jwt",token)
}
