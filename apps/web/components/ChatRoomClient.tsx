"use client"

import { useEffect, useState } from "react"
import { useSocket } from "../hooks/useSocket"

export function ChatRoomClient({message,id}){

    const [allMessage,setAllMessage]=useState(message);
    const {loading,socket} =useSocket();
    const [text,setText]=useState("");

    console.log(allMessage)

    useEffect(()=>{
        if(!socket || loading) return ;

        // join room 

        socket.send(JSON.stringify({
            "type":"join_room",
            roomsId:id,
        }))

        // listining the message 
      const handleMessage = (event) => {
      const parsed = JSON.parse(event.data);

      if (parsed.type === "chat") {
        setAllMessage((prev) => [...prev, { message: parsed.message }]);
      }
    };
    console.log("checking",allMessage)
    socket.addEventListener("message", handleMessage);

    // cleanup
    return () => socket.removeEventListener("message", handleMessage);

    },[socket,loading,id])
    return (
        <div>
            <div>
            ChatRoomClient
            {allMessage.map((msg,i)=> <div key={i}>{msg.message}</div>)}
        </div>
        <div>
            <input type="text" placeholder="message" onChange={(e)=>{
                setText(e.target.value)
            }} />
            <button
        onClick={() => {
          if (!text.trim()) return;

          socket?.send(
            JSON.stringify({
              type: "chat",
              roomsId: id,
              message: text,
            })
          );
           setText('');
        }}
      >
        send
      </button>
        </div>
        </div>
    )
}