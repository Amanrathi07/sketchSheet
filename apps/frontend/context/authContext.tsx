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
  setUser: (p0: null) => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
  async function checkUser() {
    try {
      const dbresponce = await axiosInstance.get("/auth/checkAuth");
    if(dbresponce.data){
      console.log(dbresponce.data)
      setUser(dbresponce.data)
    }
    } catch (error) {
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
