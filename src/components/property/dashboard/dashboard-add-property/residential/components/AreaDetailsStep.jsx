import { smallSelectStyles } from "@/utils/helper";
import { useState } from "react";
import Select from "react-select";

const AreaDetailsStep = ({
  formData,
  onDataChange,
  subType,
  errors,
  touched,
}) => {
  const [propertyOnFloorLabel, setPropertyOnFloorLabel] =
    useState("Select floor");
  const handleInputChange = (field, value) => {
    onDataChange({ [field]: value });
  };

  const getFieldError = (fieldName) => {
    return touched[fieldName] && errors[fieldName] ? errors[fieldName] : null;
  };

  return (
    <div className="area-details-step">
      <h4 className="title fz17 mb30">Add Area Details</h4>

      <div className="row row-cols-1 row-cols-md-2">
        <div className="col mb-3">
          <label className="form-label">Carpet area *</label>
          <div className="input-group responsive-input-group">
            <input
              type="number"
              className={`form-control filterInput ${
                getFieldError("carpetArea") ? "is-invalid" : ""
              }`}
              placeholder="Enter carpet area"
              value={formData.carpetArea || ""}
              onChange={(e) => handleInputChange("carpetArea", e.target.value)}
            />
            <select
              className="form-select"
              value={formData.carpetAreaUnit || "sq ft"}
              onChange={(e) =>
                handleInputChange("carpetAreaUnit", e.target.value)
              }
            >
              <option value="sq ft">sq ft</option>
              <option value="sq yd">sq yd</option>
              <option value="sq mtr">sq mtr</option>
            </select>
          </div>
          {getFieldError("carpetArea") && (
            <div className="text-danger">{getFieldError("carpetArea")}</div>
          )}
        </div>

        <div className="col mb-3">
          <label className="form-label">Built Up Area *</label>
          <div className="input-group responsive-input-group">
            <input
              type="number"
              className={`form-control filterInput ${
                getFieldError("builtUpArea") ? "is-invalid" : ""
              }`}
              placeholder="Enter built-up area"
              value={formData.builtUpArea || ""}
              onChange={(e) => handleInputChange("builtUpArea", e.target.value)}
            />
            <select
              className="form-select"
              value={formData.builtUpAreaUnit || "sq ft"}
              onChange={(e) =>
                handleInputChange("builtUpAreaUnit", e.target.value)
              }
            >
              <option value="sq ft">sq ft</option>
              <option value="sq yd">sq yd</option>
              <option value="sq mtr">sq mtr</option>
            </select>
          </div>
          {getFieldError("builtUpArea") && (
            <div className="text-danger">{getFieldError("builtUpArea")}</div>
          )}
        </div>

        <div className="col mb-3">
          <label className="form-label">Clear Height</label>
          <div className="input-group responsive-input-group">
            <input
              type="number"
              className={`form-control filterInput ${
                getFieldError("clearHeight") ? "is-invalid" : ""
              }`}
              placeholder="Enter clear height"
              value={formData.clearHeight || ""}
              onChange={(e) => handleInputChange("clearHeight", e.target.value)}
            />
            <span className="input-group-text">ft</span>
          </div>
          {getFieldError("clearHeight") && (
            <div className="text-danger">{getFieldError("clearHeight")}</div>
          )}
        </div>

        {/* Plot Area for Bungalow/House/Villa */}
        {(subType === "Bungalow" ||
          subType === "House" ||
          subType === "Villa") && (
          <div className="col mb-3">
            <label className="form-label">Plot Area</label>
            <div className="input-group responsive-input-group">
              <input
                type="number"
                className={`form-control filterInput ${
                  getFieldError("plotArea") ? "is-invalid" : ""
                }`}
                placeholder="Enter plot area"
                value={formData.plotArea || ""}
                onChange={(e) => handleInputChange("plotArea", e.target.value)}
              />
              <select
                className="form-select"
                value={formData.plotAreaUnit || "sq ft"}
                onChange={(e) =>
                  handleInputChange("plotAreaUnit", e.target.value)
                }
              >
                <option value="sq ft">sq ft</option>
                <option value="sq mtr">sq mtr</option>
                <option value="sq yd">sq yd</option>
              </select>
            </div>
            {getFieldError("plotArea") && (
              <div className="text-danger">{getFieldError("plotArea")}</div>
            )}
          </div>
        )}

        <div className="col mb-3">
          <label className="form-label">Furnishing *</label>
          <div className="form-style2 input-group">
            {["Furnished", "Unfurnished", "Semi-furnished"].map((option) => (
              <div className="selection" key={`furnishing-${option}`}>
                <input
                  id={`furnishing-${option}`}
                  type="radio"
                  name="furnishing"
                  value={option}
                  checked={formData.furnishing === option}
                  onChange={(e) =>
                    handleInputChange("furnishing", e.target.value)
                  }
                />
                <label htmlFor={`furnishing-${option}`}>{option}</label>
              </div>
            ))}
          </div>
          {getFieldError("furnishing") && (
            <div className="text-danger">{getFieldError("furnishing")}</div>
          )}
        </div>

        <div className="col mb-3">
          <label className="form-label">Specifications *</label>
          <textarea
            className={`form-control filterInput ${
              getFieldError("specifications") ? "is-invalid" : ""
            }`}
            rows="3"
            placeholder="Dining table, etc."
            value={formData.specifications || ""}
            onChange={(e) =>
              handleInputChange("specifications", e.target.value)
            }
          ></textarea>
          {getFieldError("specifications") && (
            <div className="text-danger">{getFieldError("specifications")}</div>
          )}
        </div>

        <div className="col mb-3">
          <label className="form-label">Total floors *</label>
          <input
            type="number"
            className={`form-control filterInput no-spin ${
              getFieldError("totalFloors") ? "is-invalid" : ""
            }`}
            placeholder="Enter total floors"
            value={formData.totalFloors || ""}
            onChange={(e) => handleInputChange("totalFloors", e.target.value)}
          />
          {getFieldError("totalFloors") && (
            <div className="text-danger">{getFieldError("totalFloors")}</div>
          )}
        </div>

        {subType === "Flat" && (
          <div className="col mb-3">
            <label className="form-label">Property on floor</label>
            <Select
              instanceId="propertyOnFloor"
              options={[
                { value: "-1", label: "Basement" },
                { value: "0", label: "Ground" },
                ...Array.from(
                  { length: formData?.totalFloors || 25 },
                  (_, i) => ({
                    value: (i + 1).toString(),
                    label: (i + 1).toString(),
                  })
                ),
              ]}
              styles={smallSelectStyles(getFieldError("propertyOnFloor"))}
              className="select-custom filterSelect"
              classNamePrefix="select"
              value={{
                value: formData.propertyOnFloor || "",
                label:
                  propertyOnFloorLabel ??
                  formData.propertyOnFloorLabel ??
                  "Select floor",
              }}
              onChange={(e) => {
                handleInputChange("propertyOnFloor", e.value);
                setPropertyOnFloorLabel(e.label);
              }}
            />
            {getFieldError("propertyOnFloor") && (
              <div className="text-danger">
                {getFieldError("propertyOnFloor")}
              </div>
            )}
          </div>
        )}

        <div className="col mb-3">
          <label className="form-label">Age of Property</label>
          <Select
            instanceId="ageOfProperty"
            options={[
              { value: "", label: "Select age" },
              { value: "0-1", label: "0-1" },
              { value: "1-5", label: "1-5" },
              { value: "5-10", label: "5-10" },
              { value: "10+", label: "10+" },
            ]}
            styles={smallSelectStyles(getFieldError("ageOfProperty"))}
            className="select-custom filterSelect"
            classNamePrefix="select"
            value={{
              value: formData.ageOfProperty || "",
              label: formData.ageOfProperty || "Select age",
            }}
            onChange={(e) => handleInputChange("ageOfProperty", e.value)}
          />
          {getFieldError("ageOfProperty") && (
            <div className="text-danger">{getFieldError("ageOfProperty")}</div>
          )}
        </div>

        <div className="col mb-3">
          <label className="form-label">Available from *</label>
          <input
            type="date"
            className={`form-control filterInput ${
              getFieldError("availableFrom") ? "is-invalid" : ""
            }`}
            value={formData.availableFrom || ""}
            onChange={(e) => handleInputChange("availableFrom", e.target.value)}
          />
          {getFieldError("availableFrom") && (
            <div className="text-danger">{getFieldError("availableFrom")}</div>
          )}
        </div>

        <div className="col mb-3">
          <label className="form-label">Willing to rent out to</label>
          <div className="d-flex flex-wrap gap-2">
            {["Family", "Single man", "Single woman", "Student"].map(
              (option) => (
                <div key={option} className=" mb-2">
                  <div className="form-check d-flex align-items-center gap-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`rentTo-${option}`}
                      checked={formData.rentTo?.includes(option) || false}
                      onChange={(e) => {
                        const currentOptions = formData.rentTo || [];
                        const updatedOptions = e.target.checked
                          ? [...currentOptions, option]
                          : currentOptions.filter((o) => o !== option);
                        handleInputChange("rentTo", updatedOptions);
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`rentTo-${option}`}
                    >
                      {option}
                    </label>
                  </div>
                </div>
              )
            )}
          </div>
          {getFieldError("rentTo") && (
            <div className="text-danger">{getFieldError("rentTo")}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AreaDetailsStep;
