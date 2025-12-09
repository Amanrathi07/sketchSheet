import DrowingSheet from "@/components/DrowingSheet"
import axiosInstance from "@/lib/axiosInstance"

interface props{
    params :{
        roomId : number
    }
}
async function getMessage(id:any){
    const responce =await axiosInstance.get(`/room/allmessage`,{headers:{},data:{
        roomId:id
    }})

    return responce.data.allMessages
}

 async function page({params}:props) {
    const roomId = (await params).roomId
    const allMessages = await getMessage(roomId);
  return (
     <DrowingSheet roomId={roomId} allMessages={allMessages}/>
  )
}
export default page