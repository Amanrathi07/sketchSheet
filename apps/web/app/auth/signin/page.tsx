"use client"
import axios from "axios"
import { useState } from "react"

export default function Signin(){
    async function formHandel(){
      try {
    const response = await axios.post(
      "http://localhost:3000/v1/auth/signin",
      data,
      { withCredentials: true }
    );

    console.log(response.data.message);
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