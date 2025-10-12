"use client";
import { useEffect, useState } from "react";
import Select from "react-select";

const LookingFor = () => {
  const inqueryType = [
    { value: "Apartments", label: "Apartments" },
    { value: "Bungalow", label: "Bungalow" },
    { value: "Houses", label: "Houses" },
    { value: "Office", label: "Office" },
    { value: "TownHome", label: "TownHome" },
    { value: "Villa", label: "Villa" },
  ];
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      background: "none",
    }),
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
  if (!isClient) {
    return (
      <div className="text-start select-borderless">
        <div className="select__control">
          <div className="select__value-container">
            <div className="select__single-value">Apartments</div>
          </div>
          <div className="select__indicators">
            <span className="select__indicator-separator"></span>
            <div className="select__indicator select__dropdown-indicator">
              <span></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Select
      defaultValue={[inqueryType[0]]}
      name="colors"
      options={inqueryType}
      styles={customStyles}
      className="text-start select-borderless"
      classNamePrefix="select"
      required
      isClearable={false}
    />
  );
};

export default LookingFor;
