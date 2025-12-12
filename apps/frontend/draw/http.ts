import axiosInstance from "@/lib/axiosInstance"

export async function getMessage(id:number){
  const responce =await axiosInstance.post(`/room/allmessage`,{
        roomId:id
    })
    return responce.data.allMessages
}