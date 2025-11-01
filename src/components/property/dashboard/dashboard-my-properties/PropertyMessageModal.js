"use client";

import { useEffect, useRef } from "react";
import MessageContainer from "../dashboard-message/MessageContainer";

const PropertyMessageModal = ({ property, isOpen, onClose }) => {
  const modalElementRef = useRef(null);

  const handleClose = () => {
    if (modalElementRef.current) {
      // Try different Bootstrap versions
      if (window.bootstrap && window.bootstrap.Modal) {
        const modal = window.bootstrap.Modal.getInstance(
          modalElementRef.current
        );
        if (modal) modal.hide();
      } else if (window.$ && window.$.fn.modal) {
        // jQuery Bootstrap
        window.$(modalElementRef.current).modal("hide");
      } else {
        // Fallback: manually close modal
        modalElementRef.current.classList.remove("show");
        modalElementRef.current.style.display = "none";
        modalElementRef.current.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");

        // Remove backdrop
        const backdrop = document.getElementById(
          "propertyMessageModalBackdrop"
        );
        if (backdrop) backdrop.remove();
      }
    }
    if (onClose) onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === "propertyMessageModal") {
      handleClose();
    }
  };

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Open/close modal based on isOpen prop
  useEffect(() => {
    if (!modalElementRef.current) return;

    if (isOpen) {
      // Try different Bootstrap versions
      if (window.bootstrap && window.bootstrap.Modal) {
        const modal = new window.bootstrap.Modal(modalElementRef.current);
        modal.show();
      } else if (window.$ && window.$.fn.modal) {
        // jQuery Bootstrap
        window.$(modalElementRef.current).modal("show");
      } else {
        // Fallback: manually trigger modal
        modalElementRef.current.classList.add("show");
        modalElementRef.current.style.display = "block";
        modalElementRef.current.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        // Add backdrop
        const backdrop = document.createElement("div");
        backdrop.className = "modal-backdrop fade show";
        backdrop.id = "propertyMessageModalBackdrop";
        document.body.appendChild(backdrop);
      }
    } else {
      handleClose();
    }
  }, [isOpen]);

  const getPropertyTitle = () => {
    if (!property) return "Property";
    if (property.apartmentName) return property.apartmentName;
    if (property.buildingName) return property.buildingName;
    return `${property.propertyType || "Property"} in ${property.city || ""}`;
  };

  return (
    <>
      <style>{`
        #propertyMessageModal .message_container {
          display: flex !important;
          flex-direction: column !important;
          height: 100% !important;
          margin-top: 0 !important;
          position: relative !important;
          overflow: hidden !important;
        }
        #propertyMessageModal .user_heading {
          flex-shrink: 0 !important;
        }
        #propertyMessageModal .inbox_chatting_box {
          flex: 1 !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
          min-height: 0 !important;
          max-height: none !important;
        }
        #propertyMessageModal .mi_text {
          position: sticky !important;
          bottom: 0 !important;
          flex-shrink: 0 !important;
          background-color: #ffffff !important;
          border-top: 1px solid #e9ecef !important;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05) !important;
          z-index: 10 !important;
        }
        #propertyMessageModal .message_input {
          position: relative !important;
        }
      `}</style>
      <div
        className="modal fade"
        id="propertyMessageModal"
        tabIndex={-1}
        aria-labelledby="propertyMessageModalLabel"
        aria-hidden="true"
        onClick={handleBackdropClick}
        ref={modalElementRef}
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-bottom">
              <h5 className="modal-title" id="propertyMessageModalLabel">
                Messages - {getPropertyTitle()}
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div
              className="modal-body p-0"
              style={{
                display: "flex",
                flexDirection: "column",
                height: "70vh",
                maxHeight: "70vh",
                overflow: "hidden",
              }}
            >
              <MessageContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyMessageModal;
