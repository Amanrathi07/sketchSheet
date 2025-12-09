"use client"
import { useAuth } from "@/context/authContext"

interface props {
  roomId : number
}

function DrowingSheet({roomId}:props) {
  const {user}=useAuth()
  console.log("checking :",user)
  return (
    <div>{roomId}</div>
  )
}
export default DrowingSheet