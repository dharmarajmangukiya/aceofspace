import { smallSelectStyles } from "@/utilis/helper";
import Select from "react-select";

const PropertyDetailsStep = ({ formData, onDataChange, subType }) => {
  const handleInputChange = (field, value) => {
    onDataChange({ [field]: value });
  };

  const handleCheckboxChange = (field, value, checked) => {
    const currentValues = formData[field] || [];
    const updatedValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);
    handleInputChange(field, updatedValues);
  };

  return (
    <div className="property-details-step">
      <h4 className="title fz17 mb30">Property Details</h4>

      {/* Area Details */}
      <div className="row row-cols-1 row-cols-md-2 mb-4">
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
          <label className="form-label">Super built-up area</label>
          <div className="input-group responsive-input-group">
            <input
              type="number"
              className="form-control filterInput"
              placeholder="Enter super built-up area"
              value={formData.superBuiltUpArea || ""}
              onChange={(e) =>
                handleInputChange("superBuiltUpArea", e.target.value)
              }
            />
            <select
              className="form-select"
              value={formData.superBuiltUpAreaUnit || "sq ft"}
              onChange={(e) =>
                handleInputChange("superBuiltUpAreaUnit", e.target.value)
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
      </div>

      {/* Shop Facet Size */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="mb-3">Shop Facet Size</h5>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Entrance Width</label>
          <input
            type="text"
            className="form-control filterInput"
            placeholder="Enter entrance width"
            value={formData.entranceWidth || ""}
            onChange={(e) => handleInputChange("entranceWidth", e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">Clear/Ceiling Height</label>
          <input
            type="text"
            className="form-control filterInput"
            placeholder="Enter clear height"
            value={formData.clearHeight || ""}
            onChange={(e) => handleInputChange("clearHeight", e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">Flooring</label>
          <div className="form-style2 input-group">
            {["Yes", "No"].map((option) => (
              <div className="selection" key={`flooring-${option}`}>
                <input
                  id={`flooring-${option}`}
                  type="radio"
                  name="flooring"
                  value={option}
                  checked={formData.flooring === option}
                  onChange={(e) =>
                    handleInputChange("flooring", e.target.value)
                  }
                />
                <label htmlFor={`flooring-${option}`}>{option}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {(() => {
        if (subType === "Showroom") {
          return (
            <div className="row mb-4">
              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold mb-2">
                  Located Near
                </label>
                <Select
                  isMulti
                  options={[
                    { value: "Entrance", label: "Entrance" },
                    { value: "Elevator", label: "Elevator" },
                    { value: "Stairs", label: "Stairs" },
                  ]}
                  styles={smallSelectStyles}
                  className="select-custom filterSelect"
                  classNamePrefix="select"
                  placeholder="Select nearby features"
                  value={(formData.locatedNear || []).map((v) => ({
                    value: v,
                    label: v,
                  }))}
                  onChange={(selected) =>
                    handleInputChange(
                      "locatedNear",
                      selected ? selected.map((opt) => opt.value) : []
                    )
                  }
                />
              </div>
            </div>
          );
        } else {
          return (
            <>
              {/* Office Setup */}
              <div className="row mb-4">
                <div className="col-12">
                  <h5 className="mb-3">Office Setup</h5>
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">No of Cabins</label>
                  <input
                    type="number"
                    className="form-control filterInput"
                    placeholder="Enter number of cabins"
                    value={formData.noOfCabins || ""}
                    onChange={(e) =>
                      handleInputChange("noOfCabins", e.target.value)
                    }
                  />
                </div>

                <div className="col-md-3 mb-3">
                  <label className="form-label">Max no of seats</label>
                  <input
                    type="number"
                    className="form-control filterInput"
                    placeholder="Enter max seats"
                    value={formData.maxSeats || ""}
                    onChange={(e) =>
                      handleInputChange("maxSeats", e.target.value)
                    }
                  />
                </div>

                <div className="col-md-3 mb-3">
                  <label className="form-label">No of meeting rooms</label>
                  <input
                    type="number"
                    className="form-control filterInput"
                    placeholder="Enter meeting rooms"
                    value={formData.meetingRooms || ""}
                    onChange={(e) =>
                      handleInputChange("meetingRooms", e.target.value)
                    }
                  />
                </div>

                <div className="col-md-3 mb-3">
                  <label className="form-label">No of conference rooms</label>
                  <input
                    type="number"
                    className="form-control filterInput"
                    placeholder="Enter conference rooms"
                    value={formData.conferenceRooms || ""}
                    onChange={(e) =>
                      handleInputChange("conferenceRooms", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Washrooms */}
              <div className="row row-cols-1 row-cols-md-2 mb-4">
                <div className="col mb-3">
                  <label className="form-label">Washrooms</label>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label small">
                        Private washrooms
                      </label>
                      <div className="input-group">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            const currentValue = parseInt(
                              formData.privateWashroomsCount || 0
                            );
                            if (currentValue > 0) {
                              handleInputChange(
                                "privateWashroomsCount",
                                currentValue - 1
                              );
                            }
                          }}
                          disabled={
                            parseInt(formData.privateWashroomsCount || 0) <= 0
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="form-control text-center no-spinner"
                          value={formData.privateWashroomsCount || 0}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 0;
                            handleInputChange(
                              "privateWashroomsCount",
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
                              formData.privateWashroomsCount || 0
                            );
                            handleInputChange(
                              "privateWashroomsCount",
                              currentValue + 1
                            );
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-6">
                      <label className="form-label small">
                        Shared washrooms
                      </label>
                      <div className="input-group">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            const currentValue = parseInt(
                              formData.sharedWashroomsCount || 0
                            );
                            if (currentValue > 0) {
                              handleInputChange(
                                "sharedWashroomsCount",
                                currentValue - 1
                              );
                            }
                          }}
                          disabled={
                            parseInt(formData.sharedWashroomsCount || 0) <= 0
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="form-control text-center no-spinner"
                          value={formData.sharedWashroomsCount || 0}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 0;
                            handleInputChange(
                              "sharedWashroomsCount",
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
                              formData.sharedWashroomsCount || 0
                            );
                            handleInputChange(
                              "sharedWashroomsCount",
                              currentValue + 1
                            );
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reception area */}
              <div className="row mb-4">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Reception area</label>
                  <div className="form-style2 input-group">
                    {["Available", "Not Available"].map((option) => (
                      <div className="selection" key={`reception-${option}`}>
                        <input
                          id={`reception-${option}`}
                          type="radio"
                          name="receptionArea"
                          value={option}
                          checked={formData.receptionArea === option}
                          onChange={(e) =>
                            handleInputChange("receptionArea", e.target.value)
                          }
                        />
                        <label htmlFor={`reception-${option}`}>{option}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Pantry type</label>
                  <div className="form-style2 input-group">
                    {["Private", "Shared", "Not Available"].map((option) => (
                      <div className="selection" key={`pantry-${option}`}>
                        <input
                          id={`pantry-${option}`}
                          type="radio"
                          name="pantryType"
                          value={option}
                          checked={formData.pantryType === option}
                          onChange={(e) =>
                            handleInputChange("pantryType", e.target.value)
                          }
                        />
                        <label htmlFor={`pantry-${option}`}>{option}</label>
                      </div>
                    ))}
                  </div>
                  {formData.pantryType === "Private" && (
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="Enter area in sqft"
                      value={formData.pantryArea || ""}
                      onChange={(e) =>
                        handleInputChange("pantryArea", e.target.value)
                      }
                    />
                  )}
                </div>
              </div>
              {/* Facilities */}
              <div className="row row-cols-1 row-cols-md-2 mb-4">
                <div className="col mb-3">
                  <h5 className="mb-3">Facilities</h5>
                  <div className="d-flex flex-wrap gap-3">
                    {["Furnishing", "Central AC", "Oxygen duct", "UPS"].map(
                      (facility) => (
                        <div
                          key={facility}
                          className="form-check d-flex align-items-center gap-2"
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`facility-${facility}`}
                            checked={
                              formData.facilities?.includes(facility) || false
                            }
                            onChange={(e) =>
                              handleCheckboxChange(
                                "facilities",
                                facility,
                                e.target.checked
                              )
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`facility-${facility}`}
                          >
                            {facility}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="col mb-3">
                  <h5 className="mb-3">Fire safety measures</h5>
                  <div className="d-flex flex-wrap gap-3">
                    {[
                      "Fire extinguisher",
                      "Fire sensors",
                      "Sprinklers",
                      "Fire hose",
                    ].map((safety) => (
                      <div
                        key={safety}
                        className="form-check d-flex align-items-center gap-2"
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`safety-${safety}`}
                          checked={
                            formData.fireSafety?.includes(safety) || false
                          }
                          onChange={(e) =>
                            handleCheckboxChange(
                              "fireSafety",
                              safety,
                              e.target.checked
                            )
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`safety-${safety}`}
                        >
                          {safety}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floor Details */}
              <div className="row mb-4">
                <div className="col-12">
                  <h5 className="mb-3">Floor Details</h5>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Total floors</label>
                  <input
                    type="text"
                    className="form-control filterInput"
                    placeholder="Enter total floors"
                    value={formData.totalFloors || ""}
                    onChange={(e) =>
                      handleInputChange("totalFloors", e.target.value)
                    }
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Your floor No</label>
                  <Select
                    instanceId="yourFloor"
                    options={[
                      { value: "Basement", label: "Basement" },
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
                      value: formData.yourFloor || "",
                      label: formData.yourFloor || "Select floor",
                    }}
                    onChange={(e) => handleInputChange("yourFloor", e.value)}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">No of staircases</label>
                  <input
                    type="text"
                    className="form-control filterInput"
                    placeholder="Enter number of staircases"
                    value={formData.staircases || ""}
                    onChange={(e) =>
                      handleInputChange("staircases", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Lifts */}
              <div className="row row-cols-1 row-cols-md-2 mb-4">
                <div className="col mb-3">
                  <h5 className="mb-3">Lifts</h5>
                  <div className="form-style2 input-group mb-3">
                    {["Available", "Not Available"].map((option) => (
                      <div className="selection" key={`lifts-${option}`}>
                        <input
                          id={`lifts-${option}`}
                          type="radio"
                          name="liftsAvailable"
                          value={option}
                          checked={formData.liftsAvailable === option}
                          onChange={(e) =>
                            handleInputChange("liftsAvailable", e.target.value)
                          }
                        />
                        <label htmlFor={`lifts-${option}`}>{option}</label>
                      </div>
                    ))}
                  </div>

                  {formData.liftsAvailable === "Available" && (
                    <div className="row">
                      <div className="col-6">
                        <label className="form-label small">
                          Passenger lifts
                        </label>
                        <div className="input-group">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              const currentValue = parseInt(
                                formData.passengerLiftCount || 0
                              );
                              if (currentValue > 0) {
                                handleInputChange(
                                  "passengerLiftCount",
                                  currentValue - 1
                                );
                              }
                            }}
                            disabled={
                              parseInt(formData.passengerLiftCount || 0) <= 0
                            }
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="form-control text-center no-spinner"
                            value={formData.passengerLiftCount || 0}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0;
                              handleInputChange(
                                "passengerLiftCount",
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
                                formData.passengerLiftCount || 0
                              );
                              handleInputChange(
                                "passengerLiftCount",
                                currentValue + 1
                              );
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-6">
                        <label className="form-label small">
                          Service lifts
                        </label>
                        <div className="input-group">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              const currentValue = parseInt(
                                formData.serviceLiftCount || 0
                              );
                              if (currentValue > 0) {
                                handleInputChange(
                                  "serviceLiftCount",
                                  currentValue - 1
                                );
                              }
                            }}
                            disabled={
                              parseInt(formData.serviceLiftCount || 0) <= 0
                            }
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="form-control text-center no-spinner"
                            value={formData.serviceLiftCount || 0}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0;
                              handleInputChange(
                                "serviceLiftCount",
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
                                formData.serviceLiftCount || 0
                              );
                              handleInputChange(
                                "serviceLiftCount",
                                currentValue + 1
                              );
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          );
        }
      })()}

      {/* Parking */}
      <div className="row row-cols-1 row-cols-md-2 mb-4">
        <div className=" mb-3">
          <h5 className="mb-3">Parking</h5>
          <div className="d-flex flex-wrap gap-3">
            {[
              { key: "privateBasementParking", label: "Private basement" },
              { key: "privateOutsideParking", label: "Private outside" },
              { key: "generalParking", label: "General parking" },
              { key: "parkingNotAvailable", label: "Not available" },
            ].map((option) => (
              <div
                key={option.key}
                className="form-check d-flex align-items-center gap-2"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={option.key}
                  checked={formData[option.key] || false}
                  onChange={(e) =>
                    handleInputChange(option.key, e.target.checked)
                  }
                />
                <label className="form-check-label" htmlFor={option.key}>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {(formData.privateBasementParking ||
          formData.privateOutsideParking ||
          formData.generalParking) && (
          <div className="col-md-6 mb-3">
            <label className="form-label">No of spaces</label>
            <input
              type="number"
              className="form-control filterInput"
              placeholder="Enter number of parking spaces"
              value={formData.parkingSpaces || ""}
              onChange={(e) =>
                handleInputChange("parkingSpaces", e.target.value)
              }
            />
          </div>
        )}
      </div>

      {/* Age and Availability */}
      <div className="row row-cols-1 row-cols-md-2 mb-4">
        <div className="col mb-3">
          <label className="form-label">Age of property</label>
          <Select
            instanceId="propertyAge"
            options={[
              { value: "", label: "Select age" },
              { value: "0-1", label: "0-1" },
              { value: "1-5", label: "1-5" },
              { value: "5-10", label: "5-10" },
              { value: "10+", label: "10+" },
            ]}
            menuPlacement="top"
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
      </div>

      {/* Suitable for Business Types */}
      {subType === "Showroom" && (
        <div className="row">
          <div className="col-12 mb-3">
            <label className="form-label fw-semibold mb-2">
              Suitable for Business Types
            </label>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5">
              {[
                "ATM",
                "Bakery",
                "Boutique",
                "Clinic",
                "Cloths",
                "Cloud kitchen",
                "Coffee",
                "Dental Clinic",
                "Fast food",
                "Foot wear",
                "Grocery",
                "Gym",
                "Jewelry",
                "Juice",
                "Meat",
                "Medical",
                "Mobile",
                "Pub/Bar",
                "Restaurants",
                "Salon or Spa",
                "Stationary",
                "Suite",
                "Tea stall",
                "Others",
              ].map((businessType, index) => (
                <div key={index} className="col mb-2">
                  <div className="form-check d-flex align-items-center gap-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`businessType-${businessType
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      checked={(formData.suitableBusinessTypes || []).includes(
                        businessType
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "suitableBusinessTypes",
                          businessType,
                          e.target.checked
                        )
                      }
                    />
                    <label
                      className="form-check-label small"
                      htmlFor={`businessType-${businessType
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {businessType}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailsStep;
