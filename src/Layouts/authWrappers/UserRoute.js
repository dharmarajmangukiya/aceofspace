"use client";

import { role_enum } from "@/utils/constants";
import ProtectedRoute from "./ProtectedRoute";

const UserRoute = ({ children }) => {
  return (
    <ProtectedRoute allowedRoles={[role_enum.USER]}>{children}</ProtectedRoute>
  );
};

export default UserRoute;
