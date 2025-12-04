import axios from "axios"


interface parms {
    params :{
        roomName : String
    }
}


async function getRoomId(name : String){
    const responce =await axios.get(`${process.env.BACKEND_URL}/v1/room/room/${name}`);
    return responce.data.roomId
}

export default async function room({params}:parms){
    const data = await params ;
    const roomId =await getRoomId(data.roomName);
    console.log("room id is :", roomId)
    return(
        <div>
           {roomId} 
        </div>
    )
}

