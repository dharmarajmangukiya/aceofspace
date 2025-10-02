"use client";
import CommercialAdvanceFilterModal from "@/components/common/filters/commercial-advance-filter";
import RentalAdvanceFilterModal from "@/components/common/filters/rental-advance-filter";
import { useAddProperty } from "@/hooks/api/property";
import { useState } from "react";
import FilterContent from "./FilterContent";

const Hero = () => {
  const [activeTab, setActiveTab] = useState("rent");
  const isRent = activeTab === "rent";
  const addPropertyMutation = useAddProperty();

  // Handle form submission from advance filters
  const handleFormSubmit = async (formValues, formType) => {
    try {
      console.log(`${formType} Filter Values:`, formValues);

      // Transform form values to API format
      const apiData = {
        propertyType: formValues.propertyType?.value || formValues.propertyType,
        location: formValues.location?.value || formValues.location,
        priceRange: formValues.priceRange,
        bedrooms: formValues.bedrooms,
        bathrooms: formValues.bathrooms,
        squareFeet:
          formValues.squareFeetMin && formValues.squareFeetMax
            ? [formValues.squareFeetMin, formValues.squareFeetMax]
            : formValues.squirefeet,
        availableFrom: formValues.availableFrom,
        furnishingStatus:
          formValues.furnishingStatus?.value || formValues.furnishingStatus,
        ageOfProperty:
          formValues.ageOfProperty?.value || formValues.ageOfProperty,
        amenities: formValues.amenities || [],
        // Commercial specific fields
        ...(formType === "commercial" && {
          zoneType: formValues.zoneType?.map((z) => z.value) || [],
          carpetArea:
            formValues.carpetAreaMin && formValues.carpetAreaMax
              ? [formValues.carpetAreaMin, formValues.carpetAreaMax]
              : [],
          floorPreference:
            formValues.floorPreference?.map((f) => f.value) || [],
          seatCount:
            formValues.seatCountMin && formValues.seatCountMax
              ? [formValues.seatCountMin, formValues.seatCountMax]
              : [],
          cabins: formValues.cabins,
          washrooms: formValues.washrooms,
          entranceWidth: formValues.entranceWidth,
          clearHeight: formValues.clearHeight,
          parking: formValues.parking,
          safetyMeasures: formValues.safetyMeasures,
          facilities: formValues.facilities || [],
        }),
        // Rental specific fields
        ...(formType === "rental" && {
          gatedCommunities: formValues.gatedCommunities,
          availableFor:
            formValues.availableFor?.value || formValues.availableFor,
        }),
      };

      console.log("API Data:", apiData);

      // If you want to actually add a property, uncomment the following:
      // await addPropertyMutation.mutateAsync(apiData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="inner-banner-style1 text-center">
        <FilterContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isRent={isRent}
        />
      </div>
      {/* End Hero content */}

      {/* <!-- Advance Feature Modal Start --> */}
      <div className="advance-feature-modal">
        <div
          className="modal fade"
          id="advanceSeachModal"
          tabIndex={-1}
          aria-labelledby="advanceSeachModalLabel"
          aria-hidden="true"
        >
          {isRent ? (
            <RentalAdvanceFilterModal
              onFormSubmit={(values) => handleFormSubmit(values, "rental")}
            />
          ) : (
            <CommercialAdvanceFilterModal
              onFormSubmit={(values) => handleFormSubmit(values, "commercial")}
            />
          )}
        </div>
      </div>
      {/* <!-- Advance Feature Modal End --> */}
    </>
  );
};

export default Hero;
