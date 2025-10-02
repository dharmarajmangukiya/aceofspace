"use client";

import CommercialAdvanceFilterModal from "@/components/common/filters/commercial-advance-filter";
import RentalAdvanceFilterModal from "@/components/common/filters/rental-advance-filter";
import listings from "@/data/listings";
import { useAddProperty, useGetProperties } from "@/hooks/api/property";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PaginationTwo from "../../PaginationTwo";
import ListingSidebar from "../../sidebar";
import FeaturedListings from "./FeatuerdListings";
import TopFilterBar from "./TopFilterBar";

export default function ProperteyFiltering() {
  const searchParams = useSearchParams();
  const addPropertyMutation = useAddProperty();

  const { data: properties } = useGetProperties(searchParams);

  const params = Object.fromEntries([...searchParams]);
  const rentOrLease = ["rent", "lease"].includes(params?.rl)
    ? params?.rl
    : "rent";

  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");

  const [sortedFilteredData, setSortedFilteredData] = useState(
    listings.slice(0, 18)
  );

  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(false);
  const [pageItems, setPageItems] = useState([]);
  const [pageContentTrac, setPageContentTrac] = useState([]);

  useEffect(() => {
    setPageItems(
      sortedFilteredData.slice((pageNumber - 1) * 9, pageNumber * 9)
    );
    setPageContentTrac([
      (pageNumber - 1) * 9 + 1,
      pageNumber * 9,
      sortedFilteredData.length,
    ]);
  }, [pageNumber, sortedFilteredData]);

  const [listingStatus, setListingStatus] = useState(rentOrLease);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathroms, setBathroms] = useState(0);
  const [location, setLocation] = useState("All Cities");
  const [squirefeet, setSquirefeet] = useState([]);
  const [yearBuild, setyearBuild] = useState([]);
  const [categories, setCategories] = useState([]);

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

      // You can either call the add property API or update the search
      // For now, let's just log the data and update the search filters
      console.log("API Data:", apiData);

      // Update the local filter state
      if (formValues.propertyType) {
        setPropertyTypes([
          formValues.propertyType.value || formValues.propertyType,
        ]);
      }
      if (formValues.location) {
        setLocation(formValues.location.value || formValues.location);
      }
      if (formValues.priceRange) {
        setPriceRange(formValues.priceRange);
      }
      if (formValues.bedrooms !== undefined) {
        setBedrooms(formValues.bedrooms);
      }
      if (formValues.bathrooms !== undefined) {
        setBathroms(formValues.bathrooms);
      }
      if (formValues.squareFeetMin && formValues.squareFeetMax) {
        setSquirefeet([formValues.squareFeetMin, formValues.squareFeetMax]);
      }

      // If you want to actually add a property, uncomment the following:
      // await addPropertyMutation.mutateAsync(apiData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const resetFilter = () => {
    setListingStatus(rentOrLease);
    setPropertyTypes([]);
    setPriceRange([0, 100000]);
    setBedrooms(0);
    setBathroms(0);
    setLocation("All Cities");
    setSquirefeet([]);
    setyearBuild([0, 2050]);
    setCategories([]);
    setCurrentSortingOption("Newest");
    document.querySelectorAll(".filterInput").forEach(function (element) {
      element.value = null;
    });

    document.querySelectorAll(".filterSelect").forEach(function (element) {
      element.value = "All Cities";
    });
  };

  const handlelistingStatus = (elm) => {
    setListingStatus(elm);
  };

  const handlepropertyTypes = (elm) => {
    if (elm == "All") {
      setPropertyTypes([]);
    } else {
      setPropertyTypes((pre) =>
        pre.includes(elm) ? [...pre.filter((el) => el != elm)] : [...pre, elm]
      );
    }
  };
  const handlepriceRange = (elm) => {
    setPriceRange(elm);
  };
  const handlebedrooms = (elm) => {
    setBedrooms(elm);
  };
  const handlebathroms = (elm) => {
    setBathroms(elm);
  };
  const handlelocation = (elm) => {
    console.log(elm);
    setLocation(elm);
  };
  const handlesquirefeet = (elm) => {
    setSquirefeet(elm);
  };
  const handleyearBuild = (elm) => {
    setyearBuild(elm);
  };
  const handlecategories = (elm) => {
    if (elm == "All") {
      setCategories([]);
    } else {
      setCategories((pre) =>
        pre.includes(elm) ? [...pre.filter((el) => el != elm)] : [...pre, elm]
      );
    }
  };
  const filterFunctions = {
    handlelistingStatus,
    handlepropertyTypes,
    handlepriceRange,
    handlebedrooms,
    handlebathroms,
    handlelocation,
    handlesquirefeet,
    handleyearBuild,
    handlecategories,
    priceRange,
    listingStatus,
    propertyTypes,
    resetFilter,
    bedrooms,
    bathroms,
    location,
    squirefeet,
    yearBuild,
    categories,
    setPropertyTypes,
    onSearch: handleFormSubmit, // Add form submission handler
  };

  return (
    <section className="pt0 pb90 bgc-f7">
      <div className="container">
        {/* start mobile filter sidebar */}
        <div
          className="offcanvas offcanvas-start p-0"
          tabIndex="-1"
          id="listingSidebarFilter"
          aria-labelledby="listingSidebarFilterLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="listingSidebarFilterLabel">
              Listing Filter
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body p-0">
            <ListingSidebar filterFunctions={filterFunctions} />
          </div>
        </div>
        {/* End mobile filter sidebar */}

        {/* <!-- Advance Feature Modal Start --> */}
        <div className="advance-feature-modal">
          <div
            className="modal fade "
            id="advanceSeachModal"
            tabIndex={-1}
            aria-labelledby="advanceSeachModalLabel"
            aria-hidden="true"
          >
            {filterFunctions?.listingStatus == "rent" ? (
              <RentalAdvanceFilterModal
                filterFunctions={filterFunctions}
                onFormSubmit={(values) => handleFormSubmit(values, "rental")}
              />
            ) : (
              <CommercialAdvanceFilterModal
                filterFunctions={filterFunctions}
                onFormSubmit={(values) =>
                  handleFormSubmit(values, "commercial")
                }
              />
            )}
          </div>
        </div>
        {/* <!-- Advance Feature Modal End --> */}

        <div className="row">
          <TopFilterBar
            pageContentTrac={pageContentTrac}
            filterFunctions={filterFunctions}
            setCurrentSortingOption={setCurrentSortingOption}
            currentSortingOption={currentSortingOption}
          />
        </div>
        {/* End TopFilterBar */}

        <div className="row">
          <FeaturedListings colstyle={colstyle} data={pageItems} />
        </div>
        {/* End .row */}

        <div className="row">
          <PaginationTwo
            pageCapacity={9}
            data={sortedFilteredData}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </section>
  );
}
