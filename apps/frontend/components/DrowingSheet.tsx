"use client"

import { initDraw } from "@/draw"
import useSocket from "@/hooks/useSocket"
import { useEffect, useRef } from "react"

interface props {
  roomId : number
  allMessages:any
}

function DrowingSheet({roomId,allMessages}:props) {
  const {socket  } =useSocket()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return; 

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.beginPath();
  ctx.fillStyle = "white"
  ctx.rect(20, 20, 150, 100);
  ctx.stroke();
}, []);




  
  return(
    <canvas ref={canvasRef} height={1000} width={1275} className="bg-white"></canvas>
  )
}
export default DrowingSheet