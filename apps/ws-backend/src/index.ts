import { WebSocketServer,WebSocket } from "ws"
import jwt, { JwtPayload } from "jsonwebtoken" 
const wss = new WebSocketServer({port:8080})


import dotenv from "dotenv";

dotenv.config({
    path:"../../.env"
})



async function checkUser(token:string){
    const decode = await jwt.verify(token,process.env.SECRET!);
    return decode
}

interface users{
    userId : string | JwtPayload,
    rooms : [] ,
    ws : WebSocket
}

const users:users[] = []

wss.on("connection",(ws , Request:Request)=>{

    const url = Request.url
    if(!url) return ;

    const queryParms =new URLSearchParams(url.split('?')[1])
    const token = queryParms.get('token')|| "";
    const userId = checkUser(token)
    if(!userId){
        ws.close()
        return null ;
    }

    users.push({
        userId  ,
        rooms : [],
        ws 
    })

})

