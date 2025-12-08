"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axiosInstance";

export default function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleCreateRoom(e) {
    e.preventDefault();
    if (!roomName.trim()) return toast.error("Room name cannot be empty");
    
    try {
      setLoading(true);
      const res = await axiosInstance.post("/v1/rooms/create", { name: roomName });
      toast.success(res.data.message || "Room created!");
      setLoading(false);
      router.push(`/rooms/${res.data.roomId}`); // navigate to the room
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Failed to create room");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <form
        onSubmit={handleCreateRoom}
        className="
          w-full max-w-md
          flex flex-col gap-6
          p-8
          bg-gray-800
          rounded-xl
          shadow-2xl shadow-gray-700/50
          border border-gray-700
        "
      >
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-white text-center">
          <span className="text-lime-400">🆕</span> Create Room
        </h1>
        <p className="text-gray-400 text-sm text-center">
          Enter a name for your new chat room
        </p>

        {/* Room Name Input */}
        <div className="flex flex-col text-left">
          <label className="text-sm mb-1 text-gray-400">Room Name</label>
          <input
            type="text"
            placeholder="Enter room name..."
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="
              border border-gray-600
              bg-gray-700
              text-white
              p-3
              rounded-lg
              outline-none
              focus:ring-2 focus:ring-lime-400
              transition
            "
          />
        </div>

        {/* Create Button */}
        <button
          type="submit"
          className="
            w-full
            px-8 py-3
            text-lg font-bold
            text-gray-900
            bg-lime-400
            rounded-lg
            shadow-lg
            hover:bg-lime-300
            focus:outline-none focus:ring-4 focus:ring-lime-300
            transition-all duration-200
            transform hover:scale-[1.03]
          "
        >
          {loading ? "Creating..." : "Create Room"}
        </button>
      </form>
    </div>
  );
}
