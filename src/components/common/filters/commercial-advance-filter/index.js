"use client";
import {
  ageOfPropertyOptions,
  floorPreferenceOptions,
  furnishingStatusOptions,
  locationOptions,
  propertyTypeOptions,
  zoneTypeOptions,
} from "@/utilis/constants";
import Select from "react-select";
import Amenities from "./Amenities";
import Bathroom from "./Bathroom";
import Bedroom from "./Bedroom";
import Facilities from "./Facility";
import PriceRange from "./PriceRange";

const catOptions = propertyTypeOptions["lease"];

const customStyles = {
  option: (styles, { isFocused, isSelected, isHovered }) => {
    return {
      ...styles,
      backgroundColor: isSelected
        ? "#eb6753"
        : isHovered
        ? "#eb675312"
        : isFocused
        ? "#eb675312"
        : undefined,
    };
  },
};

const multiSelectCustomStyles = {
  ...customStyles,
  valueContainer: (base) => {
    return {
      ...base,
      flexWrap: "nowrap",
    };
  },
  multiValue: (base) => {
    return { ...base, minWidth: "60px" };
  },
};

const CommercialAdvanceFilterModal = ({ filterFunctions }) => {
  return (
    <div className="modal-dialog modal-dialog-centered modal-xl">
      <div className="modal-content">
        <div className="modal-header pl30 pr30">
          <h5 className="modal-title" id="exampleModalLabel">
            More Filter
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        {/* End modal-header */}

        <div className="modal-body pb-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper">
                <h6 className="list-title mb20">Lease range</h6>
                <div className="range-slider-style modal-version">
                  <PriceRange filterFunctions={filterFunctions} />
                </div>
              </div>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
            <div className="col">
              <div className="widget-wrapper">
                <h6 className="list-title">Type</h6>
                <div className="form-style2 input-group">
                  <Select
                    instanceId="property-type"
                    defaultValue={[catOptions[1]]}
                    name="catOptions"
                    options={catOptions}
                    styles={customStyles}
                    onChange={(e) =>
                      filterFunctions?.setPropertyTypes([e.value])
                    }
                    className="select-custom"
                    classNamePrefix="select"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col">
              <div className="widget-wrapper">
                <h6 className="list-title">Zone Type</h6>
                <div className="form-style2 input-group">
                  <Select
                    instanceId="zone-type"
                    defaultValue={[zoneTypeOptions[1]]}
                    name="zoneTypeOptions"
                    isMulti
                    options={zoneTypeOptions}
                    hideSelectedOptions={false}
                    closeMenuOnSelect={false}
                    styles={multiSelectCustomStyles}
                    className="select-custom"
                    classNamePrefix="select"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col">
              <div className="widget-wrapper">
                <h6 className="list-title">Area and Location</h6>
                <div className="form-style2 input-group">
                  <Select
                    instanceId="property-type"
                    defaultValue={[locationOptions[1]]}
                    name="locationOptions"
                    options={locationOptions}
                    styles={customStyles}
                    // onChange={(e) =>
                    //   filterFunctions?.setPropertyTypes([e.value])
                    // }
                    className="select-custom"
                    classNamePrefix="select"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col">
              <div className="widget-wrapper">
                <h6 className="list-title">Carpet area </h6>
                <div className="">
                  <div className="d-flex gap-3 align-items-center justify-content-between">
                    <div className="form-style">
                      <input
                        type="number"
                        className="form-control filterInput"
                        onChange={(e) =>
                          filterFunctions?.handlesquirefeet([
                            e.target.value,
                            document.getElementById("maxFeet3").value / 1,
                          ])
                        }
                        placeholder="Min."
                        id="minFeet3"
                      />
                    </div>
                    <span className="dark-color">-</span>
                    <div className="form-style">
                      <input
                        type="number"
                        className="form-control filterInput"
                        placeholder="Max"
                        id="maxFeet3"
                        onChange={(e) =>
                          filterFunctions?.handlesquirefeet([
                            document.getElementById("minFeet3").value / 1,
                            e.target.value,
                          ])
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="widget-wrapper">
                <h6 className="list-title">Age of property</h6>
                <div className="form-style2 input-group">
                  {/* // todo : Pending Data handle */}
                  <Select
                    instanceId="age-of-property-1"
                    defaultValue={[ageOfPropertyOptions[0]]}
                    name="ageOfPropertyOptions"
                    styles={customStyles}
                    options={ageOfPropertyOptions}
                    className="select-custom filterSelect"
                    value={{
                      value: filterFunctions?.location,
                      label: filterFunctions?.location,
                    }}
                    onChange={(e) => filterFunctions?.handlelocation(e.value)}
                    classNamePrefix="select"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col">
              <div className="widget-wrapper">
                <h6 className="list-title">Available from </h6>
                <div className="form-style2 input-group">
                  <input
                    type="date"
                    className="form-control filterInput"
                    onChange={(e) =>
                      console.log("Available from ", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="widget-wrapper">
                <h6 className="list-title">Floor Preference</h6>
                <div className="form-style2 input-group">
                  <Select
                    instanceId="zone-type"
                    defaultValue={[floorPreferenceOptions[1]]}
                    name="floorPreferenceOptions"
                    isMulti
                    options={floorPreferenceOptions}
                    hideSelectedOptions={false}
                    closeMenuOnSelect={false}
                    styles={multiSelectCustomStyles}
                    className="select-custom"
                    classNamePrefix="select"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col">
              <div className="widget-wrapper">
                <h6 className="list-title">Seat Count </h6>
                <div className="">
                  <div className="d-flex gap-3 align-items-center justify-content-between">
                    <div className="form-style">
                      <input
                        type="number"
                        className="form-control filterInput"
                        onChange={(e) =>
                          filterFunctions?.handlesquirefeet([
                            e.target.value,
                            document.getElementById("maxFeet3").value / 1,
                          ])
                        }
                        placeholder="Min."
                        id="minFeet3"
                      />
                    </div>
                    <span className="dark-color">-</span>
                    <div className="form-style">
                      <input
                        type="number"
                        className="form-control filterInput"
                        placeholder="Max"
                        id="maxFeet3"
                        onChange={(e) =>
                          filterFunctions?.handlesquirefeet([
                            document.getElementById("minFeet3").value / 1,
                            e.target.value,
                          ])
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="widget-wrapper">
                <h6 className="list-title">No. of Cabins</h6>
                <div className="form-style2">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Number of cabins (e.g. 3)"
                  />
                </div>
              </div>
            </div>

            <div className="col">
              <div className="widget-wrapper">
                <h6 className="list-title">No. of Washrooms</h6>
                <div className="form-style2">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Number of Washrooms (e.g. 3)"
                  />
                </div>
              </div>
            </div>

            <div className="col">
              <div className="widget-wrapper">
                <h6 className="list-title">Entrance Width</h6>
                <div className="form-style2">
                  <input
                    className="form-control"
                    placeholder="Enter entrance width (e.g. 4 ft)"
                  />
                </div>
              </div>
            </div>

            <div className="col">
              <div className="widget-wrapper">
                <h6 className="list-title">Clear Height</h6>
                <div className="form-style2">
                  <input
                    className="form-control"
                    placeholder="Enter clear height (e.g. 12 ft)"
                  />
                </div>
              </div>
            </div>

            <div className="col">
              <div className="widget-wrapper">
                <h6 className="list-title">Bedrooms</h6>
                <div className="d-flex">
                  <Bedroom filterFunctions={filterFunctions} />
                </div>
              </div>
            </div>

            <div className="col">
              <div className="widget-wrapper">
                <h6 className="list-title">Bathrooms</h6>
                <div className="d-flex">
                  <Bathroom filterFunctions={filterFunctions} />
                </div>
              </div>
            </div>

            <div className="col">
              <div className="widget-wrapper">
                <h6 className="list-title">Furnishing status</h6>
                <div className="form-style2 input-group">
                  {/* // todo : Pending Data handle */}
                  <Select
                    instanceId="furnishing-status"
                    defaultValue={[furnishingStatusOptions[0]]}
                    name="furnishingStatusOptions"
                    styles={customStyles}
                    options={furnishingStatusOptions}
                    className="select-custom filterSelect"
                    value={{
                      value: filterFunctions?.location,
                      label: filterFunctions?.location,
                    }}
                    onChange={(e) => filterFunctions?.handlelocation(e.value)}
                    classNamePrefix="select"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col">
              <div className="widget-wrapper">
                <h6 className="list-title">Parking</h6>
                <div className="form-style2 input-group">
                  {["Yes", "No"].map((option) => (
                    <div className="selection" key={`parking-${option}`}>
                      <input
                        id={`parking-${option}`}
                        type="radio"
                        name="parking"
                        value={option}
                      />
                      <label htmlFor={`parking-${option}`}>{option}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col">
              <div className="widget-wrapper">
                <h6 className="list-title">Safety Measures</h6>
                <div className="form-style2 input-group">
                  {["Yes", "No"].map((option) => (
                    <div className="selection" key={`safety-${option}`}>
                      <input
                        id={`safety-${option}`}
                        type="radio"
                        name="safetyMeasures"
                        value={option}
                      />
                      <label htmlFor={`safety-${option}`}>{option}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="widget-wrapper mb0">
              <h6 className="list-title mb10">Amenities</h6>
            </div>
            <Amenities filterFunctions={filterFunctions} />
          </div>
          <div>
            <div className="widget-wrapper mb0">
              <h6 className="list-title mb10">Facilities</h6>
            </div>
            <Facilities filterFunctions={filterFunctions} />
          </div>
        </div>
        {/* End modal body */}

        <div className="modal-footer justify-content-between">
          <button
            className="reset-button"
            onClick={() => filterFunctions?.resetFilter()}
          >
            <span className="flaticon-turn-back" />
            <u>Reset all filters</u>
          </button>
          <div className="btn-area">
            <button type="submit" className="ud-btn btn-thm">
              <span className="flaticon-search align-text-top pr10" />
              Search
            </button>
          </div>
        </div>
        {/* End modal-footer */}
      </div>
    </div>
  );
};

export default CommercialAdvanceFilterModal;
