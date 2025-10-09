"use client";

// context/AuthContext.js
import { getAuthToken, getUserData, useLogout } from "@/hooks/api/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState("");
  const [isClient, setIsClient] = useState(false);

  // Ensure this only runs on client side
  useEffect(() => {
    setIsClient(true);

    // Initialize auth state on client side
    const token = getAuthToken();
    const user = getUserData();
    const userRole = user?.role?.name ?? "";

    setIsAuth(!!token);
    setUserData(user);
    setRole(userRole);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleStorageChange = () => {
      const token = getAuthToken();
      const user = getUserData();
      const userRole = user?.role?.name ?? "";

      setIsAuth(!!token);
      setUserData(user);
      setRole(userRole);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleStorageChange);
    };
  }, [isClient]);

  const { mutate: logout } = useLogout();

  return (
    <AuthContext.Provider value={{ isAuth, logout, userData, role }}>
      {children}
    </AuthContext.Provider>
  );
};
