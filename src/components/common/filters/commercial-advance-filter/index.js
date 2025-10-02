"use client";
import {
  ageOfPropertyOptions,
  floorPreferenceOptions,
  furnishingStatusOptions,
  locationOptions,
  propertyTypeOptions,
  zoneTypeOptions,
} from "@/utilis/constants";
import {
  customSelectStyles,
  multiSelectCustomSelectStyles,
} from "@/utilis/helper";
import { useFormik } from "formik";
import Select from "react-select";
import Amenities from "./Amenities";
import Bathroom from "./Bathroom";
import Bedroom from "./Bedroom";
import Facilities from "./Facility";
import PriceRange from "./PriceRange";

const catOptions = propertyTypeOptions["lease"];

const CommercialAdvanceFilterModal = ({ filterFunctions, onFormSubmit }) => {
  const formik = useFormik({
    initialValues: {
      priceRange: [0, 100000],
      propertyType: catOptions[1],
      zoneType: [],
      location: locationOptions[1],
      carpetAreaMin: "",
      carpetAreaMax: "",
      ageOfProperty: ageOfPropertyOptions[0],
      availableFrom: "",
      floorPreference: [],
      seatCountMin: "",
      seatCountMax: "",
      cabins: "",
      washrooms: "",
      entranceWidth: "",
      clearHeight: "",
      bedrooms: 0,
      bathrooms: 0,
      furnishingStatus: furnishingStatusOptions[0],
      parking: "",
      safetyMeasures: "",
      amenities: [],
      facilities: [],
    },
    onSubmit: (values) => {
      console.log("Commercial Filter Values:", values);
      // Call the form submission handler
      onFormSubmit?.(values);
    },
  });

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

        <form onSubmit={formik.handleSubmit}>
          <div className="modal-body pb-0">
            <div className="row">
              <div className="col-lg-12">
                <div className="widget-wrapper">
                  <h6 className="list-title mb20">Lease range</h6>
                  <div className="range-slider-style modal-version">
                    <PriceRange
                      filterFunctions={filterFunctions}
                      formik={formik}
                      fieldName="priceRange"
                    />
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
                      name="propertyType"
                      options={catOptions}
                      styles={customSelectStyles}
                      value={formik.values.propertyType}
                      onChange={(option) => {
                        formik.setFieldValue("propertyType", option);
                        filterFunctions?.setPropertyTypes([option.value]);
                      }}
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
                      name="zoneType"
                      isMulti
                      options={zoneTypeOptions}
                      hideSelectedOptions={false}
                      closeMenuOnSelect={false}
                      styles={multiSelectCustomSelectStyles}
                      value={formik.values.zoneType}
                      onChange={(options) => {
                        formik.setFieldValue("zoneType", options || []);
                      }}
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
                      instanceId="location-select"
                      name="location"
                      options={locationOptions}
                      styles={customSelectStyles}
                      value={formik.values.location}
                      onChange={(option) => {
                        formik.setFieldValue("location", option);
                        filterFunctions?.handlelocation(option.value);
                      }}
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
                          name="carpetAreaMin"
                          value={formik.values.carpetAreaMin}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "carpetAreaMin",
                              e.target.value
                            );
                            filterFunctions?.handlesquirefeet([
                              e.target.value,
                              formik.values.carpetAreaMax,
                            ]);
                          }}
                          placeholder="Min."
                          id="minFeet3"
                        />
                      </div>
                      <span className="dark-color">-</span>
                      <div className="form-style">
                        <input
                          type="number"
                          className="form-control filterInput"
                          name="carpetAreaMax"
                          value={formik.values.carpetAreaMax}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "carpetAreaMax",
                              e.target.value
                            );
                            filterFunctions?.handlesquirefeet([
                              formik.values.carpetAreaMin,
                              e.target.value,
                            ]);
                          }}
                          placeholder="Max"
                          id="maxFeet3"
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
                    <Select
                      instanceId="age-of-property-1"
                      name="ageOfProperty"
                      styles={customSelectStyles}
                      options={ageOfPropertyOptions}
                      className="select-custom filterSelect"
                      value={formik.values.ageOfProperty}
                      onChange={(option) => {
                        formik.setFieldValue("ageOfProperty", option);
                      }}
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
                      name="availableFrom"
                      value={formik.values.availableFrom}
                      onChange={(e) => {
                        formik.setFieldValue("availableFrom", e.target.value);
                        console.log("Available from ", e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="widget-wrapper">
                  <h6 className="list-title">Floor Preference</h6>
                  <div className="form-style2 input-group">
                    <Select
                      instanceId="floor-preference"
                      name="floorPreference"
                      isMulti
                      options={floorPreferenceOptions}
                      hideSelectedOptions={false}
                      closeMenuOnSelect={false}
                      styles={multiSelectCustomSelectStyles}
                      value={formik.values.floorPreference}
                      onChange={(options) => {
                        formik.setFieldValue("floorPreference", options || []);
                      }}
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
                          name="seatCountMin"
                          value={formik.values.seatCountMin}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "seatCountMin",
                              e.target.value
                            );
                          }}
                          placeholder="Min."
                          id="minSeatCount"
                        />
                      </div>
                      <span className="dark-color">-</span>
                      <div className="form-style">
                        <input
                          type="number"
                          className="form-control filterInput"
                          name="seatCountMax"
                          value={formik.values.seatCountMax}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "seatCountMax",
                              e.target.value
                            );
                          }}
                          placeholder="Max"
                          id="maxSeatCount"
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
                      name="cabins"
                      value={formik.values.cabins}
                      onChange={(e) => {
                        formik.setFieldValue("cabins", e.target.value);
                      }}
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
                      name="washrooms"
                      value={formik.values.washrooms}
                      onChange={(e) => {
                        formik.setFieldValue("washrooms", e.target.value);
                      }}
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
                      name="entranceWidth"
                      value={formik.values.entranceWidth}
                      onChange={(e) => {
                        formik.setFieldValue("entranceWidth", e.target.value);
                      }}
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
                      name="clearHeight"
                      value={formik.values.clearHeight}
                      onChange={(e) => {
                        formik.setFieldValue("clearHeight", e.target.value);
                      }}
                      placeholder="Enter clear height (e.g. 12 ft)"
                    />
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="widget-wrapper">
                  <h6 className="list-title">Bedrooms</h6>
                  <div className="d-flex">
                    <Bedroom
                      filterFunctions={filterFunctions}
                      formik={formik}
                      fieldName="bedrooms"
                    />
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="widget-wrapper">
                  <h6 className="list-title">Bathrooms</h6>
                  <div className="d-flex">
                    <Bathroom
                      filterFunctions={filterFunctions}
                      formik={formik}
                      fieldName="bathrooms"
                    />
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="widget-wrapper">
                  <h6 className="list-title">Furnishing status</h6>
                  <div className="form-style2 input-group">
                    <Select
                      instanceId="furnishing-status"
                      name="furnishingStatus"
                      styles={customSelectStyles}
                      options={furnishingStatusOptions}
                      className="select-custom filterSelect"
                      value={formik.values.furnishingStatus}
                      onChange={(option) => {
                        formik.setFieldValue("furnishingStatus", option);
                      }}
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
                          checked={formik.values.parking === option}
                          onChange={(e) => {
                            formik.setFieldValue("parking", e.target.value);
                          }}
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
                          checked={formik.values.safetyMeasures === option}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "safetyMeasures",
                              e.target.value
                            );
                          }}
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
              <Amenities
                filterFunctions={filterFunctions}
                formik={formik}
                fieldName="amenities"
              />
            </div>
            <div>
              <div className="widget-wrapper mb0">
                <h6 className="list-title mb10">Facilities</h6>
              </div>
              <Facilities
                filterFunctions={filterFunctions}
                formik={formik}
                fieldName="facilities"
              />
            </div>
          </div>
          {/* End modal body */}

          <div className="modal-footer justify-content-between">
            <button
              type="button"
              className="reset-button"
              onClick={() => {
                formik.resetForm();
                filterFunctions?.resetFilter();
              }}
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
        </form>
      </div>
    </div>
  );
};

export default CommercialAdvanceFilterModal;
