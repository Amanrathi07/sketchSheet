"use client";
import { WS_URL } from "@/app/config";
import { useEffect, useState } from "react";

export default function useSocket(){
    const [socket , setSocket] = useState<WebSocket>()
    const [loading , setLoading]= useState(false)
    useEffect(()=>{
        try {
            setLoading(true)
            const raw = document.cookie.split("; ").find((c) => c.startsWith("jwt="));
        const jwt = raw?.split("=")[1];
        const wss = new WebSocket(`ws://localhost:8080?token=${jwt}`);

            wss.onopen=()=>{
                setSocket(wss)
                setLoading(false)
            }

        } catch (error) {
            setLoading(false);
            console.log("error in conectionng to ws server")
        }
    },[])

    return {loading , socket}
}