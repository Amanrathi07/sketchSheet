"use client "

import { Game } from "@/draw/game";
import { Circle, Minus, Pencil, RectangleHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react"

interface props{
  roomId : number ,
  socket:WebSocket 
}

export type tool = "circle"|"Rectangle"|"Pencil"|"line"|"";

function Canvas({roomId,socket}:props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [game,setGame]=useState<Game>()
  const [tool , selectedTool] = useState<tool>("");
  const allTools = [
    {name:"Rectangle",icon:<RectangleHorizontal />},
    {name:"circle",icon:<Circle />},
    {name:"pencil",icon:<Pencil />},
    {name:"line",icon:<Minus />}
  ]
useEffect(()=>{
  game?.setTool(tool)
},[tool,selectedTool,game])


  useEffect(()=>{
    socket.send(JSON.stringify({
      type:"join_room",
      roomsId:roomId
    }))
    if(canvasRef.current){
      const g = new Game(canvasRef.current,roomId,socket)
      setGame(g)
    }
  },[canvasRef])


  return (
    <div className="static ">
      <canvas className="bg-black" ref={canvasRef} height={window.innerHeight} width={window.innerWidth}></canvas>

       <div className="absolute h-7  inset-y-20 flex  gap-7 ">

        {
          allTools.map((t:any,i)=>(
          <div key={i} className={`text-red-800 flex items-center bg-amber-400 px-3 rounded-xl ${(t.name===tool)?("bg-blue-500"):""}`} onClick={()=>{selectedTool(t.name)} }> {t.icon}</div>
        ))
        }
    </div>

    </div>
  )
}


export function ToolBar(){
  
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

