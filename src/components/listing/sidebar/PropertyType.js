"use client";

import { propertyTypeOptions } from "@/utils/constants";

const PropertyType = ({ filterFunctions, rentOrLease = "residential" }) => {
  return (
    <>
      {/* <label className="custom_checkbox">
        All
        <input
          type="checkbox"
          checked={!filterFunctions?.propertyTypes.length}
          onChange={(e) => {
            filterFunctions?.setPropertyTypes([]);
          }}
        />
        <span className="checkmark" />
      </label> */}
      {(propertyTypeOptions[rentOrLease] ?? []).map((option, index) => (
        <label className="custom_checkbox" key={index}>
          {option.label}
          <input
            type="checkbox"
            checked={filterFunctions?.propertyTypes.includes(option.label)}
            onChange={(e) => {
              filterFunctions.handlepropertyTypes(option.label);
            }}
          />
          <span className="checkmark" />
        </label>
      ))}
    </>
  );
};

export default PropertyType;
