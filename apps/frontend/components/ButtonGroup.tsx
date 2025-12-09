"use client"
import { useAuth } from "@/context/authContext"
import Link from "next/link"


function ButtonGroup() {
    const {user} = useAuth()

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
          
          {/* 1. Create Room Button (Primary - Bright Accent) */}
          <Link href={user ? "/createRoom":"/auth/signin"} >
            <button
            className="
              flex-1
              px-8 py-3 
              text-lg font-bold 
              text-gray-900 
              bg-lime-400 
              rounded-lg 
              shadow-lg 
              hover:bg-lime-300 
              focus:outline-none 
              focus:ring-4 
              focus:ring-lime-300 
              transition-all duration-200 
              transform hover:scale-[1.03]
            "
          >
            ➕ Create New Room
          </button>
          </Link>

          {/* 2. Join Room Button (Secondary - Inverse Look) */}
          <Link href={user?"/createRoom":"/auth/signin"} >
          <button
            
            className="
              flex-1
              px-8 py-3 
              text-lg font-semibold 
              text-lime-400 
              bg-gray-700 
              rounded-lg 
              border border-lime-400
              hover:bg-gray-600 
              focus:outline-none 
              focus:ring-4 
              focus:ring-lime-800
              transition-all duration-200
              transform hover:scale-[1.03]
            "
          >
            🤝 Join Room
          </button>
          </Link>
        </div>
  )
}
export default ButtonGroup