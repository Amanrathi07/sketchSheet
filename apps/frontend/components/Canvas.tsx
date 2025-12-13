"use client "

import { Game } from "@/draw/game";
import { Circle, Eraser, Minus, Pencil, RectangleHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react"

interface props{
  roomId : number ,
  socket:WebSocket 
}

export type tool = "circle"|"Rectangle"|"pencil"|"line"|"eraser"|"";

function Canvas({roomId,socket}:props) {

  const router =useRouter()
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [game,setGame]=useState<Game>()
  const [tool , selectedTool] = useState<tool>("");
  const allTools = [
    {name:"Rectangle",icon:<RectangleHorizontal />},
    {name:"circle",icon:<Circle />},
    {name:"pencil",icon:<Pencil />},
    {name:"line",icon:<Minus />},
    {name:"eraser",icon:<Eraser />},

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
    <div className="relative cursor-crosshair w-screen h-screen overflow-hidden">
  {/* Canvas */}
  <canvas
    ref={canvasRef}
    className="bg-black block"
    height={window.innerHeight}
    width={window.innerWidth}
  />

  {/* Toolbar */}
  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl">
    <div className="flex items-center gap-4 px-4 py-2 rounded-2xl
                    bg-white/10 backdrop-blur-md border border-white/20
                    shadow-lg">

      {/* Tools */}
      {allTools.map((t: any, i: number) => (
        <button
          key={i}
          onClick={() => selectedTool(t.name)}
          className={`
            flex items-center justify-center
            h-10 w-10 rounded-xl
            transition-all duration-200
            ${
              t.name === tool
                ? "bg-blue-500 text-white scale-105 shadow-md"
                : "bg-white/10 text-white hover:bg-white/20"
            }
          `}
        >
          {t.icon}
        </button>
      ))}

      {/* Pushes Back button to right */}
      <div className="flex-1" />

      {/* Back Button */}
      <button
        className="h-10 px-5 rounded-xl
                   bg-red-600/90 text-white font-medium
                   hover:bg-red-600 transition
                   shadow-md"
        onClick={()=>{router.push("/")}}>
        Back
      </button>
    </div>
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

