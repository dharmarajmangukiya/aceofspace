"use client";

import { useRouter } from "next/navigation";

const AccessDenied = ({
  message = "You don't have permission to access this page.",
}) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "60vh" }}
    >
      <div className="text-center">
        <div className="mb-4">
          <i className="fa-solid fa-lock fa-3x text-muted"></i>
        </div>
        <h3 className="mb-3">Access Denied</h3>
        <p className="text-muted mb-4">{message}</p>
        <div className="d-flex gap-3 justify-content-center">
          <button className="btn btn-outline-primary" onClick={handleGoBack}>
            Go Back
          </button>
          <button className="btn btn-primary" onClick={handleGoToDashboard}>
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
