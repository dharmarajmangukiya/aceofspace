"use client";
import FileUpload from "@/theme components/common/FileUpload";
import { smallSelectStyles } from "@/utils/helper";
import { useFormik } from "formik";
import { useEffect } from "react";
import Select from "react-select";
import * as Yup from "yup";

const KycSection = () => {
  const formik = useFormik({
    initialValues: {
      documentType: "",
      documentId: "",
      documentImageFront: null,
      documentImageBack: null,
    },
    validationSchema: Yup.object({
      documentType: Yup.string().required("Document type is required"),
      documentId: Yup.string().required("Document ID is required"),
      documentImageFront: Yup.mixed().required(
        "Document image front is required"
      ),
      documentImageBack: Yup.mixed().required(
        "Document image back is required"
      ),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleFileChange = (field, files) => {
    formik.setFieldValue(field, files);
  };

  useEffect(() => {
    console.log(formik.values);
    console.log(formik.errors);
    console.log(formik.submitCount);
  }, [formik]);

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
              options={[
                { value: "Aadhar", label: "Aadhar" },
                { value: "Pan", label: "Pan" },
                { value: "DL", label: "DL" },
              ]}
              styles={smallSelectStyles}
              className="select-custom filterSelect"
              classNamePrefix="select"
              value={{
                value: formik.values.documentType || "",
                label: formik.values.documentType || "Select document type",
              }}
              onChange={(e) => formik.setFieldValue("documentType", e.value)}
              placeholder="Select document type"
            />
            {formik.touched.documentType && formik.errors.documentType && (
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
              value={formik.values.documentId}
              onChange={(e) =>
                formik.setFieldValue("documentId", e.target.value)
              }
            />
            {formik.touched.documentId && formik.errors.documentId && (
              <div className="text-danger small mt-1">
                {formik.errors.documentId}
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
            touched={formik.touched.documentImageFront}
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
            touched={formik.touched.documentImageBack}
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
          <button type="submit" className="ud-btn btn-dark">
            Submit KYC
            <i className="fal fa-arrow-right-long" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default KycSection;
