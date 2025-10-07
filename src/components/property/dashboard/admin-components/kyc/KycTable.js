"use client";
import { useApproveRejectKyc } from "@/hooks/api/admin/kyc";
import { BACKEND_BASE_URL } from "@/utils/config";
import { pickErrorMessage } from "@/utils/helper";
import { useState } from "react";
import toast from "react-hot-toast";
import ApproveKycConfirmation from "./ApproveKycConfirmation";
import RejectKycConfirmation from "./RejectKycConfirmation";

const KycTable = ({ data = [], refetch, isFetching }) => {
  const [selectedKyc, setSelectedKyc] = useState(null);
  const [actionType, setActionType] = useState(null); // 'approved' or 'rejected'

  const { mutate: approveRejectKyc } = useApproveRejectKyc();

  const handleAction = (kyc, type) => {
    setSelectedKyc(kyc);
    setActionType(type);
  };

  const confirmAction = () => {
    if (!selectedKyc || !actionType) return;

    approveRejectKyc(
      { kycId: selectedKyc?.id, status: actionType },
      {
        onSuccess: (data) => {
          toast.success(data?.message || "KYC updated successfully");
          refetch();
          setSelectedKyc(null);
          setActionType(null);
        },
        onError: (error) => {
          const errorMessage = pickErrorMessage(
            error,
            "Failed to update KYC. Please try again."
          );
          toast.error(errorMessage);
        },
      }
    );
  };

  return (
    <>
      <table className="table-style3 table at-savesearch">
        <thead className="t-head">
          <tr>
            {[
              "Customer Details",
              "Document Type",
              "Document ID",
              "Submitted Date",
              "Actions",
            ].map((header) => (
              <th key={header} scope="col" style={{ whiteSpace: "nowrap" }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="t-body">
          {isFetching ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                <div className="d-flex align-items-center justify-content-center">
                  <div
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="text-muted mb-0">Loading KYC submissions...</p>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                <p className="text-muted mb-0">No KYC submissions found</p>
              </td>
            </tr>
          ) : (
            data.map((kyc) => (
              <tr key={kyc.id}>
                <th scope="row">
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <div
                        className="bg-primary text-white d-flex align-items-center justify-content-center rounded-circle"
                        style={{
                          width: "40px",
                          height: "40px",
                          fontSize: "14px",
                        }}
                      >
                        {kyc.userId?.firstName?.charAt(0)?.toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <div className="fw-bold text-dark">
                        {kyc?.userId?.firstName} {kyc?.userId?.lastName}
                      </div>
                      <div className="text-muted small">
                        {kyc.userId?.email}
                      </div>
                    </div>
                  </div>
                </th>
                <td className="vam" style={{ whiteSpace: "nowrap" }}>
                  <span className="text-capitalize fw-medium">
                    {kyc?.documentType}
                  </span>
                </td>
                <td className="vam" style={{ whiteSpace: "nowrap" }}>
                  <code className="bg-light px-2 py-1 rounded">
                    {kyc?.documentNumber}
                  </code>
                </td>
                <td className="vam" style={{ whiteSpace: "nowrap" }}>
                  {formatDate(kyc?.createdAt)}
                </td>

                <td className="vam" style={{ whiteSpace: "nowrap" }}>
                  <div className="d-flex gap-2">
                    {kyc.status === "pending" && (
                      <>
                        <button
                          className="btn btn-success btn-sm text-white"
                          onClick={() => handleAction(kyc, "approved")}
                          data-bs-toggle="modal"
                          data-bs-target="#approveKycModal"
                          style={{
                            backgroundColor: "#28a745",
                            borderColor: "#28a745",
                            color: "white",
                            fontWeight: "500",
                          }}
                        >
                          <i className="fas fa-check me-1"></i>
                          Approve
                        </button>
                        <button
                          className="btn btn-danger btn-sm text-white"
                          onClick={() => handleAction(kyc, "rejected")}
                          data-bs-toggle="modal"
                          data-bs-target="#rejectKycModal"
                          style={{
                            backgroundColor: "#dc3545",
                            borderColor: "#dc3545",
                            color: "white",
                            fontWeight: "500",
                          }}
                        >
                          <i className="fas fa-times me-1"></i>
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => {
                        ViewDocument({ documentFile: kyc?.documentFile });
                      }}
                      style={{
                        borderColor: "#007bff",
                        color: "#007bff",
                        fontWeight: "500",
                      }}
                    >
                      <i className="fas fa-eye me-1"></i>
                      View Doc
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <ApproveKycConfirmation
        selectedKyc={selectedKyc}
        onConfirm={confirmAction}
      />
      <RejectKycConfirmation
        selectedKyc={selectedKyc}
        onConfirm={confirmAction}
      />
    </>
  );
};

export default KycTable;

const ViewDocument = ({ documentFile }) => {
  let files = [];
  try {
    if (Array.isArray(documentFile)) {
      files = documentFile;
    } else if (typeof documentFile === "string") {
      try {
        const parsed = JSON.parse(documentFile);
        if (Array.isArray(parsed)) {
          files = parsed;
        } else if (typeof parsed === "string") {
          files = [parsed];
        }
      } catch {
        files = [documentFile];
      }
    }
  } catch {
    files = [];
  }
  files.forEach((file) => {
    if (file) {
      // If file is already an absolute URL, don't prepend
      const url = file.startsWith("http") ? file : `${BACKEND_BASE_URL}${file}`;
      console.log(url);
      window.open(url, "_blank");
    }
  });
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
