import { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken"

import dotenv from "dotenv";

dotenv.config({
    path:"../../.env"
})


export async function cookiesCheck(req:Request,res:Response,next:NextFunction){
    try {
        const tooken =req.cookies.jwt;
        
    if(!tooken){
        return res.status(402).json({message:"unauthrized-no token found"})
    }
    const decodeId =await jwt.verify(tooken,process.env.SECRET!)

    if(!decodeId){
        return res.status(400).json({message:"invalide user"})
    }
    //@ts-ignore
    req.user = decodeId
    next()
    } catch (error) {
        console.log("error in cookiesCheck function ",error);
        return res.status(500).json({message:"internal server error"})
    }

}