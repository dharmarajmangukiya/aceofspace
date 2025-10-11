"use client";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const FileUpload = ({
  label,
  value,
  onChange,
  error,
  touched,
  accept = "image/*,video/*,application/pdf",
  maxFiles = 1,
  maxSize = 5, // in MB
  preview = true,
  dragText = "Drop files here",
  uploadText = "Upload files",
  buttonText = "Choose Files",
  icon = "fas fa-upload",
  className = "",
  style = {},
  onFileSelect,
  showGuidelines = true,
  guidelines = [],
  disabled = false,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);
  const [previewModal, setPreviewModal] = useState({ show: false, url: null });

  const friendlyTypeName = (type) => {
    type = type.trim().toLowerCase();
    if (type === "*") return "Any file";
    if (type === "image/*") return "Images";
    if (type === "video/*") return "Videos";
    if (type.startsWith(".")) return type.slice(1).toUpperCase();
    return type; // fallback for exact mime types
  };

  const handleFileUpload = (files) => {
    if (!files || files.length === 0) return;

    const acceptedTypes = accept
      .split(",")
      .map((type) => type.trim().toLowerCase());

    // Check invalid types
    const invalidTypeFiles = Array.from(files).filter((file) => {
      if (acceptedTypes.includes("*")) return false;

      return !acceptedTypes.some((type) => {
        if (type.endsWith("/*")) {
          const mainType = type.split("/")[0];
          return file.type.startsWith(mainType + "/");
        }
        if (type.startsWith(".")) {
          return file.name.toLowerCase().endsWith(type);
        }
        return file.type === type;
      });
    });

    if (invalidTypeFiles.length > 0) {
      const fileNames = invalidTypeFiles.map((f) => f.name).join(", ");
      const allowedNames = acceptedTypes.map(friendlyTypeName).join(", ");
      toast.error(
        `Invalid file type for: ${fileNames}. Allowed types: ${allowedNames}`
      );
      return;
    }

    // Check oversized files
    const oversizedFiles = Array.from(files).filter(
      (file) => file.size > maxSize * 1024 * 1024
    );
    if (oversizedFiles.length > 0) {
      const fileNames = oversizedFiles.map((f) => f.name).join(", ");
      toast.error(
        `File(s) too large: ${fileNames}. Maximum allowed size is ${maxSize}MB`
      );
      return;
    }

    // Check file count
    if (files.length > maxFiles) {
      toast.error(
        `Maximum ${maxFiles} file(s) allowed. You selected ${files.length}.`
      );
      return;
    }

    // All validations passed
    onChange(files);
    if (onFileSelect) onFileSelect(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) {
      setDragOver(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (!disabled) {
      setDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (!disabled) {
      const files = e.dataTransfer.files;
      handleFileUpload(files);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const getFilePreview = (file) => {
    if (!file) return null;

    const fileType = file.type;
    if (fileType.startsWith("image/")) {
      return URL.createObjectURL(file);
    } else if (fileType.startsWith("video/")) {
      return URL.createObjectURL(file);
    } else if (fileType === "application/pdf") {
      return URL.createObjectURL(file);
    }
    return null;
  };

  const getFileIcon = (file) => {
    if (!file) return "fas fa-file";

    const fileType = file.type;
    if (fileType.startsWith("image/")) {
      return "fas fa-image";
    } else if (fileType.startsWith("video/")) {
      return "fas fa-video";
    } else if (fileType === "application/pdf") {
      return "fas fa-file-pdf";
    }
    return "fas fa-file";
  };

  const openPreview = (file) => {
    if (file.type.startsWith("image/")) {
      setPreviewModal({ show: true, url: getFilePreview(file) });
    } else {
      window.open(getFilePreview(file), "_blank");
    }
  };

  const closePreview = () => {
    setPreviewModal({ show: false, url: null });
  };

  const getAcceptedTypes = () => {
    const types = accept.split(",");
    const typeNames = [];

    if (types.includes("image/*")) typeNames.push("Images");
    if (types.includes("video/*")) typeNames.push("Videos");
    if (types.includes("application/pdf")) typeNames.push("PDFs");

    return typeNames.join(", ");
  };

  // New: Remove file handler
  const handleRemoveFile = (removeIndex) => {
    if (!value) return;
    // value can be FileList or array
    let filesArr = Array.from(value);
    filesArr.splice(removeIndex, 1);
    // Create a new FileList-like object for onChange
    // If you want to keep it as FileList, you need to use DataTransfer
    if (value instanceof FileList) {
      const dt = new DataTransfer();
      filesArr.forEach((file) => dt.items.add(file));
      onChange(dt.files);
      if (onFileSelect) onFileSelect(dt.files);
    } else {
      onChange(filesArr);
      if (onFileSelect) onFileSelect(filesArr);
    }
  };

  return (
    <div className={`file-upload-container ${className}`} style={style}>
      {label && (
        <label className="form-label heading-color ff-heading fw600 mb10">
          {label}
        </label>
      )}

      <div
        className={`upload-area ${dragOver ? "drag-over" : ""} ${
          disabled ? "disabled" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        style={{
          border: `2px dashed ${
            disabled ? "#ccc" : dragOver ? "var(--primary-color)" : "#e0e0e0"
          }`,
          borderRadius: "12px",
          padding: "2rem",
          textAlign: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "all 0.3s ease",
          backgroundColor: disabled
            ? "#f5f5f5"
            : dragOver
            ? "rgba(235, 103, 83, 0.05)"
            : "#fafafa",
          minHeight: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <div className="mb-3">
          <i
            className={`${icon} fa-2x`}
            style={{
              color: disabled
                ? "#ccc"
                : dragOver
                ? "var(--primary-color)"
                : "#999",
              transition: "color 0.3s ease",
            }}
          ></i>
        </div>
        <p
          className="mb-3 fw-medium"
          style={{ color: disabled ? "#999" : "#333" }}
        >
          {disabled
            ? "Video upload disabled"
            : dragOver
            ? dragText
            : uploadText}
        </p>
        <p className="mb-3 small text-muted">
          {disabled
            ? "This feature is currently unavailable"
            : `Max ${maxFiles} file(s) • ${getAcceptedTypes()} • Max ${maxSize}MB`}
        </p>
        <button
          type="button"
          className="btn"
          disabled={disabled}
          style={{
            backgroundColor: disabled ? "#ccc" : "var(--primary-color)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "8px 20px",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.3s ease",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
          onMouseOver={(e) => {
            if (!disabled) {
              e.target.style.backgroundColor = "#d55a47";
              e.target.style.transform = "translateY(-1px)";
            }
          }}
          onMouseOut={(e) => {
            if (!disabled) {
              e.target.style.backgroundColor = "var(--primary-color)";
              e.target.style.transform = "translateY(0)";
            }
          }}
        >
          {disabled ? "Disabled" : buttonText}
        </button>
        <input
          ref={inputRef}
          type="file"
          className="d-none"
          accept={accept}
          multiple={maxFiles > 1}
          onChange={(e) => handleFileUpload(e.target.files)}
        />
      </div>

      {/* File Preview */}
      {preview && value && value.length > 0 && (
        <div className="mt-3">
          <div className="d-flex align-items-center mb-2">
            <small style={{ color: "var(--primary-color)", fontWeight: "500" }}>
              ✓ {value.length} file(s) selected
            </small>
          </div>
          <div className="preview-container d-flex flex-wrap gap-2">
            {Array.from(value).map((file, index) => (
              <div
                key={index}
                className="preview-item position-relative"
                style={{ maxWidth: "200px" }}
              >
                {/* Cross button at top-left */}
                <button
                  type="button"
                  aria-label="Remove file"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(index);
                  }}
                  style={{
                    position: "absolute",
                    top: "6px",
                    left: "6px",
                    zIndex: 10,
                    background: "rgba(255,255,255,0.85)",
                    border: "none",
                    borderRadius: "50%",
                    width: "28px",
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                    padding: 0,
                  }}
                  tabIndex={0}
                >
                  <i
                    className="fal fa-times"
                    style={{
                      color: "var(--primary-color)",
                      fontSize: "18px",
                      pointerEvents: "none",
                    }}
                  ></i>
                </button>
                {file.type.startsWith("image/") ? (
                  <img
                    src={getFilePreview(file)}
                    alt={`Preview ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "160px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "2px solid var(--primary-color)",
                      cursor: "pointer",
                    }}
                    onClick={() => openPreview(file)}
                  />
                ) : file.type.startsWith("video/") ? (
                  <div className="relative" style={{ position: "relative" }}>
                    <video
                      src={getFilePreview(file)}
                      style={{
                        width: "100%",
                        height: "160px",
                        minWidth: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "2px solid var(--primary-color)",
                        cursor: "pointer",
                        display: "block",
                      }}
                      onClick={() => openPreview(file)}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(255,255,255,0.7)",
                        borderRadius: "50%",
                        padding: "6px",
                        cursor: "pointer",
                      }}
                      onClick={() => openPreview(file)}
                    >
                      <i
                        className="fal fa-play fa-2x"
                        style={{ color: "var(--primary-color)" }}
                      ></i>
                    </span>
                  </div>
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "120px",
                      backgroundColor: "#f8f9fa",
                      border: "2px solid var(--primary-color)",
                      borderRadius: "8px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => openPreview(file)}
                  >
                    <i
                      className={getFileIcon(file)}
                      style={{
                        fontSize: "2rem",
                        color: "var(--primary-color)",
                        marginBottom: "8px",
                      }}
                    ></i>
                    <small style={{ color: "#666", textAlign: "center" }}>
                      Click to preview
                    </small>
                  </div>
                )}
                <div className="file-info mt-1">
                  <small
                    className="text-muted d-block"
                    style={{ fontSize: "12px" }}
                  >
                    {file.name}
                  </small>
                  <small className="text-muted" style={{ fontSize: "11px" }}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {touched && error && (
        <div className="text-danger small mt-1">{error}</div>
      )}

      {/* Guidelines */}
      {showGuidelines && guidelines.length > 0 && (
        <div className="mt-3">
          <div
            className="alert"
            style={{
              backgroundColor: "rgba(235, 103, 83, 0.1)",
              border: "1px solid rgba(235, 103, 83, 0.2)",
              borderRadius: "12px",
              padding: "1rem",
            }}
          >
            <h6
              className="alert-heading mb-2"
              style={{
                color: "var(--primary-color)",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              📄 Guidelines
            </h6>
            <ul
              className="mb-0 small"
              style={{ color: "#555", lineHeight: "1.5" }}
            >
              {guidelines.map((guideline, index) => (
                <li key={index} className="mb-1">
                  {guideline}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewModal.show && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={closePreview}
        >
          <div
            className="modal-content"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewModal.url}
              alt="Preview"
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              }}
            />
            <button
              onClick={closePreview}
              style={{
                position: "absolute",
                top: "-20px",
                right: "0",
                background: "rgba(255, 255, 255, 0.9)",
                border: "2px solid #fff",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "20px",
                color: "#333",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
              }}
            >
              <i className="fal fa-times"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
