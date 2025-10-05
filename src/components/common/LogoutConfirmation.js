import { AuthContext } from "@/Layouts/AuthProvider";
import { useContext, useRef, useEffect } from "react";
import toast from "react-hot-toast";

const LogoutConfirmation = ({ sideBarPanelCloseRef }) => {
  const { logout } = useContext(AuthContext);
  const cancelButtonRef = useRef(null);

  // Set the modal backdrop z-index to 200 when the modal is shown
  useEffect(() => {
    const handleShow = () => {
      // Bootstrap 5 uses .modal-backdrop
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach((backdrop) => {
        backdrop.style.zIndex = '200';
      });
    };

    // Listen for modal show event
    const modal = document.getElementById("logoutModal");
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
    if (sideBarPanelCloseRef?.current) sideBarPanelCloseRef?.current?.click();
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
      id="logoutModal"
      tabIndex={-1}
      aria-labelledby="logoutModalLabel"
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
                className="btn btn-outline-secondary  px-4 py-2"
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

export default LogoutConfirmation;
