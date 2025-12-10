"use client "

import { initDraw } from "@/draw";
import { useEffect, useRef } from "react"

interface props{
  roomId : number ,
  socket:WebSocket 
}


function Canvas({roomId,socket}:props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(()=>{
    socket.send(JSON.stringify({
      type:"join_room",
      roomsId:roomId
    }))
    if(canvasRef.current){
      initDraw(canvasRef.current,roomId,socket)
    }
  },[canvasRef])

  return (
    <canvas ref={canvasRef} height={1200} width={1200}></canvas>
  )
}
export default Canvas