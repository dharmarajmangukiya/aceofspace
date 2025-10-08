"use client";

import { AuthContext } from "@/Layouts/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef } from "react";
import toast from "react-hot-toast";

const GlobalLogoutModal = () => {
  const { logout } = useContext(AuthContext);
  const cancelButtonRef = useRef(null);
  const router = useRouter();

  // Set the modal backdrop z-index to 200 when the modal is shown
  useEffect(() => {
    const handleShow = () => {
      // Bootstrap 5 uses .modal-backdrop
      const backdrops = document.querySelectorAll(".modal-backdrop");
      backdrops.forEach((backdrop) => {
        backdrop.style.zIndex = "200";
      });
    };

    // Listen for modal show event
    const modal = document.getElementById("globalLogoutModal");
    if (modal) {
      modal.addEventListener("shown.bs.modal", handleShow);
    }

    // Clean up
    return () => {
      if (modal) {
        modal.removeEventListener("shown.bs.modal", handleShow);
      }
    };
  }, []);

  const handleClose = () => {
    cancelButtonRef?.current?.click();
    // Close any open sidebar panels
    const sidebarCloseButtons = document.querySelectorAll(
      '[data-bs-dismiss="offcanvas"]'
    );
    sidebarCloseButtons.forEach((button) => {
      if (button.offsetParent !== null) {
        // Check if element is visible
        button.click();
      }
    });
    router.push("/");
  };

  const handleLogout = () => {
    logout(
      {},
      {
        onSuccess: () => {
          toast.success("Logged out successfully");
          handleClose();
        },
        onError: () => {
          toast.error("Failed to logout");
          handleClose();
        },
      }
    );
  };

  return (
    <div
      className="modal fade"
      id="globalLogoutModal"
      tabIndex={-1}
      aria-labelledby="globalLogoutModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-body p-4">
            <div className="text-center mb-4">
              <h4 className="mb-2 text-dark fw-bold">Confirm Logout</h4>
              <p className="text-muted mb-0">
                Are you sure you want to logout? You'll need to sign in again to
                access your account.
              </p>
            </div>
            <div className="d-flex justify-content-center gap-3">
              <button
                type="button"
                className="btn btn-outline-secondary px-4 py-2"
                data-bs-dismiss="modal"
                ref={cancelButtonRef}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger text-white px-4 py-2"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt me-2"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalLogoutModal;
