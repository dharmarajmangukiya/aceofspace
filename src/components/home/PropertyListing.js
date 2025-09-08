"use client";
import listings from "@/data/listings";

import { useState } from "react";
import PopularListings from "./PopularListings";

export default function PropertyListing() {
  const [currentType, setCurrentType] = useState("rent");
  return (
    <section className="bgc-thm pb90 pb40-md">
      <div className="container">
        <div className="row " data-aos="fade-up">
          <div className="col-lg-9">
            <div className="main-title2">
              <h2 className="title text-white">Discover Our Best Deals</h2>
              <p className="paragraph text-white">
                Aliquam lacinia diam quis lacus euismod
              </p>
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-3">
            <div className="dark-light-navtab style3 text-start text-lg-end mt-0 mt-lg-4 mb-4">
              <ul className="nav nav-pills justify-content-start justify-content-lg-end">
                <li className="nav-item" onClick={() => setCurrentType("rent")}>
                  <button
                    className={`nav-link ${
                      currentType == "rent" ? "active" : ""
                    } `}
                  >
                    For Rent
                  </button>
                </li>
                <li
                  className="nav-item"
                  onClick={() => setCurrentType("lease")}
                >
                  <button
                    className={`nav-link me-0 ${
                      currentType == "lease" ? "active" : ""
                    } `}
                  >
                    For Lease
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {/* End .col */}
        </div>
        {/* End .row */}

        <div className="row" data-aos="fade-up" data-aos-delay="300">
          <div className="col-lg-12">
            <PopularListings data={listings} />
          </div>
        </div>
        {/* End .row */}
      </div>
    </section>
  );
}
