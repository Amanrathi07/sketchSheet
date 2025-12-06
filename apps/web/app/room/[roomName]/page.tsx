import axios from "axios"
import { ChatRoom } from "../../../components/ChatRoom";
import axiosInstance from "../../../utils/axiosInstance";


interface parms {
    params :{
        roomName : String
    }
}


async function getRoomId(name : String){
    const responce =await axiosInstance.get(`/room/room/${name}`);
    return responce.data.roomId
}

export default async function room({params}:parms){
    const data = await params ;
    const roomId =await getRoomId(data.roomName);
    return(
        <div>
            <ChatRoom  id={roomId}/>
        </div>
    )
}

