
import axios from "axios"
import { ChatRoomClient } from "./ChatRoomClient"
import axiosInstance from "../utils/axiosInstance"

async function getChats(id:any){
    const responce =await axiosInstance.get(`/room/allmessage`,{headers:{},data:{
        roomId:id
    }})

    return responce.data.allMessages
}


export async function ChatRoom({id}:{id:any}){
    const allMessages = await getChats(id)
    return(
        <div>
            <ChatRoomClient id={id} message={allMessages} />
        </div>
    )
}

