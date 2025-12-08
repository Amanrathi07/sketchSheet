"use client";

import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <nav className="w-full bg-gray-900 text-white border-b border-gray-700 shadow-lg shadow-gray-800/40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* App Name */}
        <h1
          onClick={() => router.push("/")}
          className="text-2xl font-extrabold cursor-pointer"
        >
          <span className="text-lime-400">⚡</span> 
sketchSheet

        </h1>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => router.push("/auth/signin")}
            className="
              px-6 py-2 
              text-white 
              font-semibold 
              bg-gray-700 
              rounded-lg 
              border border-lime-400
              hover:bg-gray-600 
              transition-all duration-200
              transform hover:scale-[1.03]
            "
          >
            Login
          </button>

          <button
            onClick={() => router.push("/auth/signup")}
            className="
              px-6 py-2 
              text-gray-900 
              font-bold 
              bg-lime-400 
              rounded-lg 
              shadow-lg 
              hover:bg-lime-300 
              transition-all duration-200
              transform hover:scale-[1.03]
            "
          >
            Join Up
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-lime-400"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col px-6 pb-4 gap-3 bg-gray-900 border-t border-gray-700">
          <button
            onClick={() => {
              setOpen(false);
              router.push("/auth/signin");
            }}
            className="
              w-full 
              py-2 
              text-white 
              font-semibold 
              bg-gray-700 
              rounded-lg 
              border border-lime-400
              hover:bg-gray-600 
              transition-all duration-200
            "
          >
            Login
          </button>

          <button
            onClick={() => {
              setOpen(false);
              router.push("/auth/signup");
            }}
            className="
              w-full 
              py-2 
              text-gray-900 
              font-bold 
              bg-lime-400 
              rounded-lg 
              hover:bg-lime-300 
              transition-all duration-200
            "
          >
            Join Up
          </button>
        </div>
      )}
    </nav>
  );
}
