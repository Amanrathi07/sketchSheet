"use client";

import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function formHandel(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const responce = await axiosInstance.post("/v1/auth/signup", formData);
      toast.success(responce.data.message);
      setLoading(false);
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
      return;
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Form Card */}
      <form
        onSubmit={formHandel}
        className="
          text-center
          p-8
          md:p-10
          bg-gray-800
          rounded-xl
          shadow-2xl
          shadow-gray-700/50
          max-w-md
          w-full
          border border-gray-700
          flex flex-col gap-6
        "
      >
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-white">
          <span className="text-lime-400">📝</span> Create Account
        </h1>
        <p className="text-gray-400 text-sm">Join the platform</p>

        {/* Name */}
        <div className="flex flex-col text-left">
          <label className="text-sm mb-1 text-gray-400">Name</label>
          <input
            type="text"
            placeholder="your name"
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="
              border border-gray-600 
              bg-gray-700 
              text-white 
              p-3 rounded-lg 
              outline-none 
              focus:ring-2 
              focus:ring-lime-400 
              transition
            "
          />
        </div>

        {/* Email */}
        <div className="flex flex-col text-left">
          <label className="text-sm mb-1 text-gray-400">Email</label>
          <input
            type="text"
            placeholder="email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="
              border border-gray-600 
              bg-gray-700 
              text-white 
              p-3 rounded-lg 
              outline-none 
              focus:ring-2 
              focus:ring-lime-400 
              transition
            "
          />
        </div>

        {/* Password */}
        <div className="flex flex-col text-left">
          <label className="text-sm mb-1 text-gray-400">Password</label>
          <input
            type="password"
            placeholder="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="
              border border-gray-600 
              bg-gray-700 
              text-white 
              p-3 rounded-lg 
              outline-none 
              focus:ring-2 
              focus:ring-lime-400 
              transition
            "
          />
        </div>

        {/* Button */}
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
            focus:outline-none 
            focus:ring-4 
            focus:ring-lime-300 
            transition-all duration-200 
            transform hover:scale-[1.03]
          "
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        {/* Footer */}
        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/auth/signin")}
            className="text-lime-400 hover:underline cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
}
