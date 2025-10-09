"use client";

import { AuthContext } from "@/Layouts/AuthProvider";
import { role_enum } from "@/utils/constants";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { isAuth, userData, role, logout } = context;

  return {
    isAuth,
    userData,
    role,
    logout,
    isAdmin: role === role_enum.ADMIN,
    isUser: role === role_enum.USER,
    isAuthenticated: isAuth,
  };
};
