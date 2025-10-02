"use client";
import {
  ageOfPropertyOptions,
  availableForOptions,
  furnishingStatusOptions,
  locationOptions,
  propertyTypeOptions,
} from "@/utilis/constants";
import { useFormik } from "formik";
import Select from "react-select";
import Amenities from "./Amenities";
import Bathroom from "./Bathroom";
import Bedroom from "./Bedroom";
import PriceRange from "./PriceRange";

const catOptions = propertyTypeOptions["rent"];

const RentalAdvanceFilterModal = ({ filterFunctions, onFormSubmit }) => {
  const formik = useFormik({
    initialValues: {
      priceRange: [0, 100000],
      propertyType: catOptions[1],
      location: locationOptions[1],
      availableFrom: "",
      bedrooms: 0,
      bathrooms: 0,
      squareFeetMin: "",
      squareFeetMax: "",
      furnishingStatus: furnishingStatusOptions[0],
      ageOfProperty: ageOfPropertyOptions[0],
      gatedCommunities: "",
      availableFor: availableForOptions[0],
      amenities: [],
    },
    onSubmit: (values) => {
      console.log("Rental Filter Values:", values);
      // Call the form submission handler
      onFormSubmit?.(values);
    },
  });

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
                  <h6 className="list-title mb20">Rent range</h6>
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
                      styles={customStyles}
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
                  <h6 className="list-title">Area and Location</h6>
                  <div className="form-style2 input-group">
                    <Select
                      instanceId="location-select"
                      name="location"
                      options={locationOptions}
                      styles={customStyles}
                      value={formik.values.location}
                      onChange={(option) => {
                        formik.setFieldValue("location", option);
                        filterFunctions?.handlelocation?.(option.value);
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
                  <h6 className="list-title">Square Feet</h6>
                  <div className="">
                    <div className="d-flex gap-3 align-items-center justify-content-between">
                      <div className="form-style">
                        <input
                          type="number"
                          className="form-control filterInput"
                          name="squareFeetMin"
                          value={formik.values.squareFeetMin}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "squareFeetMin",
                              e.target.value
                            );
                            filterFunctions?.handlesquirefeet([
                              e.target.value,
                              formik.values.squareFeetMax,
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
                          name="squareFeetMax"
                          value={formik.values.squareFeetMax}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "squareFeetMax",
                              e.target.value
                            );
                            filterFunctions?.handlesquirefeet([
                              formik.values.squareFeetMin,
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
                  <h6 className="list-title">Furnishing status</h6>
                  <div className="form-style2 input-group">
                    <Select
                      instanceId="furnishing-status"
                      name="furnishingStatus"
                      styles={customStyles}
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
                  <h6 className="list-title">Age of property</h6>
                  <div className="form-style2 input-group">
                    <Select
                      instanceId="age-of-property-1"
                      name="ageOfProperty"
                      styles={customStyles}
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
                  <h6 className="list-title">Gated communities</h6>
                  <div className="form-style2 input-group">
                    {["Yes", "No"].map((option) => (
                      <div className="selection" key={option}>
                        <input
                          id={option}
                          type="radio"
                          name="gatedCommunities"
                          value={option}
                          checked={formik.values.gatedCommunities === option}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "gatedCommunities",
                              e.target.value
                            );
                          }}
                        />
                        <label htmlFor={option}>{option}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="widget-wrapper">
                  <h6 className="list-title">Available for</h6>
                  <div className="form-style2 input-group">
                    <Select
                      instanceId="available-for"
                      name="availableFor"
                      styles={customStyles}
                      options={availableForOptions}
                      className="select-custom filterSelect"
                      value={formik.values.availableFor}
                      onChange={(option) => {
                        formik.setFieldValue("availableFor", option);
                      }}
                      classNamePrefix="select"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="widget-wrapper mb0">
                  <h6 className="list-title mb10">Amenities</h6>
                </div>
              </div>
              <Amenities
                filterFunctions={filterFunctions}
                formik={formik}
                fieldName="amenities"
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

export default RentalAdvanceFilterModal;
