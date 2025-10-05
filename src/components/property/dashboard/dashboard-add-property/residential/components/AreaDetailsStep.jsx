import { smallSelectStyles } from "@/utils/helper";
import Select from "react-select";

const AreaDetailsStep = ({ formData, onDataChange, subType }) => {
  const handleInputChange = (field, value) => {
    onDataChange({ [field]: value });
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
              className="form-control filterInput"
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
        </div>

        <div className="col mb-3">
          <label className="form-label">Built Up Area</label>
          <div className="input-group responsive-input-group">
            <input
              type="number"
              className="form-control filterInput"
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
        </div>

        <div className="col mb-3">
          <label className="form-label">Clear Height</label>
          <div className="input-group responsive-input-group">
            <input
              type="number"
              className="form-control filterInput"
              placeholder="Enter clear height"
              value={formData.clearHeight || ""}
              onChange={(e) => handleInputChange("clearHeight", e.target.value)}
            />
            <span className="input-group-text">ft</span>
          </div>
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
                className="form-control filterInput"
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
        </div>

        <div className="col mb-3">
          <label className="form-label">Specifications</label>
          <textarea
            className="form-control filterInput"
            rows="3"
            placeholder="Dining table, etc."
            value={formData.specifications || ""}
            onChange={(e) =>
              handleInputChange("specifications", e.target.value)
            }
          ></textarea>
        </div>

        <div className="col mb-3">
          <label className="form-label">Total floors</label>
          <input
            type="text"
            className="form-control filterInput"
            placeholder="Enter total floors"
            value={formData.totalFloors || ""}
            onChange={(e) => handleInputChange("totalFloors", e.target.value)}
          />
        </div>

        {subType === "Flat" && (
          <div className="col mb-3">
            <label className="form-label">Property on floor</label>
            <Select
              instanceId="propertyFloor"
              options={[
                { value: "", label: "Select floor" },
                { value: "Basement", label: "Basement" },
                { value: "LG", label: "LG" },
                { value: "G", label: "G" },
                ...Array.from({ length: 25 }, (_, i) => ({
                  value: (i + 1).toString(),
                  label: (i + 1).toString(),
                })),
              ]}
              styles={smallSelectStyles}
              className="select-custom filterSelect"
              classNamePrefix="select"
              value={{
                value: formData.propertyFloor || "",
                label: formData.propertyFloor || "Select floor",
              }}
              onChange={(e) => handleInputChange("propertyFloor", e.value)}
            />
          </div>
        )}

        <div className="col mb-3">
          <label className="form-label">Age of Property</label>
          <Select
            instanceId="propertyAge"
            options={[
              { value: "", label: "Select age" },
              { value: "0-1", label: "0-1" },
              { value: "1-5", label: "1-5" },
              { value: "5-10", label: "5-10" },
              { value: "10+", label: "10+" },
            ]}
            styles={smallSelectStyles}
            className="select-custom filterSelect"
            classNamePrefix="select"
            value={{
              value: formData.propertyAge || "",
              label: formData.propertyAge || "Select age",
            }}
            onChange={(e) => handleInputChange("propertyAge", e.value)}
          />
        </div>

        <div className="col mb-3">
          <label className="form-label">Available from</label>
          <input
            type="date"
            className="form-control filterInput"
            value={formData.availableFrom || ""}
            onChange={(e) => handleInputChange("availableFrom", e.target.value)}
          />
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
        </div>
      </div>
    </div>
  );
};

export default AreaDetailsStep;
