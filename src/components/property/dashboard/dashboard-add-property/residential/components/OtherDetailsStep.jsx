import { residentialAmenities } from "@/utils/constants";
import { smallSelectStyles } from "@/utils/helper";
import classNames from "classnames";
import Select from "react-select";

const OtherDetailsStep = ({
  formData,
  onDataChange,
  subType,
  errors,
  touched,
}) => {
  const handleInputChange = (field, value) => {
    onDataChange({ [field]: value });
  };

  const getFieldError = (fieldName) => {
    return touched[fieldName] && errors[fieldName] ? errors[fieldName] : null;
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
          {getFieldError("securityDeposit") && (
            <div className="text-danger">
              {getFieldError("securityDeposit")}
            </div>
          )}

          {formData.securityDeposit === "Fixed" && (
            <div className="input-group mt-2">
              <input
                type="number"
                className={`form-control filterInput ${
                  getFieldError("securityDepositAmount") ? "is-invalid" : ""
                }`}
                placeholder="Enter amount"
                value={formData.securityDepositAmount || ""}
                onChange={(e) =>
                  handleInputChange("securityDepositAmount", e.target.value)
                }
              />
              <span className="input-group-text">₹</span>
            </div>
          )}
          {formData.securityDeposit === "Fixed" &&
            getFieldError("securityDepositAmount") && (
              <div className="text-danger">
                {getFieldError("securityDepositAmount")}
              </div>
            )}

          {formData.securityDeposit === "Multiple of rent" && (
            <div className="input-group mt-2">
              <input
                type="number"
                className={`form-control filterInput ${
                  getFieldError("securityDepositMonths") ? "is-invalid" : ""
                }`}
                placeholder="Enter months"
                value={formData.securityDepositMonths || ""}
                onChange={(e) =>
                  handleInputChange("securityDepositMonths", e.target.value)
                }
              />
              <span className="input-group-text">months</span>
            </div>
          )}
          {formData.securityDeposit === "Multiple of rent" &&
            getFieldError("securityDepositMonths") && (
              <div className="text-danger">
                {getFieldError("securityDepositMonths")}
              </div>
            )}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Duration of agreement</label>
          <div className="form-style2 input-group">
            <Select
              instanceId="durationOfAgreement"
              options={[
                { value: "None", label: "None" },
                ...Array.from({ length: 36 }, (_, i) => ({
                  value: (i + 1).toString(),
                  label: `${i + 1} month${i > 0 ? "s" : ""}`,
                })),
              ]}
              styles={smallSelectStyles(getFieldError("durationOfAgreement"))}
              className="select-custom filterSelect"
              classNamePrefix="select"
              value={{
                value: formData.durationOfAgreement || "",
                label: formData.durationOfAgreement
                  ? formData.durationOfAgreement === "None"
                    ? "None"
                    : `${formData.durationOfAgreement} month${
                        formData.durationOfAgreement > 1 ? "s" : ""
                      }`
                  : "Select duration",
              }}
              onChange={(e) =>
                handleInputChange("durationOfAgreement", e.value)
              }
              placeholder="Select duration"
            />
          </div>
          {getFieldError("durationOfAgreement") && (
            <div className="text-danger">
              {getFieldError("durationOfAgreement")}
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Month of notice</label>
          <div className="form-style2 input-group">
            <Select
              instanceId="noticePeriod"
              options={[
                { value: "None", label: "None" },
                ...Array.from({ length: 6 }, (_, i) => ({
                  value: (i + 1).toString(),
                  label: `${i + 1} month${i > 0 ? "s" : ""}`,
                })),
              ]}
              styles={smallSelectStyles(getFieldError("noticePeriod"))}
              className="select-custom filterSelect"
              classNamePrefix="select"
              value={{
                value: formData.noticePeriod || "",
                label: formData.noticePeriod
                  ? formData.noticePeriod === "None"
                    ? "None"
                    : `${formData.noticePeriod} month${
                        formData.noticePeriod > 1 ? "s" : ""
                      }`
                  : "Select notice period",
              }}
              onChange={(e) => handleInputChange("noticePeriod", e.value)}
              placeholder="Select notice period"
            />
          </div>
          {getFieldError("noticeMonths") && (
            <div className="text-danger">{getFieldError("noticeMonths")}</div>
          )}
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
                    const currentValue = parseInt(formData.coveredParking || 0);
                    if (currentValue > 0) {
                      handleInputChange("coveredParking", currentValue - 1);
                    }
                  }}
                  disabled={parseInt(formData.coveredParking || 0) <= 0}
                >
                  -
                </button>
                <input
                  type="number"
                  className={`form-control text-center no-spinner ${
                    getFieldError("coveredParking") ? "is-invalid" : ""
                  }`}
                  value={formData.coveredParking || 0}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    handleInputChange("coveredParking", Math.max(0, value));
                  }}
                  min="0"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    const currentValue = parseInt(formData.coveredParking || 0);
                    handleInputChange("coveredParking", currentValue + 1);
                  }}
                >
                  +
                </button>
              </div>
              {getFieldError("coveredParking") && (
                <div className="text-danger">
                  {getFieldError("coveredParking")}
                </div>
              )}
            </div>
            <div className="col-6">
              <label className="form-label small">Open parking</label>
              <div className="input-group">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    const currentValue = parseInt(formData.openParking || 0);
                    if (currentValue > 0) {
                      handleInputChange("openParking", currentValue - 1);
                    }
                  }}
                  disabled={parseInt(formData.openParking || 0) <= 0}
                >
                  -
                </button>
                <input
                  type="number"
                  className={`form-control text-center no-spinner ${
                    getFieldError("openParking") ? "is-invalid" : ""
                  }`}
                  value={formData.openParking || 0}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    handleInputChange("openParking", Math.max(0, value));
                  }}
                  min="0"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    const currentValue = parseInt(formData.openParking || 0);
                    handleInputChange("openParking", currentValue + 1);
                  }}
                >
                  +
                </button>
              </div>
              {getFieldError("openParking") && (
                <div className="text-danger">
                  {getFieldError("openParking")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Facing</label>
          <div className="row row-cols-4">
            {[
              { value: "North", label: "North" },
              { value: "East", label: "East" },
              { value: "West", label: "West" },
              { value: "South", label: "South" },
            ].map((direction) => (
              <div key={direction.value} className="col mb-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="facing"
                    id={`facing-${direction.value}`}
                    value={direction.value}
                    checked={formData.facing === direction.value}
                    onChange={(e) =>
                      handleInputChange("facing", e.target.value)
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`facing-${direction.value}`}
                  >
                    {direction.label}
                  </label>
                </div>
              </div>
            ))}
          </div>
          {getFieldError("facing") && (
            <div className="text-danger">{getFieldError("facing")}</div>
          )}
          <input
            type="text"
            className={`form-control mt-2 ${
              getFieldError("facingDetails") ? "is-invalid" : ""
            }`}
            placeholder="Additional facing details"
            value={formData.facingDetails || ""}
            onChange={(e) => handleInputChange("facingDetails", e.target.value)}
          />
          {getFieldError("facingDetails") && (
            <div className="text-danger">{getFieldError("facingDetails")}</div>
          )}
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
          {getFieldError("amenities") && (
            <div className="text-danger">{getFieldError("amenities")}</div>
          )}
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
