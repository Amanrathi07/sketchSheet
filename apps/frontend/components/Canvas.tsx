"use client "

import { initDraw } from "@/draw";
import { Circle, Minus, Pencil, RectangleHorizontal } from "lucide-react";
import { JSX, useEffect, useRef, useState } from "react"

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
    <div className="static ">
      <canvas className="bg-black" ref={canvasRef} height={window.innerHeight} width={window.innerWidth}></canvas>
      

      <ToolBar />

    </div>
  )
}


export function ToolBar(){
  const [tool , setTool] = useState("");
  const allTools = [
    {name:"Rectangle",icon:<RectangleHorizontal />},
    {name:"circle",icon:<Circle />},
    {name:"pencil",icon:<Pencil />},
    {name:"line",icon:<Minus />}
  ]
  return(
    <div className="absolute h-7  inset-y-20 flex  gap-7 ">

        {
          allTools.map((t,i)=>(
          <div key={i} className={`text-red-800 flex items-center bg-amber-400 px-3 rounded-xl ${(t.name===tool)?("bg-blue-500"):""}`} onClick={()=>{setTool(t.name)} }> {t.icon}</div>
        ))
        }
    </div>
  )
}

export default Canvas

