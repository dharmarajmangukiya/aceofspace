"use client";

// context/AuthContext.js
import { getAuthToken, useLogout } from "@/hooks/api/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(!!getAuthToken());

  useEffect(() => {
    const handleStorageChange = () => setIsAuth(!!getAuthToken());
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authChange", handleStorageChange); // 👈 new event

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    console.log("Current auth token:", isAuth, getAuthToken());
  }, [isAuth]);

  const { mutate: logout } = useLogout();

  return (
    <AuthContext.Provider value={{ isAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
