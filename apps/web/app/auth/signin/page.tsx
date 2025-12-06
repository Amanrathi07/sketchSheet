"use client"
import axios from "axios"
import { useState } from "react"
import axiosInstance from "../../../utils/axiosInstance";

export default function Signin(){
    async function formHandel(){
      try {
    const response = await axiosInstance.post(
      "/auth/signin",
      data
    );

    alert(response.data.message);
  } catch (err) {
    console.error("Signin error:", err);
  }
    } 
   const [ data,setData] = useState({email:"",password:""})
    return(
       <div>
        <input type="text " placeholder=" email" onChange={(e)=>{setData({...data,email:e.target.value})}} />
        <br />
        <input type="text " placeholder=" password" onChange={(e)=>{setData({...data,password:e.target.value})}} />
        <br />
        <button onClick={()=>{formHandel()}} >clickme</button>
       </div>
    )
}