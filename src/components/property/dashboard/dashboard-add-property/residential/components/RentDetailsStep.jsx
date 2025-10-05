import { smallSelectStyles } from "@/utils/helper";
import Select from "react-select";

const RentDetailsStep = ({ formData, onDataChange, subType }) => {
  const handleInputChange = (field, value) => {
    onDataChange({ [field]: value });
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
                className="form-control filterInput"
                placeholder="Enter expected rent"
                value={formData.expectedRent || ""}
                onChange={(e) =>
                  handleInputChange("expectedRent", e.target.value)
                }
              />
              <span className="input-group-text">₹/month</span>
            </div>
          </div>

          <div className="col mb-3">
            <label className="form-label">Maintenance</label>
            <Select
              instanceId="maintenance"
              options={[
                { value: "", label: "Select maintenance" },
                { value: "Monthly", label: "Monthly" },
                { value: "Quarterly", label: "Quarterly" },
                { value: "Yearly", label: "Yearly" },
              ]}
              styles={smallSelectStyles}
              className="select-custom filterSelect"
              classNamePrefix="select"
              value={{
                value: formData.maintenance || "",
                label: formData.maintenance || "Select maintenance",
              }}
              onChange={(e) => handleInputChange("maintenance", e.value)}
            />
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
          </div>

          <div className="col mb-3">
            <div className="form-check d-flex align-items-center gap-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="bookingAmount"
                checked={formData.bookingAmount || false}
                onChange={(e) =>
                  handleInputChange("bookingAmount", e.target.checked)
                }
              />
              <label className="form-check-label mb-0" htmlFor="bookingAmount">
                Booking amount
              </label>
            </div>
          </div>

          <div className="col mb-3">
            <div className="form-check d-flex align-items-center gap-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="membershipCharge"
                checked={formData.membershipCharge || false}
                onChange={(e) =>
                  handleInputChange("membershipCharge", e.target.checked)
                }
              />
              <label
                className="form-check-label mb-0"
                htmlFor="membershipCharge"
              >
                Membership charge
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentDetailsStep;
