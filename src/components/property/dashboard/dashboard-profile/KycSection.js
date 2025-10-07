"use client";
import { useKycUpload } from "@/hooks/api/kyc";
import FileUpload from "@/theme components/common/FileUpload";
import { kycDocumentTypeOptions } from "@/utils/constants";
import { pickErrorMessage, smallSelectStyles } from "@/utils/helper";
import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import * as Yup from "yup";

const KycSection = ({ userData, refetchProfile }) => {
  const { mutate: kycUpload, isPending } = useKycUpload();
  const formik = useFormik({
    initialValues: {
      documentType: "",
      documentNumber: "",
      documentImageFront: [],
      documentImageBack: [],
    },
    validationSchema: Yup.object({
      documentType: Yup.string().required("Document type is required"),
      documentNumber: Yup.string().required("Document ID is required"),
      documentImageFront: Yup.mixed()
        .test("fileRequired", "Document image front is required", (value) => {
          if (!value) return false;
          try {
            return Array.from(value).length > 0;
          } catch (e) {
            return !!value?.length;
          }
        })
        .required("Document image front is required"),
      documentImageBack: Yup.mixed().when("documentType", {
        is: (val) => val === "aadhar" || val === "pan",
        then: (schema) =>
          schema
            .test(
              "fileRequired",
              "Document image back is required",
              (value) => {
                if (!value) return false;
                try {
                  return Array.from(value).length > 0;
                } catch (e) {
                  return !!value?.length;
                }
              }
            )
            .required("Document image back is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    onSubmit: (values) => {
      const formData = new FormData();

      formData.append("documentType", values.documentType);
      formData.append("documentNumber", values?.documentNumber || "");

      // Utility to safely extract the first File (if it exists)
      const getFirstFile = (input) => {
        if (!input) return null;

        if (input instanceof FileList) return input[0];
        if (Array.isArray(input)) return input[0];
        if (input.file instanceof File) return input.file; // for wrapped file objects
        if (input instanceof File) return input;

        return null;
      };

      const frontFile = getFirstFile(values.documentImageFront);
      const backFile = getFirstFile(values.documentImageBack);

      if (frontFile) formData.append("documentFile", frontFile);
      if (backFile) formData.append("documentFile", backFile);

      kycUpload(formData, {
        onSuccess: (data) => {
          toast.success(data?.message || "KYC submitted successfully");
          refetchProfile();
        },
        onError: (error) => {
          const errorMessage = pickErrorMessage(error, "Failed to submit KYC");
          toast.error(errorMessage);
        },
      });
    },
  });

  useEffect(() => {
    if (formik.submitCount > 0) {
      setTimeout(() => {
        formik?.setFieldTouched("documentImageBack");
        formik?.setFieldTouched("documentImageFront");
      }, 1000);
    }
  }, [formik.values.documentImageFront, formik.values.documentImageBack]);

  const handleFileChange = (field, files) => {
    formik.setFieldValue(field, files);
    formik.setFieldTouched(field, true, true);
  };

  if (userData?.data?.kyc?.status === "pending") {
    return (
      <div
        className="alert alert-info d-flex align-items-center gap-3 py-3 px-4 rounded shadow-sm"
        style={{ background: "#e9f5ff", border: "1px solid #b6e0fe" }}
      >
        <span className="me-2" style={{ fontSize: "1.5rem", color: "#0d6efd" }}>
          <i className="fa fa-hourglass-half" aria-hidden="true"></i>
        </span>
        <div>
          <div className="fw-bold mb-1" style={{ color: "#0d6efd" }}>
            KYC Pending
          </div>
          <div className="small" style={{ color: "#333" }}>
            Your KYC is currently under review. Please wait while we verify your
            documents.
          </div>
        </div>
      </div>
    );
  }

  if (userData?.data?.kyc?.status === "approved") {
    return (
      <div
        className="alert alert-success d-flex align-items-center gap-3 py-3 px-4 rounded shadow-sm"
        style={{ background: "#e6f9ed", border: "1px solid #b6f0c4" }}
      >
        <span className="me-2" style={{ fontSize: "1.5rem", color: "#198754" }}>
          <i className="fa fa-check-circle" aria-hidden="true"></i>
        </span>
        <div>
          <div className="fw-bold mb-1" style={{ color: "#198754" }}>
            KYC Approved
          </div>
          <div className="small" style={{ color: "#333" }}>
            Your KYC has been successfully verified and approved.
          </div>
        </div>
      </div>
    );
  }

  const selectedDocumentType = kycDocumentTypeOptions.find(
    (type) => type.value === formik.values.documentType
  );

  return (
    <form className="form-style1" onSubmit={formik.handleSubmit}>
      <div className="row row-cols-1 row-cols-sm-2">
        <div className="col">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Document Type
            </label>
            <Select
              instanceId="documentType"
              options={kycDocumentTypeOptions}
              styles={smallSelectStyles}
              className="select-custom filterSelect"
              classNamePrefix="select"
              value={selectedDocumentType ?? null}
              onChange={(e) => formik.setFieldValue("documentType", e.value)}
              placeholder="Select document type"
            />
            {(formik.touched.documentType || formik.submitCount > 0) &&
              formik.errors.documentType && (
                <div className="text-danger small mt-1">
                  {formik.errors.documentType}
                </div>
              )}
          </div>
        </div>
        {/* End .col */}
        <div className="col">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Document ID
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your document ID"
              value={formik?.values?.documentNumber ?? ""}
              onChange={(e) =>
                formik.setFieldValue("documentNumber", e.target.value)
              }
            />
            {(formik.touched.documentNumber || formik.submitCount > 0) &&
              formik.errors.documentNumber && (
                <div className="text-danger small mt-1">
                  {formik.errors.documentNumber}
                </div>
              )}
          </div>
        </div>
        {/* End .col */}
      </div>

      {/* Document Images Section */}
      <div className="row row-cols-1 row-cols-xl-2 row-cols-md-2">
        <div className="col mb-4">
          <FileUpload
            label="Document Front"
            field="documentImageFront"
            value={formik.values.documentImageFront}
            onChange={(files) => handleFileChange("documentImageFront", files)}
            error={formik.errors.documentImageFront}
            touched={
              formik.touched.documentImageFront || formik.submitCount > 0
            }
            accept="image/*,application/pdf"
            maxFiles={1}
            maxSize={5}
            icon="fas fa-id-card"
            uploadText="Upload document front"
            dragText="Drop document here"
            buttonText="Choose Front Document"
            showGuidelines={false}
          />
        </div>

        <div className="col mb-4">
          <FileUpload
            label="Document Back"
            field="documentImageBack"
            value={formik.values.documentImageBack}
            onChange={(files) => handleFileChange("documentImageBack", files)}
            error={formik.errors.documentImageBack}
            touched={formik.touched.documentImageBack || formik.submitCount > 0}
            accept="image/*,application/pdf"
            maxFiles={1}
            maxSize={5}
            icon="fas fa-id-card"
            uploadText="Upload document back"
            dragText="Drop document here"
            buttonText="Choose Back Document"
            showGuidelines={false}
          />
        </div>
      </div>

      {/* Guidelines Section */}
      <div className="row">
        <div className="col-12">
          <div
            className="alert"
            style={{
              backgroundColor: "rgba(235, 103, 83, 0.1)",
              border: "1px solid rgba(235, 103, 83, 0.2)",
              borderRadius: "12px",
              padding: "1.5rem",
            }}
          >
            <h6
              className="alert-heading mb-3"
              style={{
                color: "var(--primary-color)",
                fontWeight: "600",
                fontSize: "16px",
              }}
            >
              📄 Document Guidelines
            </h6>
            <ul
              className="mb-0 small"
              style={{ color: "#555", lineHeight: "1.6" }}
            >
              <li className="mb-2">
                Supported formats: JPG, PNG, PDF (images or PDF documents)
              </li>
              <li>Maximum file size: 5MB per document</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="col-md-12">
        <div className="text-end">
          <button
            type="submit"
            className="ud-btn btn-dark"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit KYC"}
            <i className="fal fa-arrow-right-long" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default KycSection;
