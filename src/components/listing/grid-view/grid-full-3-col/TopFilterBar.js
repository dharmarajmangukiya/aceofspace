"use client";

import Bathroom from "../../sidebar/Bathroom";
import Bedroom from "../../sidebar/Bedroom";
import ListingSortBy from "../../sidebar/ListingSortBy";
import ListingStatus from "../../sidebar/ListingStatus";
import PriceRange from "../../sidebar/PriceRange";
import PropertyType from "../../sidebar/PropertyType";

const TopFilterBar = ({
  filterFunctions,
  setCurrentSortingOption,
  currentSortingOption,
}) => {
  return (
    <>
      <div className="col-xl-9 d-none d-lg-block">
        <div className="dropdown-lists">
          <ul className="p-0 text-center text-xl-start">
            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                For{" "}
                {filterFunctions?.listingStatus === "rent" ? "Rent" : "Lease"}
                <i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
                  <h6 className="list-title">Listing Status</h6>
                  <div className="radio-element">
                    <ListingStatus filterFunctions={filterFunctions} />
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm drop_btn"
                  >
                    Done
                  </button>
                </div>
              </div>
            </li>
            {/* End li Listing Status */}

            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                Sort by
                <i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
                  <h6 className="list-title">Sort by</h6>
                  <div className="radio-element">
                    <ListingSortBy
                      setCurrentSortingOption={setCurrentSortingOption}
                      currentSortingOption={currentSortingOption}
                    />
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm drop_btn"
                  >
                    Done
                  </button>
                </div>
              </div>
            </li>
            {/* End li Listing Status */}

            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                Property Type <i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
                  <h6 className="list-title">Property Type</h6>
                  <div className="checkbox-style1">
                    <PropertyType
                      filterFunctions={filterFunctions}
                      rentOrLease={filterFunctions?.listingStatus}
                    />
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm dropdown-toggle"
                  >
                    Done
                  </button>
                </div>
              </div>
            </li>
            {/* End li Property Type */}

            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                {filterFunctions?.listingStatus === "rent"
                  ? "Rent"
                  : "Lease Amount"}
                <i className="fa fa-angle-down ms-2" />
              </button>

              <div className="dropdown-menu dd3">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
                  <h6 className="list-title">
                    {filterFunctions?.listingStatus === "rent"
                      ? "Rent"
                      : "Lease"}{" "}
                    Range
                  </h6>
                  {/* Range Slider Desktop Version */}
                  <div className="range-slider-style1">
                    <PriceRange filterFunctions={filterFunctions} />
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm drop_btn3"
                  >
                    Done
                  </button>
                </div>
              </div>
            </li>
            {/* End li Price */}

            {/* TBD from client */}

            {filterFunctions?.listingStatus === "rent" && (
              <li className="list-inline-item position-relative">
                <button
                  type="button"
                  className="open-btn mb15 dropdown-toggle"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                >
                  Beds / Baths <i className="fa fa-angle-down ms-2" />
                </button>
                <div className="dropdown-menu dd4 pb20">
                  <div className="widget-wrapper pl20 pr20">
                    <h6 className="list-title">Bedrooms</h6>
                    <div className="d-flex">
                      <Bedroom filterFunctions={filterFunctions} />
                    </div>
                  </div>

                  <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
                    <h6 className="list-title">Bathrooms</h6>
                    <div className="d-flex">
                      <Bathroom filterFunctions={filterFunctions} />
                    </div>
                  </div>
                  <div className="text-end mt10 pr10">
                    <button
                      type="button"
                      className="done-btn ud-btn btn-thm drop_btn4"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </li>
            )}
            {/* End bed and bathroom check */}

            <li className="list-inline-item">
              {/* Opens in parent component */}
              {/* https://getbootstrap.com/docs/5.0/components/modal/#optional-sizes */}
              {/* Advance Features modal trigger */}
              <button
                type="button"
                className="open-btn mb15"
                data-bs-toggle="modal"
                data-bs-target="#advanceSeachModal"
              >
                <i className="flaticon-settings me-2" /> More Filter
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* End .col-9 */}

      {/* <div className="col-xl-3">
        <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
          <div className="pcs_dropdown pr10 d-flex align-items-center">
            <span style={{ minWidth: "60px" }}>Sort by</span>
            <select
              className="form-select"
              onChange={(e) =>
                setCurrentSortingOption &&
                setCurrentSortingOption(e.target.value)
              }
            >
              <option>Newest</option>
              <option>Best Seller</option>
              <option>Best Match</option>
              <option>Price Low</option>
              <option>Price High</option>
            </select>
          </div>
          <div
            className={`pl15 pr15 bdrl1 bdrr1 d-none d-md-block  cursor ${
              !colstyle ? "menuActive" : "#"
            } `}
            onClick={() => setColstyle(false)}
          >
            Grid
          </div>
          <div
            className={`pl15 d-none d-md-block  cursor ${
              colstyle ? "menuActive" : "#"
            }`}
            onClick={() => setColstyle(true)}
          >
            List
          </div>
        </div>
      </div> */}
      {/* End .col-3 */}
    </>
  );
};

export default TopFilterBar;
