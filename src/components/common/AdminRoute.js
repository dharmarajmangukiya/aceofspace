"use client";

import { role_enum } from "@/utils/constants";
import ProtectedRoute from "../../Layouts/authWrappers/ProtectedRoute";

const AdminRoute = ({ children }) => {
  return (
    <ProtectedRoute allowedRoles={[role_enum.ADMIN]}>{children}</ProtectedRoute>
  );
};

export default AdminRoute;
