import { useRef, useState } from "react";

const MediaStep = ({ formData, onDataChange, subType }) => {
  const [dragOver, setDragOver] = useState({ video: false, images: false });
  const videoInputRef = useRef(null);
  const imagesInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    onDataChange({ [field]: value });
  };

  const handleFileUpload = (field, files) => {
    // Convert FileList to Array and update the media field
    const fileArray = Array.from(files);
    console.log(`Uploading files for ${field}:`, fileArray);
    handleInputChange("media", fileArray);
  };

  const handleDragOver = (e, field) => {
    e.preventDefault();
    setDragOver((prev) => ({ ...prev, [field]: true }));
  };

  const handleDragLeave = (e, field) => {
    e.preventDefault();
    setDragOver((prev) => ({ ...prev, [field]: false }));
  };

  const handleDrop = (e, field) => {
    e.preventDefault();
    setDragOver((prev) => ({ ...prev, [field]: false }));
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(field, files);
    }
  };

  const handleClick = (field) => {
    if (field === "video") {
      videoInputRef.current?.click();
    } else {
      imagesInputRef.current?.click();
    }
  };

  return (
    <div className="media-step">
      <h4 className="title fz17 mb30">Media</h4>

      <div className="row row-cols-1 row-cols-xl-2 row-cols-md-2">
        <div className="col mb-4">
          <label className="form-label">Video</label>
          <div
            className={`upload-area ${dragOver.video ? "drag-over" : ""}`}
            onDragOver={(e) => handleDragOver(e, "video")}
            onDragLeave={(e) => handleDragLeave(e, "video")}
            onDrop={(e) => handleDrop(e, "video")}
            onClick={() => handleClick("video")}
            style={{
              border: `2px dashed ${
                dragOver.video ? "var(--primary-color)" : "#e0e0e0"
              }`,
              borderRadius: "12px",
              padding: "2rem",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              backgroundColor: dragOver.video
                ? "rgba(235, 103, 83, 0.05)"
                : "#fafafa",
              minHeight: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="mb-3">
              <i
                className="fas fa-video fa-2x"
                style={{
                  color: dragOver.video ? "var(--primary-color)" : "#999",
                  transition: "color 0.3s ease",
                }}
              ></i>
            </div>
            <p className="mb-3 fw-medium" style={{ color: "#333" }}>
              {dragOver.video ? "Drop video here" : "Upload property video"}
            </p>
            <p className="mb-3 small text-muted">
              Max 1 video • Under 2 minutes
            </p>
            <button
              type="button"
              className="btn"
              style={{
                backgroundColor: "var(--primary-color)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "8px 20px",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#d55a47";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "var(--primary-color)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Choose Video
            </button>
            <input
              ref={videoInputRef}
              type="file"
              className="d-none"
              accept="video/*"
              onChange={(e) => handleFileUpload("video", e.target.files)}
            />
          </div>
          {formData.media && formData.media.length > 0 && (
            <div className="mt-2">
              <small
                style={{ color: "var(--primary-color)", fontWeight: "500" }}
              >
                ✓ {formData.media.length} file(s) selected
              </small>
            </div>
          )}
        </div>

        <div className="col mb-4">
          <label className="form-label">Images</label>
          <div
            className={`upload-area ${dragOver.images ? "drag-over" : ""}`}
            onDragOver={(e) => handleDragOver(e, "images")}
            onDragLeave={(e) => handleDragLeave(e, "images")}
            onDrop={(e) => handleDrop(e, "images")}
            onClick={() => handleClick("images")}
            style={{
              border: `2px dashed ${
                dragOver.images ? "var(--primary-color)" : "#e0e0e0"
              }`,
              borderRadius: "12px",
              padding: "2rem",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              backgroundColor: dragOver.images
                ? "rgba(235, 103, 83, 0.05)"
                : "#fafafa",
              minHeight: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="mb-3">
              <i
                className="fas fa-images fa-2x"
                style={{
                  color: dragOver.images ? "var(--primary-color)" : "#999",
                  transition: "color 0.3s ease",
                }}
              ></i>
            </div>
            <p className="mb-3 fw-medium" style={{ color: "#333" }}>
              {dragOver.images ? "Drop images here" : "Upload property images"}
            </p>
            <p className="mb-3 small text-muted">
              Max 10 images • High quality
            </p>
            <button
              type="button"
              className="btn"
              style={{
                backgroundColor: "var(--primary-color)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "8px 20px",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#d55a47";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "var(--primary-color)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Choose Images
            </button>
            <input
              ref={imagesInputRef}
              type="file"
              className="d-none"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload("images", e.target.files)}
            />
          </div>
          {formData.media && formData.media.length > 0 && (
            <div className="mt-2">
              <small
                style={{ color: "var(--primary-color)", fontWeight: "500" }}
              >
                ✓ {formData.media.length} file(s) selected
              </small>
            </div>
          )}
        </div>
      </div>

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
              📸 Media Guidelines
            </h6>
            <ul
              className="mb-0 small"
              style={{ color: "#555", lineHeight: "1.6" }}
            >
              <li className="mb-2">
                Upload high-quality images (minimum 1200x800 pixels)
              </li>
              <li className="mb-2">
                Include images of all rooms, exterior, and amenities
              </li>
              <li className="mb-2">
                First image will be used as the main property image
              </li>
              <li className="mb-2">
                Videos should be under 2 minutes and 50MB
              </li>
              <li className="mb-2">
                Ensure good lighting and clean spaces in photos
              </li>
              <li>Maximum 1 video and 10 images allowed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaStep;
