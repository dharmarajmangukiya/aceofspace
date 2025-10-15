import { usePlacesAutocomplete } from "@/hooks/usePlacesAutocomplete";
import { smallSelectStyles } from "@/utils/helper";
import { useEffect, useState } from "react";
import Select from "react-select";

const AreaAutocomplete = ({ value, onSelect, error, onBlur }) => {
  const [isClient, setIsClient] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const [selected, setSelected] = useState(null);

  const { options, isLoading, fetchPlaceDetails } = usePlacesAutocomplete({
    input: inputValue,
    enabled: isClient,
  });

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (value && typeof value === "object") {
      // Set display text
      setInputValue(value.placeName || value.formattedAddress || "");
      // Reconstruct the selected option for react-select
      setSelected({
        value: value.placeId,
        label: value.formattedAddress || value.placeName,
      });
    } else {
      setInputValue(value || "");
      setSelected(null);
    }
  }, [value]);

  return (
    <div>
      <Select
        value={selected}
        options={options}
        onInputChange={(v) => {
          setInputValue(v || "");
          // Don't call onChange during typing - only onSelect when location is chosen
        }}
        onChange={async (opt) => {
          setSelected(opt);
          if (!opt) {
            if (onSelect) onSelect(null);
            return;
          }
          const details = await fetchPlaceDetails(opt.value);
          if (details) {
            if (onSelect) onSelect(details);
          }
        }}
        placeholder="Search area in Ahmedabad"
        styles={smallSelectStyles(error)}
        className="select-custom filterSelect"
        classNamePrefix="select"
        isClearable
        isLoading={isLoading}
        onBlur={onBlur}
        noOptionsMessage={() => "No locations found in Ahmedabad"}
      />
      {error && <div className="text-danger mt-1">{error}</div>}
    </div>
  );
};

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
            <div className="text-danger">{getFieldError("address")}</div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">House No *</label>
          <input
            className={`form-control filterInput no-spinner ${
              getFieldError("houseNo") ? "is-invalid" : ""
            }`}
            placeholder="Enter house number"
            value={formData.houseNo || ""}
            type="number"
            onChange={(e) => handleInputChange("houseNo", e.target.value)}
            onBlur={() => handleBlur("houseNo")}
          />
          {getFieldError("houseNo") && (
            <div className="text-danger">{getFieldError("houseNo")}</div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">
            {subType === "Flat"
              ? "Apartment Name *"
              : "Bunglow, House / Villa Name *"}
          </label>
          <input
            type="text"
            className={`form-control filterInput ${
              getFieldError("apartmentName") ? "is-invalid" : ""
            }`}
            placeholder={`Enter ${
              subType === "Flat" ? "apartment" : "property"
            } name`}
            value={formData.apartmentName || ""}
            onChange={(e) => handleInputChange("apartmentName", e.target.value)}
            onBlur={() => handleBlur("apartmentName")}
          />
          {getFieldError("apartmentName") && (
            <div className="text-danger">{getFieldError("apartmentName")}</div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Area *</label>
          <AreaAutocomplete
            value={formData.area}
            onSelect={(payload) => {
              // Only set area - it contains coordinates inside
              handleInputChange("area", payload);
            }}
            error={getFieldError("area")}
            onBlur={() => handleBlur("area")}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Landmark</label>
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
            <div className="text-danger">{getFieldError("landmark")}</div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
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
            <div className="text-danger">{getFieldError("city")}</div>
          )}
        </div>

        <div className="col-md-4 mb-3">
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
            <div className="text-danger">{getFieldError("state")}</div>
          )}
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">Pincode *</label>
          <input
            type="number"
            className={`form-control filterInput no-spinner ${
              getFieldError("pincode") ? "is-invalid" : ""
            }`}
            placeholder="Enter pincode"
            value={formData.pincode || ""}
            onChange={(e) => handleInputChange("pincode", e.target.value)}
            onBlur={() => handleBlur("pincode")}
          />
          {getFieldError("pincode") && (
            <div className="text-danger">{getFieldError("pincode")}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressStep;
