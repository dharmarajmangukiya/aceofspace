"use client";
import { usePlacesAutocomplete } from "@/hooks/usePlacesAutocomplete";
import { GOOGLE_MAPS_API_KEY } from "@/utils/config";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import Select from "react-select";

const API_KEY = GOOGLE_MAPS_API_KEY;

const Location = ({ onLocationSelect }) => {
  return (
    <APIProvider apiKey={API_KEY}>
      <AutocompleteSelect onLocationSelect={onLocationSelect} />
    </APIProvider>
  );
};

const AutocompleteSelect = ({ onLocationSelect }) => {
  const [isClient, setIsClient] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const { options, isLoading, fetchPlaceDetails } = usePlacesAutocomplete({
    input: inputValue,
    enabled: isClient,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (value) => {
    setInputValue(value ?? "");
  };

  const handleSelect = async (selected) => {
    if (!selected) {
      setSelectedValue(null);
      if (onLocationSelect) onLocationSelect(null);
      return;
    }

    setSelectedValue(selected);
    try {
      const details = await fetchPlaceDetails(selected.value);
      if (onLocationSelect) onLocationSelect(details);
    } catch (err) {
      // swallow
    }
  };

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => ({
      ...styles,
      backgroundColor: isSelected
        ? "#eb6753"
        : isHovered
        ? "#eb675312"
        : isFocused
        ? "#eb675312"
        : undefined,
    }),
    menu: (base) => ({
      ...base,
      width: "500px", // 👈 wide popover
      minWidth: "400px",
      zIndex: 9999,
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  if (!isClient) {
    return (
      <div className="text-start select-borderless">
        <div className="select__control">
          <div className="select__value-container">
            <div className="select__placeholder">
              Search location in Ahmedabad
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Select
      value={selectedValue}
      options={options}
      onInputChange={handleInputChange}
      onChange={handleSelect}
      placeholder="Search location in Ahmedabad"
      styles={customStyles}
      className="text-start select-borderless"
      classNamePrefix="select"
      isClearable
      isLoading={isLoading}
      noOptionsMessage={() => "No locations found in Ahmedabad"}
      menuPortalTarget={typeof window !== "undefined" ? document.body : null}
    />
  );
};

export default Location;
