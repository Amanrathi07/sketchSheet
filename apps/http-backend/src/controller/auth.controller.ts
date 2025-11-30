import { Request, Response } from 'express';
import { genToken } from '../utils/genJwt.js';
import {signinCheck, signupCheck} from "@repo/common"
import dotenv from "dotenv"
import bcrypt from 'bcryptjs';

import { getDb } from '@repo/database';

dotenv.config({
    path:"../../.env"
})

const prismaClient = getDb({connectionString:process.env.DATABASE_URL!})


export async function singup(req:Request, res:Response) {
    try {
        const {data,success} = signupCheck.safeParse(req.body);
        if(!success){
            return res.status(400).json({ message: "Please send valid data" });
        }

        const dbResponse = await prismaClient.user.findFirst({
            where:{email:data.email}
        })
        if(dbResponse){
            return res.status(404).json({message:"user alrady exist"})
        }

        const hashPassword = await bcrypt.hash(data.password,10)
        const newUser = await prismaClient.user.create({
            data:{
                name:data.name,
                email:data.email,
                password:hashPassword
            }
        })
        const token = genToken(newUser.id);
        return res
      .status(200)
      .cookie("jwt", token)
      .json({ message: "Signup successful" });
    } catch (error) {
        console.log("error in signup function ", error);
        return res.status(500).json({message:"internal server error"})
    }
}

export async function signin(req: Request, res: Response) {
  try {
    const { success, data } = signinCheck.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ message: "Please send valid data" });
    }

    const dbResponse = await prismaClient.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!dbResponse) {
      return res.status(404).json({ message: "Account not found" });
    }

    const passwordCheck = await bcrypt.compare(data.password,dbResponse.password)
    
    if(passwordCheck){
        const token = genToken(dbResponse.id);

    return res
      .status(200)
      .cookie("jwt", token)
      .json({ message: "Signin successful" });
        
    }

    return res.status(401).json({message:"incorrect password "})
  } catch (error) {
    console.log("Error in signin function", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}







// export async function myData(req:Request, res:Response) {
//     try {
        
//     } catch (error) {
//         console.log("error in myData function ", error);
//         return res.status(500).json({message:"internal server error"})
//     }
// }


// export async function allUser(req:Request, res:Response) {
//     try {
        
//     } catch (error) {
//         console.log("error in allUser function ", error);
//         return res.status(500).json({message:"internal server error"})
//     }
// }

// export async function updateUser(req:Request, res:Response) {
//     try {
        
//     } catch (error) {
//         console.log("error in updateUser function ", error);
//         return res.status(500).json({message:"internal server error"})
//     }
// }


// export async function deleateUser(req:Request, res:Response) {
//     try {
        
//     } catch (error) {
//         console.log("error in deleateUser function ", error);
//         return res.status(500).json({message:"internal server error"})
//     }
// }