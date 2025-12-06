"use client"
import { useState } from "react"

import { useRouter } from "next/navigation";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

export default function Home(){
  const[room,setRoom] = useState("");
  const[roomName, setRoomName]= useState("")
  const router = useRouter()
  return (
    <div>
      <input type="text" placeholder="room name"  onChange={(e)=>{setRoom(e.target.value)}}/>
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

