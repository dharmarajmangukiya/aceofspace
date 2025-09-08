"use client";
import { useRouter } from "next/navigation";
import Slider from "rc-slider";
import { useEffect, useState } from "react";

import Location from "./Location";
import LookingFor from "./LookingFor";

const rentSuggestions = [
  "1 BHK flat on rent",
  "Fully furnished flat for rent",
  "Semi furnished flat for rent",
  "2 BHK flat on rent",
  "Ready to move flats for rent",
  "Affordable PG on rent",
  "3 BHK villa for rent",
  "Luxury apartment for rent",
];

const leaseSuggestions = [
  "Office space on lease",
  "Shops for lease",
  "Warehouse on lease",
  "Commercial property on lease",
  "Industrial shed on lease",
  "Coworking space on lease",
  "Retail space for lease",
  "Showroom for lease",
];

const FilterContent = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("rent");
  const [index, setIndex] = useState(0);

  const isRent = activeTab === "rent";
  const suggestions = isRent ? rentSuggestions : leaseSuggestions;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % suggestions.length);
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, [activeTab, suggestions.length]); // re-run when tab changes

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabs = [
    { id: "rent", label: "Rent" },
    { id: "lease", label: "Lease" },
  ];

  const [price, setPrice] = useState([2000, 45000]);

  // price range handler
  const handleOnChange = (value) => {
    setPrice(value);
  };
  return (
    <div className="advance-style4 at-home5 mt-100 mt50-lg mb10 mx-auto animate-up-2">
      <ul className="nav nav-tabs p-0 m-0">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.id}>
            <button
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content text-start">
        {tabs.map((tab) => (
          <div
            className={`${activeTab === tab.id ? "active" : ""} tab-pane`}
            key={tab.id}
          >
            <div className="advance-content-style3 at-home5">
              <div className="row align-items-center">
                <div className="col-md-4 col-xl-3 bdrr1 bdrrn-sm">
                  <label>Search</label>
                  <div className="advance-search-field position-relative">
                    <form className="form-search position-relative">
                      <div className="box-search">
                        <input
                          className="form-control bgc-f7 bdrs12 ps-0"
                          type="text"
                          name="search"
                          placeholder={`Search "${suggestions[index]}"`}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                {/* End .col-3 */}

                <div className="col-md-4 col-xl-2 bdrr1 bdrrn-sm px20 pl15-sm">
                  <div className="mt-3 mt-md-0 px-0">
                    <div className="bootselect-multiselect">
                      <label className="fz14">
                        Looking for (
                        {activeTab === "rent" ? "Resdential" : "Commercial"})
                      </label>
                      <LookingFor />
                    </div>
                  </div>
                </div>
                {/* End col-md-4 */}

                <div className="col-md-4 col-xl-2 bdrr1 bdrrn-sm px20 pl15-sm">
                  <div className="mt-3 mt-md-0">
                    <div className="bootselect-multiselect">
                      <label className="fz14">Location(Ahmedabad)</label>
                      <Location />
                    </div>
                  </div>
                </div>
                {/* End col-md-4 */}

                <div className="col-md-4 col-xl-2 bdrr1 bdrrn-sm px20 pl15-sm">
                  <div className="mt-3 mt-md-0">
                    <div className="dropdown-lists">
                      <label className="fz14 mb-1">Per month Price </label>
                      <div
                        className="btn open-btn text-start dropdown-toggle"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        style={{ fontSize: "13px" }}
                      >
                        ₹{price[0]} - ₹{price[1]}{" "}
                        <i className="fas fa-caret-down" />
                      </div>
                      <div className="dropdown-menu">
                        <div className="widget-wrapper pb20 mb0 pl20 pr20">
                          <div className="range-wrapper at-home10">
                            <Slider
                              range
                              max={100000}
                              min={0}
                              defaultValue={price}
                              onChange={(value) => handleOnChange(value)}
                              id="slider"
                            />
                            <div className="d-flex align-items-center">
                              <span id="slider-range-value1">₹{price[0]}</span>
                              <i className="fa-sharp fa-solid fa-minus mx-2 dark-color icon" />
                              <span id="slider-range-value2">₹{price[1]}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End col-md-4 */}

                <div className="col-md-6 col-lg-4 col-xl-3">
                  <div className="d-flex align-items-center justify-content-start justify-content-md-center mt-3 mt-md-0">
                    <button
                      className="advance-search-btn"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#advanceSeachModal"
                    >
                      <span className="flaticon-settings" /> Advanced
                    </button>
                    <button
                      className="advance-search-icon ud-btn btn-thm ms-4"
                      type="button"
                      onClick={() =>
                        router.push(`/listing?rl=${isRent ? "rent" : "lease"}`)
                      }
                    >
                      <span className="flaticon-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterContent;
