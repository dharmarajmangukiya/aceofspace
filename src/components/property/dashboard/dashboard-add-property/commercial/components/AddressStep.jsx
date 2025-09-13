const AddressStep = ({ formData, onDataChange, subType }) => {
  const handleInputChange = (field, value) => {
    onDataChange({ [field]: value });
  };

  return (
    <div className="address-step">
      <h4 className="title fz17 mb30">Property Address</h4>

      <div className="row">
        <div className="col-md-12 mb-3">
          <label className="form-label">Area from Google *</label>
          <input
            type="text"
            className="form-control filterInput"
            placeholder="Search and select area from Google"
            value={formData.googleArea || ""}
            onChange={(e) => handleInputChange("googleArea", e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Office No *</label>
          <input
            type="text"
            className="form-control filterInput"
            placeholder="Enter office number"
            value={formData.officeNo || ""}
            onChange={(e) => handleInputChange("officeNo", e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Building/Project Name *</label>
          <input
            type="text"
            className="form-control filterInput"
            placeholder="Enter building or project name"
            value={formData.buildingName || ""}
            onChange={(e) => handleInputChange("buildingName", e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Landmark (optional)</label>
          <input
            type="text"
            className="form-control filterInput"
            placeholder="Nearby landmark"
            value={formData.landmark || ""}
            onChange={(e) => handleInputChange("landmark", e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Zone *</label>
          <select
            className="form-select filterSelect"
            value={formData.zone || ""}
            onChange={(e) => handleInputChange("zone", e.target.value)}
          >
            <option value="">Select zone</option>
            <option value="Zone 1">Zone 1</option>
            <option value="Zone 2">Zone 2</option>
            <option value="Zone 3">Zone 3</option>
            <option value="Zone 4">Zone 4</option>
            <option value="Zone 5">Zone 5</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Location inside *</label>
          <select
            className="form-select filterSelect"
            value={formData.locationInside || ""}
            onChange={(e) =>
              handleInputChange("locationInside", e.target.value)
            }
          >
            <option value="">Select location</option>
            <option value="Main Road">Main Road</option>
            <option value="Inside Lane">Inside Lane</option>
            <option value="Corner Plot">Corner Plot</option>
            <option value="Near Metro">Near Metro</option>
            <option value="Near Bus Stop">Near Bus Stop</option>
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">City *</label>
          <input
            type="text"
            className="form-control filterInput"
            placeholder="Enter city"
            value={formData.city || ""}
            onChange={(e) => handleInputChange("city", e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">State *</label>
          <input
            type="text"
            className="form-control filterInput"
            placeholder="Enter state"
            value={formData.state || ""}
            onChange={(e) => handleInputChange("state", e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Pincode *</label>
          <input
            type="text"
            className="form-control filterInput"
            placeholder="Enter pincode"
            value={formData.pincode || ""}
            onChange={(e) => handleInputChange("pincode", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressStep;
