"use client";

import CommercialAdvanceFilterModal from "@/components/common/filters/commercial-advance-filter";
import RentalAdvanceFilterModal from "@/components/common/filters/rental-advance-filter";
// import listings from "@/data/listings";
import { useGetProperties } from "@/hooks/api/property";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PaginationTwo from "../../PaginationTwo";
import ListingSidebar from "../../sidebar";
import FeaturedListings from "./FeatuerdListings";
import TopFilterBar from "./TopFilterBar";

export default function ProperteyFiltering() {
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const { data: properties, isLoading, error, refetch } = useGetProperties(searchParams);

  const params = Object.fromEntries([...searchParams]);

  const rentOrLease = ["residential", "commercial"].includes(params?.Type) ? params?.Type : "residential";
  const sortOption = ["latest", "bestMatch", "priceLow", "priceHigh"].includes(params?.Sort) ? params?.Sort : "latest";

  const [sortedFilteredData, setSortedFilteredData] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(false);
  const [pageItems, setPageItems] = useState([]);

  useEffect(() => {
    setPageNumber(1);
  }, [searchParams]);
  
  useEffect(() => {
    if (properties) {
      setPageItems((properties?.pages[0].status == 1 || properties?.pages[0].data?.list.length) ? properties?.pages[0].data?.list : []);
    }
  }, [properties]);
  
  const [pageContentTrac, setPageContentTrac] = useState([]);
  
  const [listingStatus, setListingStatus] = useState(rentOrLease);
  const [currentSortingOption, setCurrentSortingOption] = useState(sortOption);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathroms, setBathroms] = useState(0);
  const [location, setLocation] = useState("All Cities");
  const [squirefeet, setSquirefeet] = useState([]);
  const [yearBuild, setyearBuild] = useState([]);
  const [categories, setCategories] = useState([]);

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
    setCurrentSortingOption();
    document.querySelectorAll(".filterInput").forEach(function (element) {
      element.value = null;
    });

    document.querySelectorAll(".filterSelect").forEach(function (element) {
      element.value = "All Cities";
    });
    
    // Reset URL search parameters and trigger refetch
    router.replace(window.location.pathname, { scroll: false });
  };

  const handlelistingStatus = (elm) => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set('Type', elm);
    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
    router.replace(newUrl, { scroll: false });
    setListingStatus(elm);
  };

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set('Sort', currentSortingOption);
    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
    router.replace(newUrl, { scroll: false });
  }, [currentSortingOption]);

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
            {filterFunctions?.listingStatus == "residential" ? (
              <RentalAdvanceFilterModal filterFunctions={filterFunctions} />
            ) : (
              <CommercialAdvanceFilterModal filterFunctions={filterFunctions} />
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
          {isLoading ? (
            <div className="col-12 text-center py-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading properties...</p>
            </div>
          ) : error ? (
            <div className="col-12 text-center py-5">
              <div className="alert alert-danger" role="alert">
                <h5>Error loading properties</h5>
                <p>{error.message || 'Failed to fetch properties. Please try again.'}</p>
                <button 
                  className="btn btn-primary mt-2" 
                  onClick={() => refetch()}
                >
                  Retry
                </button>
              </div>
            </div>
          ) : pageItems.length === 0 ? (
            <div className="col-12 text-center py-5">
              <h5>No properties found</h5>
              <p>Try adjusting your search criteria or filters.</p>
            </div>
          ) : (
            <FeaturedListings colstyle={colstyle} data={pageItems} />
          )}
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
