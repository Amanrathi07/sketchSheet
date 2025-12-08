// context/authContext.js
"use client"
import React, { createContext, useState, useContext, ContextType } from 'react';

const AuthContext = createContext({
  user: null,
  setUser: () => {}
});

export const AuthProvider = ({ children }:{ children: React.ReactNode }) => {
  const [user, setUser] = useState(null);

  return (
    //@ts-ignore
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
