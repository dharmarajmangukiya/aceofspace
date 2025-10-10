import { smallSelectStyles } from "@/utils/helper";
import Select from "react-select";

const AddressStep = ({
  formData,
  onDataChange,
  subType,
  errors,
  touched,
  setFieldTouched,
}) => {
  const handleInputChange = (field, value) => {
    onDataChange({ [field]: value });
  };

  const handleBlur = (field) => {
    if (setFieldTouched) {
      setFieldTouched(field, true);
    }
  };

  const getFieldError = (fieldName) => {
    return touched[fieldName] && errors[fieldName] ? errors[fieldName] : null;
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
          <label className="form-label">Address *</label>
          <input
            type="text"
            className={`form-control filterInput ${
              getFieldError("address") ? "is-invalid" : ""
            }`}
            placeholder="Enter complete address"
            value={formData.address || ""}
            onChange={(e) => handleInputChange("address", e.target.value)}
            onBlur={() => handleBlur("address")}
          />
          {getFieldError("address") && (
            <div className="invalid-feedback">{getFieldError("address")}</div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Office No *</label>
          <input
            type="text"
            className={`form-control filterInput ${
              getFieldError("officeNo") ? "is-invalid" : ""
            }`}
            placeholder="Enter office number"
            value={formData.officeNo || ""}
            onChange={(e) => handleInputChange("officeNo", e.target.value)}
            onBlur={() => handleBlur("officeNo")}
          />
          {getFieldError("officeNo") && (
            <div className="invalid-feedback">{getFieldError("officeNo")}</div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Building/Project Name *</label>
          <input
            type="text"
            className={`form-control filterInput ${
              getFieldError("buildingName") ? "is-invalid" : ""
            }`}
            placeholder="Enter building or project name"
            value={formData.buildingName || ""}
            onChange={(e) => handleInputChange("buildingName", e.target.value)}
            onBlur={() => handleBlur("buildingName")}
          />
          {getFieldError("buildingName") && (
            <div className="invalid-feedback">
              {getFieldError("buildingName")}
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Landmark (optional)</label>
          <input
            type="text"
            className={`form-control filterInput ${
              getFieldError("landmark") ? "is-invalid" : ""
            }`}
            placeholder="Nearby landmark"
            value={formData.landmark || ""}
            onChange={(e) => handleInputChange("landmark", e.target.value)}
            onBlur={() => handleBlur("landmark")}
          />
          {getFieldError("landmark") && (
            <div className="invalid-feedback">{getFieldError("landmark")}</div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Zone *</label>
          <Select
            instanceId="zone"
            options={[{ value: "", label: "Select zone" }, ...zoneOptions]}
            styles={smallSelectStyles()}
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
            styles={smallSelectStyles()}
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
            className={`form-control filterInput ${
              getFieldError("city") ? "is-invalid" : ""
            }`}
            placeholder="Enter city"
            value={formData.city || ""}
            onChange={(e) => handleInputChange("city", e.target.value)}
            onBlur={() => handleBlur("city")}
          />
          {getFieldError("city") && (
            <div className="invalid-feedback">{getFieldError("city")}</div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">State *</label>
          <input
            type="text"
            className={`form-control filterInput ${
              getFieldError("state") ? "is-invalid" : ""
            }`}
            placeholder="Enter state"
            value={formData.state || ""}
            onChange={(e) => handleInputChange("state", e.target.value)}
            onBlur={() => handleBlur("state")}
          />
          {getFieldError("state") && (
            <div className="invalid-feedback">{getFieldError("state")}</div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Pincode *</label>
          <input
            type="text"
            className={`form-control filterInput ${
              getFieldError("pincode") ? "is-invalid" : ""
            }`}
            placeholder="Enter pincode"
            value={formData.pincode || ""}
            onChange={(e) => handleInputChange("pincode", e.target.value)}
            onBlur={() => handleBlur("pincode")}
          />
          {getFieldError("pincode") && (
            <div className="invalid-feedback">{getFieldError("pincode")}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressStep;
