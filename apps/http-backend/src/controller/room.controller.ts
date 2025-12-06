import { Request, Response } from "express";
import { prismaClient } from "../lib/db.ts";
import {roomCheck}from "@repo/common"
import { SortOrder } from "../../../../packages/database/generated/prisma/internal/prismaNamespace.ts";

export async function createRoom(req: Request, res: Response) {
  try {
    const {success,data} = roomCheck.safeParse(req.body);
    if(!success){
        return res.status(202).json({message:"pls send valid room name"})
    }
    const dbResponce = await prismaClient.room.findFirst({
        where:{
            "name":data.name
        }
    })
    
    if(dbResponce){
        return res.status(401).json({message:"room name alrady exist"})
    }

    const newRoom = await prismaClient.room.create({
        data:{
            name:data.name ,
            //@ts-ignore
            adminId : req.user
        }
    })
    res.status(200).json({ message: "new room created ",roomID:newRoom.id} );
  } catch (error) {
    console.log("error in createRoom function", error);
    return res.status(500).json({ message: "internal server error" });
  }
}


export async function getRoomId(req: Request, res: Response){
  try {
    const title = req.params.title ;
    const room = await prismaClient.room.findUnique({
      where:{
        name:title
      }
    })
    res.status(202).json({roomId:room.id})
  } catch (error) {
    console.log("error in createRoom function", error);
    return res.status(500).json({ message: "internal server error" });
  }
}


export async function getAllMessage(req: Request, res: Response) {
  const roomId = req.body.roomId
  try {
    const dbResponce = await prismaClient.message.findMany({
      where:{
        roomId
      },
     orderBy: {
      createdAt: "desc",   
    },
    take: 50,
    })

    return res.status(200).json({allMessages:dbResponce})
  } catch (error) {
    console.log("error in getAllMessage function", error);
    return res.status(500).json({ message: "internal server error" });
  }
}