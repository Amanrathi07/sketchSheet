"use client"

import { initDraw } from "@/draw"
import useSocket from "@/hooks/useSocket"
import { useEffect, useRef } from "react"
import Canvas from "./Canvas"

interface props {
  roomId : number
}

function DrowingSheet({roomId}:props) {
  const {socket } =useSocket()
  

if(!socket){
  return(
    <div>connecting to socket ...</div>
  )
}
  
  return(
    <Canvas roomId={roomId}  socket={socket} />
  )
}
export default DrowingSheet