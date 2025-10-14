"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PropertyCard = ({
  listing,
  onCardClick = () => {},
  onFeatureClick,
  onForSaleClick,
  onNewTabClick,
  onPlusClick,
  onLikeClick,
  imageStyles = {},
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getImageSrc = () => {
    if (imageError) {
      return "/images/no-image.png";
    }
    if (listing?.images?.length || 0) {
      return listing.images[0];
    }
    return "/images/no-image.png";
  };

  return (
    <div role="button" onClick={onCardClick} className="listing-style9">
      <div
        className="list-thumb"
        style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}
      >
        <Image
          width={465}
          height={620}
          className={"w-100 h-100"}
          style={{
            ...imageStyles,
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
          src={getImageSrc()}
          unoptimized
          alt="listings"
          onError={handleImageError}
        />
        {/* Gradient overlay for better text visibility - darker at bottom */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.9) 100%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="sale-sticker-wrap"
          style={{ position: "relative", zIndex: 2 }}
        >
          {onFeatureClick && listing.forRent && (
            <div
              className="list-tag rounded-0 fz12"
              onClick={onFeatureClick}
              role="button"
            >
              <span className="flaticon-electricity" />
              FEATURED
            </div>
          )}
          {onForSaleClick && (
            <div
              className="list-tag2 rounded-0 fz12"
              onClick={onForSaleClick}
              role="button"
            >
              FOR SALE
            </div>
          )}
        </div>

        <div className="list-meta" style={{ position: "relative", zIndex: 2 }}>
          {onNewTabClick && (
            <a onClick={onNewTabClick} role="button">
              <span className="flaticon-fullscreen" />
            </a>
          )}
          {onPlusClick && (
            <a onClick={onPlusClick} role="button">
              <span className="flaticon-new-tab" />
            </a>
          )}
          {onLikeClick && (
            <a onClick={onLikeClick} role="button">
              <span className="flaticon-like" />
            </a>
          )}
        </div>
      </div>

      <div className="list-content">
        <div className="list-price">
          {listing.expectedRent} / <span>mo</span>
        </div>
        <h6 className="list-title my-1">
          <Link href={`/single-v2/${listing.id}`}>{listing.buildingName}</Link>
        </h6>

        {(() => {
          if (listing.propertyType === "residential") {
            return (
              <div className="list-meta2 d-flex align-items-center flex-wrap">
                <a href="#" className="mr10">
                  <i className="fa-solid fa-building"></i> {listing.subType}
                </a>
                {listing.bedrooms && (
                  <a href="#" className="mr10">
                    <i className="fa-solid fa-bed mr5"></i> {listing.bedrooms}{" "}
                    bedroom(s)
                  </a>
                )}
                {listing.bathrooms && (
                  <a href="#" className="mr10">
                    <i className="fa-solid fa-shower mr5"></i>{" "}
                    {listing.bathrooms} bath
                  </a>
                )}
                {listing.furnishing && (
                  <a href="#">
                    <i className="fa-solid fa-couch mr5"></i>{" "}
                    {listing.furnishing}
                  </a>
                )}
                {listing.carpetArea && (
                  <a href="#">
                    <span className="flaticon-expand mr5" />{" "}
                    {listing.carpetArea} Carpet Area sqft
                  </a>
                )}
              </div>
            );
          } else if (listing.propertyType === "commercial") {
            return (
              <div className="list-meta2 d-flex align-items-center flex-wrap">
                <a href="#" className="mr10">
                  <i className="fa-solid fa-building mr5"></i> {listing.subType}
                </a>

                {listing.noOfCabins && (
                  <a href="#" className="mr10">
                    <i className="fa-solid fa-building mr5"></i>{" "}
                    {listing.noOfCabins} Cabins
                  </a>
                )}

                {listing.maxSeats && (
                  <a href="#" className="mr10">
                    <i className="fa-solid fa-chair"></i> {listing.maxSeats}{" "}
                    Seats
                  </a>
                )}

                {listing.carpetArea && (
                  <a href="#" className="mr10">
                    <span className="flaticon-expand mr5" />{" "}
                    {listing.carpetArea} Carpet Area sqft
                  </a>
                )}
              </div>
            );
          }
        })()}
      </div>
    </div>
  );
};

export default PropertyCard;
