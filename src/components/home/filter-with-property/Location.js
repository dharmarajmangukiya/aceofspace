"use client";
import { GOOGLE_MAPS_API_KEY } from "@/utils/config";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useRef, useState } from "react";
import Select from "react-select";

const API_KEY = GOOGLE_MAPS_API_KEY;

const Location = () => {
  return (
    <APIProvider apiKey={API_KEY}>
      <AutocompleteSelect />
    </APIProvider>
  );
};

const AutocompleteSelect = () => {
  const places = useMapsLibrary("places");
  const [service, setService] = useState(null);
  const [options, setOptions] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    setIsClient(true);
    if (places) {
      setService(new window.google.maps.places.AutocompleteService());
    }
  }, [places]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  const handleInputChange = useCallback(
    (inputValue) => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

      if (!service || !inputValue) {
        setOptions([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      debounceTimeout.current = setTimeout(() => {
        const AHD_BOUNDS = new window.google.maps.LatLngBounds(
          { lat: 22.93, lng: 72.47 }, // Southwest corner of Ahmedabad
          { lat: 23.12, lng: 72.68 } // Northeast corner of Ahmedabad
        );

        service.getPlacePredictions(
          {
            input: inputValue,
            bounds: AHD_BOUNDS,
            strictBounds: true,
            componentRestrictions: { country: "in" },
          },
          (predictions, status) => {
            setIsLoading(false);

            if (
              status !== window.google.maps.places.PlacesServiceStatus.OK ||
              !predictions
            ) {
              setOptions([]);
              return;
            }

            setOptions(
              predictions.map((p) => ({
                value: p.place_id,
                label: p.description,
              }))
            );
          }
        );
      }, 300);
    },
    [service]
  );

  const handleSelect = (selected) => {
    if (!selected || !service) return;

    const placesService = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    placesService.getDetails({ placeId: selected.value }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const coords = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        console.log("Selected place coordinates:", coords);
      } else {
        console.error("Failed to get place details:", status);
      }
    });
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
