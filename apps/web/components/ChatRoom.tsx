
import axios from "axios"
import { ChatRoomClient } from "./ChatRoomClient"

async function getChats(id){
    const responce =await axios.get(`${process.env.BACKEND_URL}/v1/room/allmessage`,{headers:{},data:{
        roomId:id
    }})

    return responce.data.allMessages
}


export async function ChatRoom({id}){
    const allMessages = await getChats(id)
    return(
        <div>
            <ChatRoomClient id={id} message={allMessages} />
        </div>
    )
}

