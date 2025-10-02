"use client";
import { useState } from "react";

const Bathroom = ({ filterFunctions, formik, fieldName }) => {
  const [bathrooms, setBathrooms] = useState(formik?.values?.[fieldName] || 0);
  const bathOptions = [
    { id: "yany", label: "any", value: 0 },
    { id: "yoneplus", label: "1+", value: 1 },
    { id: "ytwoplus", label: "2+", value: 2 },
    { id: "ythreeplus", label: "3+", value: 3 },
    { id: "yfourplus", label: "4+", value: 4 },
    { id: "yfiveplus", label: "5+", value: 5 },
  ];

  const handleChange = (value) => {
    setBathrooms(value);
    formik?.setFieldValue(fieldName, value);
    filterFunctions?.handlebathroms?.(value);
  };

  return (
    <>
      {bathOptions.map((option, index) => (
        <div className="selection" key={option.id}>
          <input
            id={option.id}
            type="radio"
            checked={bathrooms == option.value}
            onChange={() => handleChange(option.value)}
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      ))}
    </>
  );
};

export default Bathroom;
