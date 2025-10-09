"use client";

import { AuthContext } from "@/Layouts/AuthProvider";
import { role_enum } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const ProtectedRoute = ({
  children,
  allowedRoles = [role_enum.USER, role_enum.ADMIN],
  redirectTo = "/?open=login",
}) => {
  const { isAuth, role, userData } = useContext(AuthContext);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Ensure this only runs on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run redirects on client side
    if (!isClient) return;

    // If not authenticated, redirect to login
    if (!isAuth) {
      router.push(redirectTo);
      return;
    }

    // If authenticated but role not in allowed roles, redirect to appropriate dashboard
    if (isAuth && role && !allowedRoles.includes(role)) {
      // Redirect to appropriate dashboard based on user role
      if (role === role_enum.ADMIN) {
        router.push("/dashboard");
      } else if (role === role_enum.USER) {
        router.push("/dashboard");
      } else {
        // Unknown role, redirect to login
        router.push(redirectTo);
      }
      return;
    }
  }, [isClient, isAuth, role, allowedRoles, redirectTo, router]);

  // Show loading while checking authentication on client side
  if (!isClient || !isAuth || (role && !allowedRoles.includes(role))) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If authenticated and role is allowed, render children
  return children;
};

export default ProtectedRoute;
