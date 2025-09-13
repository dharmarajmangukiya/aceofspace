const MediaStep = ({ formData, onDataChange, subType }) => {
  const handleInputChange = (field, value) => {
    onDataChange({ [field]: value });
  };

  const handleFileUpload = (field, files) => {
    // In a real application, you would handle file upload here
    console.log(`Uploading files for ${field}:`, files);
    handleInputChange(field, files);
  };

  return (
    <div className="media-step">
      <h4 className="title fz17 mb30">Media</h4>

      <div className="row">
        <div className="col-md-6 mb-4">
          <label className="form-label">Video</label>
          <div className="upload-area border border-2 border-dashed rounded p-3 text-center">
            <div className="mb-2">
              <i className="fas fa-video fa-2x text-muted"></i>
            </div>
            <p className="mb-2 small">Upload property video (max 1)</p>
            <input
              type="file"
              className="form-control d-none"
              id="propertyVideo"
              accept="video/*"
              onChange={(e) =>
                handleFileUpload("propertyVideo", e.target.files)
              }
            />
            <label
              htmlFor="propertyVideo"
              className="btn btn-outline-primary btn-sm"
            >
              Choose Video
            </label>
          </div>
          {formData.propertyVideo && formData.propertyVideo.length > 0 && (
            <div className="mt-2">
              <small className="text-success">
                {formData.propertyVideo.length} video(s) selected
              </small>
            </div>
          )}
        </div>

        <div className="col-md-6 mb-4">
          <label className="form-label">Images</label>
          <div className="upload-area border border-2 border-dashed rounded p-3 text-center">
            <div className="mb-2">
              <i className="fas fa-images fa-2x text-muted"></i>
            </div>
            <p className="mb-2 small">Upload property images (max 10)</p>
            <input
              type="file"
              className="form-control d-none"
              id="propertyImages"
              multiple
              accept="image/*"
              onChange={(e) =>
                handleFileUpload("propertyImages", e.target.files)
              }
            />
            <label
              htmlFor="propertyImages"
              className="btn btn-outline-primary btn-sm"
            >
              Choose Images
            </label>
          </div>
          {formData.propertyImages && formData.propertyImages.length > 0 && (
            <div className="mt-2">
              <small className="text-success">
                {formData.propertyImages.length}/10 image(s) selected
              </small>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="alert alert-info">
            <h6 className="alert-heading">Media Guidelines:</h6>
            <ul className="mb-0 small">
              <li>Upload high-quality images (minimum 1200x800 pixels)</li>
              <li>Include images of all rooms, exterior, and amenities</li>
              <li>First image will be used as the main property image</li>
              <li>Videos should be under 2 minutes and 50MB</li>
              <li>Ensure good lighting and clean spaces in photos</li>
              <li>Maximum 1 video and 10 images allowed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaStep;
