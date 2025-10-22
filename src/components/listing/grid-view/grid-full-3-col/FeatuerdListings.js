"use client";

import PropertyCard from "@/components/home/PropertyCard";
import { useRouter } from "next/navigation";

const FeaturedListings = ({ data, colstyle }) => {
  const router = useRouter();
  return (
    <>
      {data.map((listing) => (
        <div
          className={` ${
            colstyle ? "col-sm-12 col-lg-6" : "col-sm-6 col-lg-4"
          }  `}
          key={listing.id}
        >
          <PropertyCard propertyData={listing} showLikeButton />
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;
