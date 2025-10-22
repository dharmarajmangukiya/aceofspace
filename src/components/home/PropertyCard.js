"use client";
import {
  useAddToFavorites,
  useRemoveFromFavorites,
} from "@/hooks/api/property";
import { BACKEND_BASE_URL } from "@/utils/config";
import { pickErrorMessage } from "@/utils/helper";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const PropertyCard = ({
  propertyData,
  onCardClick = () => {},
  onFeatureClick,
  onForSaleClick,
  onNewTabClick,
  onPlusClick,
  showLikeButton = false,
  imageStyles = {},
}) => {
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  const { mutate: addToFavorites } = useAddToFavorites();
  const { mutate: removeFromFavorites } = useRemoveFromFavorites();
  const isFavorite = Boolean(propertyData?.isFavorite);

  const handleFavorite = (e) => {
    e.stopPropagation();
    const functionToCall = isFavorite ? removeFromFavorites : addToFavorites;

    functionToCall(propertyData?.id, {
      onError: (error) => {
        const errorMessage = pickErrorMessage(
          error,
          `Error ${isFavorite ? "removing" : "adding"} favorites:`
        );
        toast.error(errorMessage);
      },
    });
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getImageSrc = () => {
    if (imageError) {
      return "/images/no-image.png";
    }
    if (propertyData?.images?.length > 0) {
      let url = propertyData.images[0];
      if (url.startsWith("/")) {
        url = BACKEND_BASE_URL + url;
      }
      return url;
    }
    return "/images/no-image.png";
  };

  console.log(getImageSrc(), "getImageSrc");

  const handleCardClick = () => {
    if (propertyData?.id) {
      router.push(`/property-detail/${propertyData?.id}`);
    }
    if (onCardClick) {
      onCardClick(propertyData);
    }
  };
  return (
    <div role="button" onClick={handleCardClick} className="listing-style9">
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
          {onFeatureClick && propertyData?.forRent && (
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
        <div
          className="list-meta"
          style={{
            zIndex: 3,
            transform: "translateX(0px)",
          }}
        >
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
          {showLikeButton && (
            <a onClick={handleFavorite} role="button">
              <i
                className={classNames(
                  "icon-center",
                  isFavorite
                    ? "fa-solid fa-heart text-danger"
                    : "fa-solid fa-heart"
                )}
              />
            </a>
          )}
        </div>
      </div>

      <div className="list-content">
        <div className="list-price">
          {propertyData?.expectedRent} / <span>mo</span>
        </div>
        <h6 className="list-title my-1">
          <Link href={`/single-v2/${propertyData?.id}`}>
            {propertyData?.buildingName}
          </Link>
        </h6>

        {(() => {
          if (propertyData?.propertyType === "residential") {
            return (
              <div className="list-meta2 d-flex align-items-center flex-wrap">
                <a href="#" className="mr10">
                  <i className="fa-solid fa-building"></i>{" "}
                  {propertyData?.subType}
                </a>
                {propertyData?.bedrooms && (
                  <a href="#" className="mr10">
                    <i className="fa-solid fa-bed mr5"></i>{" "}
                    {propertyData.bedrooms} bedroom(s)
                  </a>
                )}
                {propertyData?.bathrooms && (
                  <a href="#" className="mr10">
                    <i className="fa-solid fa-shower mr5"></i>{" "}
                    {propertyData.bathrooms} bath
                  </a>
                )}
                {propertyData?.furnishing && (
                  <a href="#">
                    <i className="fa-solid fa-couch mr5"></i>{" "}
                    {propertyData.furnishing}
                  </a>
                )}
                {propertyData?.carpetArea && (
                  <a href="#">
                    <span className="flaticon-expand mr5" />{" "}
                    {propertyData.carpetArea} Carpet Area sqft
                  </a>
                )}
              </div>
            );
          } else if (propertyData?.propertyType === "commercial") {
            return (
              <div className="list-meta2 d-flex align-items-center flex-wrap">
                <a href="#" className="mr10">
                  <i className="fa-solid fa-building mr5"></i>{" "}
                  {propertyData?.subType}
                </a>

                {propertyData?.noOfCabins && (
                  <a href="#" className="mr10">
                    <i className="fa-solid fa-building mr5"></i>{" "}
                    {propertyData.noOfCabins} Cabins
                  </a>
                )}

                {propertyData?.maxSeats && (
                  <a href="#" className="mr10">
                    <i className="fa-solid fa-chair"></i>{" "}
                    {propertyData.maxSeats} Seats
                  </a>
                )}

                {propertyData?.carpetArea && (
                  <a href="#" className="mr10">
                    <span className="flaticon-expand mr5" />{" "}
                    {propertyData.carpetArea} Carpet Area sqft
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
