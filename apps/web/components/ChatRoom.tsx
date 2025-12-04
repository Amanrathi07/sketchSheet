
import axios from "axios"
import { ChatRoomClient } from "./ChatRoomClient"

async function getChats(){
    const responce =await axios.get(`${process.env.BACKEND_URL}/v1/room/allmessage`,{headers:{},data:{
        roomId:1
    }})

    return responce.data.allMessages
}


export async function ChatRoom({id}){
    const allMessages = await getChats()
    return(
        <div>
            <ChatRoomClient id={id} message={allMessages} />
        </div>
    )
}

