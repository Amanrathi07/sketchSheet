// context/authContext.js
"use client";
import axiosInstance from "@/lib/axiosInstance";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";

const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
  async function checkUser() {
    const dbresponce = await axiosInstance.get("/auth/checkAuth");
    if(dbresponce.data){
      console.log(dbresponce.data)
      setUser(dbresponce.data)
    }
  }

  checkUser(); 
}, []);


  return (
    //@ts-ignore
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
