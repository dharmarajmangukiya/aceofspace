import { residentialAmenities } from "@/utils/constants";
import { smallSelectStyles } from "@/utils/helper";
import classNames from "classnames";
import Select from "react-select";

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
          <div className="form-style2 input-group">
            <Select
              instanceId="agreementDuration"
              options={[
                { value: "None", label: "None" },
                ...Array.from({ length: 36 }, (_, i) => ({
                  value: (i + 1).toString(),
                  label: `${i + 1} month${i > 0 ? "s" : ""}`,
                })),
              ]}
              styles={smallSelectStyles}
              className="select-custom filterSelect"
              classNamePrefix="select"
              value={{
                value: formData.agreementDuration || "",
                label: formData.agreementDuration
                  ? formData.agreementDuration === "None"
                    ? "None"
                    : `${formData.agreementDuration} month${
                        formData.agreementDuration > 1 ? "s" : ""
                      }`
                  : "Select duration",
              }}
              onChange={(e) => handleInputChange("agreementDuration", e.value)}
              placeholder="Select duration"
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Month of notice</label>
          <div className="form-style2 input-group">
            <Select
              instanceId="noticeMonths"
              options={[
                { value: "None", label: "None" },
                ...Array.from({ length: 6 }, (_, i) => ({
                  value: (i + 1).toString(),
                  label: `${i + 1} month${i > 0 ? "s" : ""}`,
                })),
              ]}
              styles={smallSelectStyles}
              className="select-custom filterSelect"
              classNamePrefix="select"
              value={{
                value: formData.noticeMonths || "",
                label: formData.noticeMonths
                  ? formData.noticeMonths === "None"
                    ? "None"
                    : `${formData.noticeMonths} month${
                        formData.noticeMonths > 1 ? "s" : ""
                      }`
                  : "Select notice period",
              }}
              onChange={(e) => handleInputChange("noticeMonths", e.value)}
              placeholder="Select notice period"
            />
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Parking details</label>
          <div className="row">
            <div className="col-6">
              <label className="form-label small">Covered parking</label>
              <div className="input-group">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    const currentValue = parseInt(
                      formData.coveredParkingCount || 0
                    );
                    if (currentValue > 0) {
                      handleInputChange(
                        "coveredParkingCount",
                        currentValue - 1
                      );
                    }
                  }}
                  disabled={parseInt(formData.coveredParkingCount || 0) <= 0}
                >
                  -
                </button>
                <input
                  type="number"
                  className="form-control text-center no-spinner"
                  value={formData.coveredParkingCount || 0}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    handleInputChange(
                      "coveredParkingCount",
                      Math.max(0, value)
                    );
                  }}
                  min="0"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    const currentValue = parseInt(
                      formData.coveredParkingCount || 0
                    );
                    handleInputChange("coveredParkingCount", currentValue + 1);
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-6">
              <label className="form-label small">Open parking</label>
              <div className="input-group">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    const currentValue = parseInt(
                      formData.openParkingCount || 0
                    );
                    if (currentValue > 0) {
                      handleInputChange("openParkingCount", currentValue - 1);
                    }
                  }}
                  disabled={parseInt(formData.openParkingCount || 0) <= 0}
                >
                  -
                </button>
                <input
                  type="number"
                  className="form-control text-center no-spinner"
                  value={formData.openParkingCount || 0}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    handleInputChange("openParkingCount", Math.max(0, value));
                  }}
                  min="0"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    const currentValue = parseInt(
                      formData.openParkingCount || 0
                    );
                    handleInputChange("openParkingCount", currentValue + 1);
                  }}
                >
                  +
                </button>
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

        <div className="col-12">
          <label className="form-label">Amenities and facilities</label>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
            {residentialAmenities.map((amenity) => {
              const isSelected = formData.amenities?.includes(amenity) || false;
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
            })}
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-12 mb-3">
          <button
            type="button"
            className="ud-btn btn-thm"
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
