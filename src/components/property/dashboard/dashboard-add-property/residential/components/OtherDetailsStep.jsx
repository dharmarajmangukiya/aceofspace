import classNames from "classnames";

const OtherDetailsStep = ({ formData, onDataChange, subType }) => {
  const handleInputChange = (field, value) => {
    onDataChange({ [field]: value });
  };

  const handleAmenityClick = (amenity) => {
    const currentAmenities = formData.amenities || [];
    const isSelected = currentAmenities.includes(amenity);
    const updatedAmenities = isSelected
      ? currentAmenities.filter((a) => a !== amenity)
      : [...currentAmenities, amenity];
    handleInputChange("amenities", updatedAmenities);
  };

  return (
    <div className="other-details-step">
      <h4 className="title fz17 mb30">Other Details</h4>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Security deposit</label>
          <div className="form-style2 input-group">
            {["Fixed", "Multiple of rent", "None"].map((option) => (
              <div className="selection" key={`security-${option}`}>
                <input
                  id={`security-${option}`}
                  type="radio"
                  name="securityDeposit"
                  value={option}
                  checked={formData.securityDeposit === option}
                  onChange={(e) =>
                    handleInputChange("securityDeposit", e.target.value)
                  }
                />
                <label htmlFor={`security-${option}`}>{option}</label>
              </div>
            ))}
          </div>

          {formData.securityDeposit === "Fixed" && (
            <div className="input-group mt-2">
              <input
                type="number"
                className="form-control filterInput"
                placeholder="Enter amount"
                value={formData.securityDepositAmount || ""}
                onChange={(e) =>
                  handleInputChange("securityDepositAmount", e.target.value)
                }
              />
              <span className="input-group-text">₹</span>
            </div>
          )}

          {formData.securityDeposit === "Multiple of rent" && (
            <div className="input-group mt-2">
              <input
                type="number"
                className="form-control filterInput"
                placeholder="Enter months"
                value={formData.securityDepositMonths || ""}
                onChange={(e) =>
                  handleInputChange("securityDepositMonths", e.target.value)
                }
              />
              <span className="input-group-text">months</span>
            </div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Duration of agreement</label>
          <select
            className="form-select filterSelect"
            value={formData.agreementDuration || ""}
            onChange={(e) =>
              handleInputChange("agreementDuration", e.target.value)
            }
          >
            <option value="">Select duration</option>
            {Array.from({ length: 37 }, (_, i) => i).map((month) => (
              <option key={month} value={month}>
                {month} months
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Month of notice</label>
          <select
            className="form-select filterSelect"
            value={formData.noticeMonths || ""}
            onChange={(e) => handleInputChange("noticeMonths", e.target.value)}
          >
            <option value="">Select notice period</option>
            <option value="None">None</option>
            {Array.from({ length: 6 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {month} month{month > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Parking details</label>
          <div className="row">
            <div className="col-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="coveredParking"
                  checked={formData.coveredParking || false}
                  onChange={(e) =>
                    handleInputChange("coveredParking", e.target.checked)
                  }
                />
                <label className="form-check-label" htmlFor="coveredParking">
                  Covered parking (+/-)
                </label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="openParking"
                  checked={formData.openParking || false}
                  onChange={(e) =>
                    handleInputChange("openParking", e.target.checked)
                  }
                />
                <label className="form-check-label" htmlFor="openParking">
                  Open parking (+/-)
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Facing</label>
          <div className="row">
            {["N", "E", "W", "S"].map((direction) => (
              <div key={direction} className="col-3 mb-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`facing-${direction}`}
                    checked={formData.facing?.includes(direction) || false}
                    onChange={(e) => {
                      const currentFacing = formData.facing || [];
                      const updatedFacing = e.target.checked
                        ? [...currentFacing, direction]
                        : currentFacing.filter((f) => f !== direction);
                      handleInputChange("facing", updatedFacing);
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`facing-${direction}`}
                  >
                    {direction}
                  </label>
                </div>
              </div>
            ))}
          </div>
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Additional facing details"
            value={formData.facingDetails || ""}
            onChange={(e) => handleInputChange("facingDetails", e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Amenities and facilities</label>
          <div className="row row-cols-1 row-cols-md-2 g-3">
            {["Main entrance", "Gated community", "Gas Pipeline"].map(
              (amenity) => {
                const isSelected =
                  formData.amenities?.includes(amenity) || false;
                return (
                  <div key={amenity} className="col">
                    <button
                      type="button"
                      onClick={() => handleAmenityClick(amenity)}
                      className={classNames(
                        "w-100 h-100 border border-1 rounded d-flex flex-column align-items-center justify-content-center p-3 amenity-btn",
                        {
                          "amenity-selected": isSelected,
                          "bg-white text-dark": !isSelected,
                        }
                      )}
                      style={{ minHeight: "80px" }}
                    >
                      <span className="text-center text-wrap">{amenity}</span>
                    </button>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 mb-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => console.log("Preview form:", formData)}
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtherDetailsStep;
