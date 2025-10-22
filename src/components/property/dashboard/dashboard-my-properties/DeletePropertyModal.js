"use client";

import { useEffect, useRef } from "react";

const DeletePropertyModal = ({ property, onConfirm, isDeleting = false }) => {
  const cancelButtonRef = useRef(null);

  const handleClose = () => {
    const modalElement = document.getElementById("deletePropertyModal");
    if (modalElement) {
      // Try different Bootstrap versions
      if (window.bootstrap && window.bootstrap.Modal) {
        const modal = window.bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
      } else if (window.$ && window.$.fn.modal) {
        // jQuery Bootstrap
        window.$(modalElement).modal("hide");
      } else {
        // Fallback: manually close modal
        modalElement.classList.remove("show");
        modalElement.style.display = "none";
        modalElement.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");

        // Remove backdrop
        const backdrop = document.getElementById("deletePropertyModalBackdrop");
        if (backdrop) backdrop.remove();
      }
    }
  };

  const handleDelete = () => {
    if (property && onConfirm) {
      onConfirm(property.id);
    }
  };

  const getPropertyTitle = () => {
    if (!property) return "";
    if (property.apartmentName) return property.apartmentName;
    if (property.buildingName) return property.buildingName;
    return `${property.propertyType || "Property"} in ${property.city || ""}`;
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === "deletePropertyModal" && !isDeleting) {
      handleClose();
    }
  };

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && !isDeleting) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDeleting]);

  return (
    <div
      className="modal fade"
      id="deletePropertyModal"
      tabIndex={-1}
      aria-labelledby="deletePropertyModalLabel"
      aria-hidden="true"
      onClick={handleBackdropClick}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-body p-4">
            <div className="text-center mb-4">
              <div className="mb-3">
                <i
                  className="fas fa-exclamation-triangle text-warning"
                  style={{ fontSize: "48px" }}
                ></i>
              </div>
              <h4 className="mb-2 text-dark fw-bold">Delete Property</h4>
              <p className="text-muted mb-0">
                Are you sure you want to delete{" "}
                <strong>{getPropertyTitle()}</strong>?
                <br />
                This action cannot be undone.
              </p>
            </div>
            <div className="d-flex justify-content-center gap-3">
              <button
                type="button"
                className="btn btn-outline-secondary px-4 py-2"
                onClick={handleClose}
                ref={cancelButtonRef}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger text-white px-4 py-2"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Deleting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-trash-alt me-2"></i>
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePropertyModal;
