"use client"
import { useState } from "react"

import { useRouter } from "next/navigation";

export default function Home(){
  const[room,setRoom] = useState("");
  const router = useRouter()
  return (
    <div>
      <input type="text" placeholder="room name"  onChange={(e)=>{setRoom(e.target.value)}}/>
      <button onClick={()=>{router.push(`/room/${room.trim()}`)}}>join room</button>
    </div>
  )
}

