import { smallSelectStyles } from "@/utils/helper";
import Select from "react-select";

const RentDetailsStep = ({
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

  return (
    <div className="rent-details-step">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="title fz17 mb-0">Rent Details</h4>
      </div>

      <div className={`rent-details-content`}>
        <div className="row row-cols-1  row-cols-md-2">
          <div className="col mb-3">
            <label className="form-label">Expected rent *</label>
            <div className="input-group">
              <input
                type="number"
                className={`form-control filterInput no-spinner ${
                  getFieldError("expectedRent") ? "is-invalid" : ""
                }`}
                placeholder="Enter expected rent"
                value={formData.expectedRent || ""}
                onChange={(e) =>
                  handleInputChange("expectedRent", e.target.value)
                }
              />
              <span className="input-group-text">₹/month</span>
            </div>
            {getFieldError("expectedRent") && (
              <div className="text-danger">{getFieldError("expectedRent")}</div>
            )}
          </div>

          <div className="col mb-3">
            <label className="form-label">Maintenance *</label>
            <Select
              instanceId="maintenance"
              options={[
                { value: "", label: "Select maintenance" },
                { value: "monthly", label: "Monthly" },
                { value: "quarterly", label: "Quarterly" },
                { value: "yearly", label: "Yearly" },
              ]}
              styles={smallSelectStyles(getFieldError("maintenance"))}
              className="select-custom filterSelect"
              classNamePrefix="select"
              value={{
                value: formData.maintenance || "",
                label: formData.maintenance || "Select maintenance",
              }}
              onChange={(e) => handleInputChange("maintenance", e.value)}
            />
            {getFieldError("maintenance") && (
              <div className="text-danger">{getFieldError("maintenance")}</div>
            )}
          </div>

          <div className="col mb-3">
            <div className="form-check d-flex align-items-center gap-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="electricityWaterExcluded"
                checked={formData.electricityWaterExcluded || false}
                onChange={(e) =>
                  handleInputChange(
                    "electricityWaterExcluded",
                    e.target.checked
                  )
                }
              />
              <label
                className="form-check-label mb-0"
                htmlFor="electricityWaterExcluded"
              >
                Electricity and water charges excluded
              </label>
            </div>
            {getFieldError("electricityWaterExcluded") && (
              <div className="text-danger">
                {getFieldError("electricityWaterExcluded")}
              </div>
            )}
          </div>

          <div className="col mb-3">
            <div className="form-check d-flex align-items-center gap-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="priceNegotiation"
                checked={formData.priceNegotiation || false}
                onChange={(e) =>
                  handleInputChange("priceNegotiation", e.target.checked)
                }
              />
              <label
                className="form-check-label mb-0"
                htmlFor="priceNegotiation"
              >
                Price Negotiation
              </label>
            </div>
            {getFieldError("priceNegotiation") && (
              <div className="text-danger">
                {getFieldError("priceNegotiation")}
              </div>
            )}
          </div>

          <div className="col mb-3">
            <div className="form-check d-flex align-items-center gap-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="bookingAmount"
                checked={formData.bookingAmount === "1"}
                onChange={(e) =>
                  handleInputChange(
                    "bookingAmount",
                    e.target.checked ? "1" : "0"
                  )
                }
              />
              <label className="form-check-label mb-0" htmlFor="bookingAmount">
                Booking amount
              </label>
            </div>
            {getFieldError("bookingAmount") && (
              <div className="text-danger">
                {getFieldError("bookingAmount")}
              </div>
            )}
          </div>

          <div className="col mb-3">
            <div className="form-check d-flex align-items-center gap-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="membershipCharge"
                checked={formData.membershipCharge === "true"}
                onChange={(e) =>
                  handleInputChange(
                    "membershipCharge",
                    e.target.checked ? "true" : "false"
                  )
                }
              />
              <label
                className="form-check-label mb-0"
                htmlFor="membershipCharge"
              >
                Membership charge
              </label>
            </div>
            {getFieldError("membershipCharge") && (
              <div className="text-danger">
                {getFieldError("membershipCharge")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentDetailsStep;
