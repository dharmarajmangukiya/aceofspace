"use client";
import Select from "react-select";

const Radius = () => {
  const radiusOptions = [
    { value: "1 km", label: "1 km" },
    { value: "5 km", label: "5 km" },
    { value: "10 km", label: "10 km" },
    { value: "20 km", label: "20 km" },
    { value: "50 km", label: "50 km" },
  ];

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

  return (
    <Select
      defaultValue={[radiusOptions[0]]}
      name="radius"
      instanceId={"radius"}
      options={radiusOptions}
      styles={customStyles}
      className="text-start select-borderless"
      classNamePrefix="select"
      required
      isClearable={false}
    />
  );
};

export default Radius;
