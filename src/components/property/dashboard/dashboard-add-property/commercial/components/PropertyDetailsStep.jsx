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
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="mb-3">Area Details</h5>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Carpet area *</label>
          <div className="input-group">
            <input
              type="number"
              className="form-control filterInput"
              placeholder="Enter carpet area"
              value={formData.carpetArea || ""}
              onChange={(e) => handleInputChange("carpetArea", e.target.value)}
            />
            <select
              className="form-select filterSelect"
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

        <div className="col-md-4 mb-3">
          <label className="form-label">Super built-up area</label>
          <div className="input-group">
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
              className="form-select filterSelect"
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

        <div className="col-md-4 mb-3">
          <label className="form-label">Built Up Area</label>
          <div className="input-group">
            <input
              type="number"
              className="form-control filterInput"
              placeholder="Enter built-up area"
              value={formData.builtUpArea || ""}
              onChange={(e) => handleInputChange("builtUpArea", e.target.value)}
            />
            <select
              className="form-select filterSelect"
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

      {/* Office Setup */}
      {subType === "Office" && (
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
              onChange={(e) => handleInputChange("noOfCabins", e.target.value)}
            />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Max no of seats</label>
            <input
              type="number"
              className="form-control filterInput"
              placeholder="Enter max seats"
              value={formData.maxSeats || ""}
              onChange={(e) => handleInputChange("maxSeats", e.target.value)}
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
      )}

      {/* Washrooms */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="mb-3">Washrooms</h5>
        </div>
        <div className="col-md-4 mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="privateWashrooms"
              checked={formData.privateWashrooms || false}
              onChange={(e) =>
                handleInputChange("privateWashrooms", e.target.checked)
              }
            />
            <label className="form-check-label" htmlFor="privateWashrooms">
              Private washrooms (+/-)
            </label>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="sharedWashrooms"
              checked={formData.sharedWashrooms || false}
              onChange={(e) =>
                handleInputChange("sharedWashrooms", e.target.checked)
              }
            />
            <label className="form-check-label" htmlFor="sharedWashrooms">
              Shared washrooms (+/-)
            </label>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="washroomsNotAvailable"
              checked={formData.washroomsNotAvailable || false}
              onChange={(e) =>
                handleInputChange("washroomsNotAvailable", e.target.checked)
              }
            />
            <label className="form-check-label" htmlFor="washroomsNotAvailable">
              Not Available
            </label>
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
              onChange={(e) => handleInputChange("pantryArea", e.target.value)}
            />
          )}
        </div>
      </div>

      {/* Facilities */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="mb-3">Facilities</h5>
        </div>
        <div className="col-md-12 mb-3">
          <div className="row">
            {["Furnishing", "Central AC", "Oxygen duct", "UPS"].map(
              (facility) => (
                <div key={facility} className="col-md-3 mb-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`facility-${facility}`}
                      checked={formData.facilities?.includes(facility) || false}
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
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Fire safety measures */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="mb-3">Fire safety measures</h5>
        </div>
        <div className="col-md-12 mb-3">
          <div className="row">
            {[
              "Fire extinguisher",
              "Fire sensors",
              "Sprinklers",
              "Fire hose",
            ].map((safety) => (
              <div key={safety} className="col-md-3 mb-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`safety-${safety}`}
                    checked={formData.fireSafety?.includes(safety) || false}
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
            onChange={(e) => handleInputChange("totalFloors", e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">Your floor No</label>
          <select
            className="form-select filterSelect"
            value={formData.yourFloor || ""}
            onChange={(e) => handleInputChange("yourFloor", e.target.value)}
          >
            <option value="">Select floor</option>
            <option value="Basement">Basement</option>
            <option value="G">G</option>
            {Array.from({ length: 25 }, (_, i) => i + 1).map((floor) => (
              <option key={floor} value={floor}>
                {floor}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">No of staircases</label>
          <input
            type="text"
            className="form-control filterInput"
            placeholder="Enter number of staircases"
            value={formData.staircases || ""}
            onChange={(e) => handleInputChange("staircases", e.target.value)}
          />
        </div>
      </div>

      {/* Lifts */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="mb-3">Lifts</h5>
        </div>
        <div className="col-md-4 mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="passengerLift"
              checked={formData.passengerLift || false}
              onChange={(e) =>
                handleInputChange("passengerLift", e.target.checked)
              }
            />
            <label className="form-check-label" htmlFor="passengerLift">
              Passenger (+/-)
            </label>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="serviceLift"
              checked={formData.serviceLift || false}
              onChange={(e) =>
                handleInputChange("serviceLift", e.target.checked)
              }
            />
            <label className="form-check-label" htmlFor="serviceLift">
              Service (+/-)
            </label>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="liftsNotAvailable"
              checked={formData.liftsNotAvailable || false}
              onChange={(e) =>
                handleInputChange("liftsNotAvailable", e.target.checked)
              }
            />
            <label className="form-check-label" htmlFor="liftsNotAvailable">
              Not available
            </label>
          </div>
        </div>
      </div>

      {/* Parking */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="mb-3">Parking</h5>
        </div>
        <div className="col-md-3 mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="privateBasementParking"
              checked={formData.privateBasementParking || false}
              onChange={(e) =>
                handleInputChange("privateBasementParking", e.target.checked)
              }
            />
            <label
              className="form-check-label"
              htmlFor="privateBasementParking"
            >
              Private basement
            </label>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="privateOutsideParking"
              checked={formData.privateOutsideParking || false}
              onChange={(e) =>
                handleInputChange("privateOutsideParking", e.target.checked)
              }
            />
            <label className="form-check-label" htmlFor="privateOutsideParking">
              Private outside
            </label>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="generalParking"
              checked={formData.generalParking || false}
              onChange={(e) =>
                handleInputChange("generalParking", e.target.checked)
              }
            />
            <label className="form-check-label" htmlFor="generalParking">
              General parking
            </label>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="parkingNotAvailable"
              checked={formData.parkingNotAvailable || false}
              onChange={(e) =>
                handleInputChange("parkingNotAvailable", e.target.checked)
              }
            />
            <label className="form-check-label" htmlFor="parkingNotAvailable">
              Not available
            </label>
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
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <label className="form-label">Age of property</label>
          <select
            className="form-select filterSelect"
            value={formData.propertyAge || ""}
            onChange={(e) => handleInputChange("propertyAge", e.target.value)}
          >
            <option value="">Select age</option>
            <option value="0-1">0-1</option>
            <option value="1-5">1-5</option>
            <option value="5-10">5-10</option>
            <option value="10+">10+</option>
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Available from</label>
          <input
            type="date"
            className="form-control filterInput"
            value={formData.availableFrom || ""}
            onChange={(e) => handleInputChange("availableFrom", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsStep;
