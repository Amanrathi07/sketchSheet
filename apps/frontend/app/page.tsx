"use client"

import FrontPage from "@/components/FrontPage";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/authContext";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect } from "react";



export default function Home(){

 
  return(
    <div>
      <FrontPage />
    </div>
  )
}




