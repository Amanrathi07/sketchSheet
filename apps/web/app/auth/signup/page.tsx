"use client";

import axios from "axios";
import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

export default function Signup() {
  const [data, setData] = useState({ name: "", email: "", password: "" });

  async function formHandel() {
   try {
        const response = await axiosInstance.post(
          "/auth/signup",
          data
        );

        alert(response.data.message);
      } catch (err) {
        console.error("Signin error:", err);
      }
  }

  return (
    <div>
      <input
        type="text "
        placeholder=" name"
        onChange={(e) => {
          setData({ ...data, name: e.target.value });
        }}
      />
      <br />
      <input
        type="text "
        placeholder=" email"
        onChange={(e) => {
          setData({ ...data, email: e.target.value });
        }}
      />
      <br />
      <input
        type="text "
        placeholder=" password"
        onChange={(e) => {
          setData({ ...data, password: e.target.value });
        }}
      />
      <br />
      <button
        onClick={() => {
          formHandel();
        }}
      >
        clickme
      </button>
    </div>
  );
}
