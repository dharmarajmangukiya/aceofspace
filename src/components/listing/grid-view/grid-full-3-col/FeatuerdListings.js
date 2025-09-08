"use client";

import PropertyCard from "@/components/home/PropertyCard";

const FeaturedListings = ({ data, colstyle }) => {
  return (
    <>
      {data.map((listing) => (
        <div
          className={` ${
            colstyle ? "col-sm-12 col-lg-6" : "col-sm-6 col-lg-4"
          }  `}
          key={listing.id}
        >
          <PropertyCard
            listing={listing}
            onCardClick={() => {}}
            onLikeClick={() => {}}
          />
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;
