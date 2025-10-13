import FileUpload from "@/theme components/common/FileUpload";

const MediaStep = ({ formData, onDataChange, subType, errors, touched }) => {
  const handleInputChange = (field, value) => {
    onDataChange({ [field]: value });
  };

  const getFieldError = (fieldName) => {
    return touched[fieldName] && errors[fieldName] ? errors[fieldName] : null;
  };

  return (
    <div className="media-step">
      <h4 className="title fz17 mb30">Media</h4>

      <div className="row row-cols-1 row-cols-xl-2 row-cols-md-2">
        <div className="col mb-4">
          <FileUpload
            label="Video"
            value={formData.video || []}
            onChange={(files) => handleInputChange("video", files)}
            error={getFieldError("video")}
            touched={touched?.video}
            accept="video/*"
            maxFiles={1}
            maxsize={5}
            preview={true}
            dragText="Drop video here"
            uploadText="Upload property video"
            buttonText="Choose Video"
            icon="fas fa-video"
            showGuidelines={false}
            disabled={true}
          />
        </div>

        <div className="col mb-4">
          <FileUpload
            label="Images"
            value={formData.media || []}
            onChange={(files) => handleInputChange("media", files)}
            error={getFieldError("media")}
            touched={touched?.media}
            accept="image/*"
            maxFiles={10}
            maxsize={5}
            preview={true}
            dragText="Drop images here"
            uploadText="Upload property images"
            buttonText="Choose Images"
            icon="fas fa-images"
            showGuidelines={false}
            name="media"
          />
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
                Videos should be under 2 minutes and 50MB (currently disabled)
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
