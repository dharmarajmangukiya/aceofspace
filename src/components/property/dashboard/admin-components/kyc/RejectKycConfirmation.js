"use client";
import { useEffect, useRef } from "react";

const RejectKycConfirmation = ({
  modalId = "rejectKycModal",
  selectedKyc,
  onConfirm,
}) => {
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    const handleShow = () => {
      const backdrops = document.querySelectorAll(".modal-backdrop");
      backdrops.forEach((backdrop) => {
        backdrop.style.zIndex = "200";
      });
    };

    const modal = document.getElementById(modalId);
    if (modal) modal.addEventListener("shown.bs.modal", handleShow);
    return () => {
      if (modal) modal.removeEventListener("shown.bs.modal", handleShow);
    };
  }, [modalId]);

  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex={-1}
      aria-labelledby={`${modalId}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-body p-4">
            <div className="text-center mb-4">
              <div className="mb-3">
                <i
                  className="fas fa-times-circle text-danger"
                  style={{ fontSize: "3rem" }}
                ></i>
              </div>
              <h4 className="mb-2 text-dark fw-bold">Reject KYC</h4>
              <p className="text-muted mb-0">
                Are you sure you want to reject this KYC submission? This action
                cannot be undone.
              </p>
              {selectedKyc && (
                <div className="mt-3 p-3 bg-light rounded">
                  <small className="text-muted">
                    Customer: {selectedKyc.userId?.firstName}{" "}
                    {selectedKyc.userId?.lastName}
                  </small>
                  <br />
                  <small className="text-muted">
                    Email: {selectedKyc.userId?.email}
                  </small>
                  <br />
                  <small className="text-muted">
                    Document: {selectedKyc.documentType} -{" "}
                    {selectedKyc.documentNumber}
                  </small>
                </div>
              )}
            </div>
            <div className="d-flex justify-content-center gap-3">
              <button
                type="button"
                className="btn btn-secondary px-4 py-2 text-white"
                data-bs-dismiss="modal"
                ref={cancelButtonRef}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger px-4 py-2 text-white"
                onClick={() => {
                  onConfirm();
                  cancelButtonRef?.current?.click();
                }}
              >
                <i className="fas fa-times me-2"></i>
                Reject KYC
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectKycConfirmation;
