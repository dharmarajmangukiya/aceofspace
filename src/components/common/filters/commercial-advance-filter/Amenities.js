"use client";

import { buildingAmenitiesOptions } from "@/utils/constants";
import classNames from "classnames";
import { useState } from "react";

const Amenities = ({ onSelectionChange }) => {
  const [selected, setSelected] = useState([]);

  const handleClick = (amenity) => {
    setSelected((prev) => {
      const isSelected = prev.includes(amenity.value);
      const newSelection = isSelected
        ? prev.filter((val) => val !== amenity.value)
        : [...prev, amenity.value];

      onSelectionChange?.(newSelection);
      return newSelection;
    });
  };

  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5  g-3 mb-3">
      {buildingAmenitiesOptions.map((amenity, idx) => {
        const isSelected = selected.includes(amenity.value);

        return (
          <div className="col" key={idx}>
            <button
              type="button"
              onClick={() => handleClick(amenity)}
              className={classNames(
                "w-100 h-100 border border-1 rounded d-flex flex-column align-items-center justify-content-center p-3 amenity-btn",
                {
                  "amenity-selected": isSelected,
                  "bg-white text-dark": !isSelected,
                }
              )}
              style={{ minHeight: "120px" }} // slightly taller
            >
              <img
                src={amenity.icon}
                alt={amenity.label}
                className="mb-2"
                style={{ width: "24px", height: "24px" }}
              />
              <span className="text-center text-wrap">{amenity.label}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Amenities;
