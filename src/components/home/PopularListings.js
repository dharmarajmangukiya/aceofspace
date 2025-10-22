"use client";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PropertyCard from "./PropertyCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PopularListings = ({ data }) => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {[...data.slice(12, 15), ...data.slice(12, 15)].map(
          (listing, index) => (
            <SwiperSlide key={listing.id + index}>
              <div className="item">
                <PropertyCard propertyData={listing} showLikeButton />
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </>
  );
};

export default PopularListings;
