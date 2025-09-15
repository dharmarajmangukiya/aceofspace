"use client";
import CommercialAdvanceFilterModal from "@/components/common/filters/commercial-advance-filter";
import RentalAdvanceFilterModal from "@/components/common/filters/rental-advance-filter";
import { useState } from "react";
import FilterContent from "./FilterContent";

const Hero = () => {
  const [activeTab, setActiveTab] = useState("rent");
  const isRent = activeTab === "rent";

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
            <RentalAdvanceFilterModal />
          ) : (
            <CommercialAdvanceFilterModal />
          )}
        </div>
      </div>
      {/* <!-- Advance Feature Modal End --> */}
    </>
  );
};

export default Hero;
