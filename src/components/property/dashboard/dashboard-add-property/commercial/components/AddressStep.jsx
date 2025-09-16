import { smallSelectStyles } from "@/utilis/helper";
import Select from "react-select";

const AddressStep = ({ formData, onDataChange, subType }) => {
  const handleInputChange = (field, value) => {
    onDataChange({ [field]: value });
  };

  const zoneOptions = [
    { value: "Zone 1", label: "Zone 1" },
    { value: "Zone 2", label: "Zone 2" },
    { value: "Zone 3", label: "Zone 3" },
    { value: "Zone 4", label: "Zone 4" },
    { value: "Zone 5", label: "Zone 5" },
  ];

  const locationInsideOptions = [
    { value: "Main Road", label: "Main Road" },
    { value: "Inside Lane", label: "Inside Lane" },
    { value: "Corner Plot", label: "Corner Plot" },
    { value: "Near Metro", label: "Near Metro" },
    { value: "Near Bus Stop", label: "Near Bus Stop" },
  ];

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
          <Select
            instanceId="zone"
            options={[{ value: "", label: "Select zone" }, ...zoneOptions]}
            styles={smallSelectStyles}
            className="select-custom filterSelect"
            classNamePrefix="select"
            value={{
              value: formData.zone || "",
              label: formData.zone || "Select zone",
            }}
            onChange={(e) => handleInputChange("zone", e.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Location inside *</label>
          <Select
            instanceId="locationInside"
            options={[
              { value: "", label: "Select location" },
              ...locationInsideOptions,
            ]}
            styles={smallSelectStyles}
            className="select-custom filterSelect"
            classNamePrefix="select"
            value={{
              value: formData.locationInside || "",
              label: formData.locationInside || "Select location",
            }}
            onChange={(e) => handleInputChange("locationInside", e.value)}
          />
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
