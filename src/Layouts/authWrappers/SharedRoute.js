"use client";

import { role_enum } from "@/utils/constants";
import ProtectedRoute from "./ProtectedRoute";

const SharedRoute = ({ children }) => {
  return (
    <ProtectedRoute allowedRoles={[role_enum.USER, role_enum.ADMIN]}>
      {children}
    </ProtectedRoute>
  );
};

export default SharedRoute;
