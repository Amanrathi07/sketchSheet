import DrowingSheet from "@/components/DrowingSheet"

interface props{
    params :{
        roomId : number
    }
}

 async function page({params}:props) {
    const roomId = (await params).roomId
  return (
     <DrowingSheet roomId={roomId} />
  )
}
export default page