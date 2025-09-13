import { smallSelectStyles } from "@/utilis/helper";
import Select from "react-select";

const RoomDetailsStep = ({ formData, onDataChange, subType }) => {
  const handleInputChange = (field, value) => {
    onDataChange({ [field]: value });
  };

  const handleDropdownChange = (field, value) => {
    onDataChange({ [field]: value, [`${field}Other`]: "" });
  };

  return (
    <div className="room-details-step">
      <h4 className="title fz17 mb30">Room Details</h4>

      <div className="row row-cols-1 row-cols-xl-4 row-cols-md-2">
        <div className="col mb-3">
          <label className="form-label">No of bedrooms *</label>
          <div className="form-style2 input-group">
            <Select
              instanceId="bedrooms"
              options={[
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
                { value: "Others", label: "Others" },
              ]}
              styles={smallSelectStyles}
              className="select-custom filterSelect"
              classNamePrefix="select"
              value={{
                value: formData.bedrooms || "",
                label: formData.bedrooms || "Select bedrooms",
              }}
              onChange={(e) => handleDropdownChange("bedrooms", e.value)}
              placeholder="Select bedrooms"
            />
          </div>

          {formData.bedrooms === "Others" && (
            <input
              type="text"
              className="form-control filterInput mt-2"
              placeholder="Enter number of bedrooms"
              value={formData.bedroomsOther || ""}
              onChange={(e) =>
                handleInputChange("bedroomsOther", e.target.value)
              }
            />
          )}
        </div>

        <div className="col mb-3">
          <label className="form-label">No of bathrooms *</label>
          <div className="form-style2 input-group">
            <Select
              instanceId="bathrooms"
              options={[
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
                { value: "Others", label: "Others" },
              ]}
              styles={smallSelectStyles}
              className="select-custom filterSelect"
              classNamePrefix="select"
              value={{
                value: formData.bathrooms || "",
                label: formData.bathrooms || "Select bathrooms",
              }}
              onChange={(e) => handleDropdownChange("bathrooms", e.value)}
              placeholder="Select bathrooms"
            />
          </div>
          {formData.bathrooms === "Others" && (
            <input
              type="text"
              className="form-control filterInput mt-2"
              placeholder="Enter number of bathrooms"
              value={formData.bathroomsOther || ""}
              onChange={(e) =>
                handleInputChange("bathroomsOther", e.target.value)
              }
            />
          )}
        </div>

        <div className="col mb-3">
          <label className="form-label">Balconies</label>
          <div className="form-style2 input-group">
            <Select
              instanceId="balconies"
              options={[
                { value: "0", label: "0" },
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "More than 3", label: "More than 3" },
              ]}
              styles={smallSelectStyles}
              className="select-custom filterSelect"
              classNamePrefix="select"
              value={{
                value: formData.balconies || "",
                label: formData.balconies || "Select balconies",
              }}
              onChange={(e) => handleInputChange("balconies", e.value)}
              placeholder="Select balconies"
            />
          </div>
        </div>

        <div className="col mb-3">
          <label className="form-label">No of living rooms *</label>
          <div className="form-style2 input-group">
            <Select
              instanceId="livingRooms"
              options={[
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
                { value: "Others", label: "Others" },
              ]}
              styles={smallSelectStyles}
              className="select-custom filterSelect"
              classNamePrefix="select"
              value={{
                value: formData.livingRooms || "",
                label: formData.livingRooms || "Select living rooms",
              }}
              onChange={(e) => handleDropdownChange("livingRooms", e.value)}
              placeholder="Select living rooms"
            />
          </div>
          {formData.livingRooms === "Others" && (
            <input
              type="text"
              className="form-control filterInput mt-2"
              placeholder="Enter number of living rooms"
              value={formData.livingRoomsOther || ""}
              onChange={(e) =>
                handleInputChange("livingRoomsOther", e.target.value)
              }
            />
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-12 mb-3">
          <label className="form-label">Other rooms</label>
          <div className="row row-cols-1 row-cols-xl-4 row-cols-md-2">
            {[
              "Puja room",
              "Study/Co-working room",
              "Servant room",
              "Store room",
            ].map((room) => (
              <div key={room} className="col mb-2">
                <div className="form-check d-flex align-items-center gap-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`room-${room}`}
                    checked={formData.otherRooms?.includes(room) || false}
                    onChange={(e) => {
                      const currentRooms = formData.otherRooms || [];
                      const updatedRooms = e.target.checked
                        ? [...currentRooms, room]
                        : currentRooms.filter((r) => r !== room);
                      handleInputChange("otherRooms", updatedRooms);
                    }}
                  />
                  <label className="form-check-label" htmlFor={`room-${room}`}>
                    {room}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsStep;
