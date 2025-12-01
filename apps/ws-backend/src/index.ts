import { WebSocketServer } from "ws"
import jwt from "jsonwebtoken" 

const wss = new WebSocketServer({port:8080})


wss.on("connection",(ws)=>{

    ws.on("message",(chat)=>{
        ws.send("okk");
        console.log(chat.toString())
        
    })

    
})

