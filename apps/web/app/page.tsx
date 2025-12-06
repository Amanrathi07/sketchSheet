"use client"
import { useState } from "react"

import { useRouter  } from "next/navigation";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home(){
  const[room,setRoom] = useState("");
  const[roomName, setRoomName]= useState("")
  const router = useRouter()
  return (
    <div>
      <div>
        <Link href="/auth/signin" >signin</Link>
        <br />
        <Link href="/auth/signup" >signup</Link>
      </div>

      
      <input   type="text" placeholder="room name"  onChange={(e)=>{setRoom(e.target.value)}}/>
      <button onClick={()=>{router.push(`/room/${room.trim()}`)}}>join room</button>

      <br />
      <br />
      
      <input type="text" placeholder="create room  " onChange={(e)=>{
        setRoomName(e.target.value)
      }}  />
      <button onClick={()=>{
      axiosInstance.post("/room/room",{name:roomName});

      }}>room create</button>
    </div>
  )
}

