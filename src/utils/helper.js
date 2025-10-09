export const customSelectStyles = {
  option: (styles, { isFocused, isSelected, isHovered }) => {
    let backgroundColor;
    if (isSelected) {
      backgroundColor = "#eb6753";
    } else if (isHovered || isFocused) {
      backgroundColor = "#eb675312";
    }

    return {
      ...styles,
      backgroundColor,
    };
  },
  menu: (provided) => ({
    ...provided,
    zIndex: 4,
  }),
};

export const multiSelectCustomSelectStyles = {
  ...customSelectStyles,
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

// Utility function to create custom select styles with common modifications
export const createCustomSelectStyles = (overrides = {}) => {
  return {
    ...customSelectStyles,
    ...overrides,
  };
};

// small select styles
export const smallSelectStyles = createCustomSelectStyles({
  menuList: (provided) => ({
    ...provided,
    maxHeight: 120,
  }),
});

export const pickErrorMessage = (
  error,
  defaultMessage = "Something went wrong"
) => {
  return error?.message || error?.response?.data?.message || defaultMessage;
};
