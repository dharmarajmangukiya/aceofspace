"use client";
import ProperteyFiltering from "@/components/listing/grid-view/grid-full-3-col/ProperteyFiltering";
import Link from "next/link";
import { Suspense } from "react";

const page = () => {
  return (
    <>
      {/* Breadcumb Sections */}
      <section className="breadcumb-section bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">Property Listing</h2>
                <div className="breadcumb-list">
                  <Link href="/">Home</Link>
                  <a>Properties</a>
                </div>
                <a
                  className="filter-btn-left mobile-filter-btn d-block d-lg-none"
                  data-bs-toggle="offcanvas"
                  href="#listingSidebarFilter"
                  role="button"
                  aria-controls="listingSidebarFilter"
                >
                  <span className="flaticon-settings" /> Filter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcumb Sections */}

      <Suspense fallback={<div>Loading...</div>}>
        {/* Property Filtering */}
        <ProperteyFiltering />
        {/* Property Filtering */}
      </Suspense>
    </>
  );
};

export default page;

// {listings
//   .filter((i) => i.forRent)
//   .slice(0, 3)
//   .map((listing) => (
//     <div className="col-sm-6 col-lg-4" key={listing.id}>
//       <PropertyCard
//         listing={listing}
//         onCardClick={() => {}}
//         onLikeClick={() => {}}
//       />
//     </div>
//   ))}
