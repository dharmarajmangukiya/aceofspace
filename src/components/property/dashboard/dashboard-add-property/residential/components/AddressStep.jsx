const AddressStep = ({ formData, onDataChange, subType }) => {
  const handleInputChange = (field, value) => {
    onDataChange({ [field]: value });
  };

  return (
    <div className="address-step">
      <h4 className="title fz17 mb30">Property Address</h4>

      <div className="row">
        <div className="col-md-12 mb-3">
          <label className="form-label">Address *</label>
          <input
            type="text"
            className="form-control filterInput"
            placeholder="Enter complete address"
            value={formData.address || ""}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">House No *</label>
          <input
            type="text"
            className="form-control filterInput"
            placeholder="Enter house number"
            value={formData.houseNo || ""}
            onChange={(e) => handleInputChange("houseNo", e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">
            {subType === "Flat"
              ? "Apartment Name *"
              : "Bunglow, House / Villa Name *"}
          </label>
          <input
            type="text"
            className="form-control filterInput"
            placeholder={`Enter ${
              subType === "Flat" ? "apartment" : "property"
            } name`}
            value={formData.propertyName || ""}
            onChange={(e) => handleInputChange("propertyName", e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Area *</label>
          <input
            type="text"
            className="form-control filterInput"
            placeholder="Enter area/locality"
            value={formData.area || ""}
            onChange={(e) => handleInputChange("area", e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Landmark</label>
          <input
            type="text"
            className="form-control filterInput"
            placeholder="Nearby landmark"
            value={formData.landmark || ""}
            onChange={(e) => handleInputChange("landmark", e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">City *</label>
          <input
            type="text"
            className="form-control filterInput"
            placeholder="Enter city"
            value={formData.city || ""}
            onChange={(e) => handleInputChange("city", e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">State *</label>
          <input
            type="text"
            className="form-control filterInput"
            placeholder="Enter state"
            value={formData.state || ""}
            onChange={(e) => handleInputChange("state", e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-3">
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
