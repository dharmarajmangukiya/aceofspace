"use client";
import Slider from "rc-slider";
import { useState, useEffect } from "react";

const PriceRange = ({ filterFunctions, formik, fieldName }) => {
  const [price, setPrice] = useState(formik?.values?.[fieldName] || [0, 100000]);

  useEffect(() => {
    if (formik?.values?.[fieldName]) {
      setPrice(formik.values[fieldName]);
    }
  }, [formik?.values, fieldName]);

  // price range handler
  const handleOnChange = (value) => {
    setPrice(value);
    formik?.setFieldValue(fieldName, value);
    filterFunctions?.handlepriceRange(value);
  };

  return (
    <>
      <div className="range-wrapper">
        <Slider
          range
          max={100000}
          min={0}
          value={price}
          onChange={(value) => handleOnChange(value)}
          id="slider"
        />
        <div className="d-flex align-items-center">
          <span id="slider-range-value1">₹{price[0]}</span>
          <i className="fa-sharp fa-solid fa-minus mx-2 dark-color icon" />
          <span id="slider-range-value2">₹{price[1]}</span>
        </div>
      </div>
    </>
  );
};

export default PriceRange;
