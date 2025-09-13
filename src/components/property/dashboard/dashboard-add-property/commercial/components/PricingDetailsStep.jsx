import classNames from "classnames";

const PricingDetailsStep = ({ formData, onDataChange, subType }) => {
  const handleInputChange = (field, value) => {
    onDataChange({ [field]: value });
  };

  const handleFacilityClick = (facility) => {
    const currentFacilities = formData.facilities || [];
    const isSelected = currentFacilities.includes(facility);
    const updatedFacilities = isSelected
      ? currentFacilities.filter((f) => f !== facility)
      : [...currentFacilities, facility];
    handleInputChange("facilities", updatedFacilities);
  };

  return (
    <div className="pricing-details-step">
      <h4 className="title fz17 mb30">Add Pricing & Details</h4>

      {/* Ownership */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="mb-3">Ownership</h5>
        </div>
        <div className="col-md-12 mb-3">
          <div className="d-flex gap-3">
            {["Freehold", "Leasehold", "Power of attorney"].map((option) => (
              <div key={option} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="ownership"
                  id={`ownership-${option}`}
                  value={option}
                  checked={formData.ownership === option}
                  onChange={(e) =>
                    handleInputChange("ownership", e.target.value)
                  }
                />
                <label
                  className="form-check-label"
                  htmlFor={`ownership-${option}`}
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Price Details */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="mb-3">Price Details</h5>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Expected Lease Amount *</label>
          <div className="input-group">
            <input
              type="number"
              className="form-control filterInput"
              placeholder="Enter lease amount"
              value={formData.leaseAmount || ""}
              onChange={(e) => handleInputChange("leaseAmount", e.target.value)}
            />
            <span className="input-group-text">₹</span>
            <span className="input-group-text">per sq ft</span>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Additional pricing</label>
          <div className="row">
            {[
              "Digi & UPS included",
              "Electricity & Water excluded",
              "Price Negotiable",
            ].map((option) => (
              <div key={option} className="col-12 mb-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`pricing-${option}`}
                    checked={
                      formData.additionalPricing?.includes(option) || false
                    }
                    onChange={(e) => {
                      const currentPricing = formData.additionalPricing || [];
                      const updatedPricing = e.target.checked
                        ? [...currentPricing, option]
                        : currentPricing.filter((p) => p !== option);
                      handleInputChange("additionalPricing", updatedPricing);
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`pricing-${option}`}
                  >
                    {option}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <label className="form-label">Maintenance</label>
          <div className="input-group">
            <input
              type="number"
              className="form-control filterInput"
              placeholder="Enter maintenance amount"
              value={formData.maintenanceAmount || ""}
              onChange={(e) =>
                handleInputChange("maintenanceAmount", e.target.value)
              }
            />
            <select
              className="form-select filterSelect"
              value={formData.maintenancePeriod || "Monthly"}
              onChange={(e) =>
                handleInputChange("maintenancePeriod", e.target.value)
              }
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Annually">Annually</option>
            </select>
            <span className="input-group-text">per unit</span>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Security deposit</label>
          <div className="d-flex gap-3">
            {["Fixed", "Multiple of rent", "None"].map((option) => (
              <div key={option} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="securityDeposit"
                  id={`security-${option}`}
                  value={option}
                  checked={formData.securityDeposit === option}
                  onChange={(e) =>
                    handleInputChange("securityDeposit", e.target.value)
                  }
                />
                <label
                  className="form-check-label"
                  htmlFor={`security-${option}`}
                >
                  {option}
                </label>
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
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <label className="form-label">Lock-in period</label>
          <div className="input-group">
            <input
              type="number"
              className="form-control filterInput"
              placeholder="Enter lock-in period"
              value={formData.lockInPeriod || ""}
              onChange={(e) =>
                handleInputChange("lockInPeriod", e.target.value)
              }
            />
            <span className="input-group-text">months</span>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Yearly rent increase</label>
          <div className="input-group">
            <input
              type="number"
              className="form-control filterInput"
              placeholder="Enter percentage"
              value={formData.yearlyRentIncrease || ""}
              onChange={(e) =>
                handleInputChange("yearlyRentIncrease", e.target.value)
              }
            />
            <span className="input-group-text">%</span>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <label className="form-label">Fire NOC certified</label>
          <div className="d-flex gap-3">
            {["Yes", "No"].map((option) => (
              <div key={option} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="fireNOC"
                  id={`fireNOC-${option}`}
                  value={option}
                  checked={formData.fireNOC === option}
                  onChange={(e) => handleInputChange("fireNOC", e.target.value)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`fireNOC-${option}`}
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Occupancy Certificate</label>
          <div className="d-flex gap-3">
            {["Yes", "No"].map((option) => (
              <div key={option} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="occupancyCert"
                  id={`occupancy-${option}`}
                  value={option}
                  checked={formData.occupancyCert === option}
                  onChange={(e) =>
                    handleInputChange("occupancyCert", e.target.value)
                  }
                />
                <label
                  className="form-check-label"
                  htmlFor={`occupancy-${option}`}
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-12 mb-3">
          <label className="form-label">Property description *</label>
          <textarea
            className="form-control filterInput"
            rows="4"
            placeholder="Describe your property (50-5000 characters)"
            value={formData.propertyDescription || ""}
            onChange={(e) =>
              handleInputChange("propertyDescription", e.target.value)
            }
            minLength={50}
            maxLength={5000}
          ></textarea>
          <small className="text-muted">
            {formData.propertyDescription?.length || 0}/5000 characters
          </small>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-12 mb-3">
          <label className="form-label">Facilities & amenities</label>
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
            {[
              "Air Conditioning",
              "Elevator",
              "Power Backup",
              "Security",
              "CCTV",
              "Fire Safety",
              "Parking",
              "Conference Room",
              "Reception Area",
              "Storage Space",
              "Loading Dock",
              "High Speed Internet",
              "Phone Lines",
            ].map((facility) => {
              const isSelected =
                formData.facilities?.includes(facility) || false;
              return (
                <div key={facility} className="col">
                  <button
                    type="button"
                    onClick={() => handleFacilityClick(facility)}
                    className={classNames(
                      "w-100 h-100 border border-1 rounded d-flex flex-column align-items-center justify-content-center p-3 amenity-btn",
                      {
                        "amenity-selected": isSelected,
                        "bg-white text-dark": !isSelected,
                      }
                    )}
                    style={{ minHeight: "80px" }}
                  >
                    <span className="text-center text-wrap">{facility}</span>
                  </button>
                </div>
              );
            })}
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

export default PricingDetailsStep;
