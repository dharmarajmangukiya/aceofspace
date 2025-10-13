"use client";
import { useState } from "react";

const PropertyHeader = ({ id, propertyDetail, isRental }) => {
  const data = propertyDetail || {};
  const [isFavorited, setIsFavorited] = useState(Boolean(data?.isFavorite));
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleFavorite = () => {
    try {
      setIsFavorited(!isFavorited);
      // TODO: Add API call to update favorite status
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleShare = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator?.share) {
        await navigator.share({
          title: `${
            data?.buildingName || data?.apartmentName || "Property"
          } - ${data?.subType || data?.propertyType || "Property"}`,
          text: `Check out this ${
            data?.subType || data?.propertyType || "property"
          } in ${data?.city || "Unknown City"}, ${
            data?.state || "Unknown State"
          }`,
          url: typeof window !== "undefined" ? window.location.href : "",
        });
      } else if (typeof navigator !== "undefined" && navigator?.clipboard) {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(
          typeof window !== "undefined" ? window.location.href : ""
        );
        setShowShareOptions(true);
        setTimeout(() => setShowShareOptions(false), 2000);
      }
    } catch (error) {
      console.error("Error sharing property:", error);
      // Fallback: show alert or toast
      alert("Unable to share. Please copy the URL manually.");
    }
  };

  const handlePrint = () => {
    try {
      if (typeof window !== "undefined") {
        window.print();
      }
    } catch (error) {
      console.error("Error printing:", error);
    }
  };

  const getPropertyTitle = () => {
    try {
      if (data?.buildingName) return String(data.buildingName);
      if (data?.apartmentName) return String(data.apartmentName);
      return `${data?.subType || data?.propertyType || "Property"} Property`;
    } catch (error) {
      console.error("Error getting property title:", error);
      return "Property";
    }
  };

  const getPrice = () => {
    try {
      if (data?.expectedRent && typeof data.expectedRent === "number") {
        return `₹${data.expectedRent.toLocaleString()}/Month`;
      }
      if (data?.bookingAmount && typeof data.bookingAmount === "number") {
        return `₹${data.bookingAmount.toLocaleString()}`;
      }
      return "Price on Request";
    } catch (error) {
      console.error("Error getting price:", error);
      return "Price on Request";
    }
  };

  const getArea = () => {
    try {
      if (data?.carpetArea && typeof data.carpetArea === "number") {
        return `${data.carpetArea} sqft`;
      }
      if (data?.builtUpArea && typeof data.builtUpArea === "number") {
        return `${data.builtUpArea} sqft`;
      }
      if (data?.superBuiltUpArea && typeof data.superBuiltUpArea === "number") {
        return `${data.superBuiltUpArea} sqft`;
      }
      return "Area not specified";
    } catch (error) {
      console.error("Error getting area:", error);
      return "Area not specified";
    }
  };

  return (
    <>
      <div className="col-lg-8">
        <div className="single-property-content mb30-md">
          <h2 className="sp-lg-title">{getPropertyTitle()}</h2>
          <div className="pd-meta mb15 d-md-flex align-items-center">
            <p className="text fz15 mb-0 pr10 bdrrn-sm">
              {(() => {
                try {
                  const addressParts = [
                    data?.address,
                    data?.area,
                    data?.city,
                    data?.state,
                    data?.pincode,
                  ].filter(Boolean);
                  return addressParts.length > 0
                    ? addressParts.join(", ")
                    : "Address not available";
                } catch (error) {
                  console.error("Error formatting address:", error);
                  return "Address not available";
                }
              })()}
            </p>
          </div>
          <div className="property-meta d-flex align-items-center">
            <a className="text fz15" href="#">
              <i className="flaticon-expand pe-2 align-text-top" />
              {getArea()}
            </a>
            {data?.subType && (
              <a className="text fz15 ms-3" href="#">
                <i className="flaticon-home-1 pe-2 align-text-top" />
                {data.subType}
              </a>
            )}
          </div>
        </div>
      </div>
      {/* End .col-lg--8 */}

      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
              <button
                className={`icon mr10 ${isFavorited ? "text-danger" : ""}`}
                onClick={handleFavorite}
                title={
                  isFavorited ? "Remove from favorites" : "Add to favorites"
                }
              >
                <span
                  className={`flaticon-like ${
                    isFavorited ? "text-danger" : ""
                  }`}
                />
              </button>
              <button
                className="icon mr10 position-relative"
                onClick={handleShare}
                title="Share property"
              >
                <span className="flaticon-share-1" />
                {showShareOptions && (
                  <div
                    className="position-absolute bg-white p-2 rounded shadow"
                    style={{ top: "-40px", right: "0", fontSize: "12px" }}
                  >
                    Link copied!
                  </div>
                )}
              </button>
              <button
                className="icon"
                onClick={handlePrint}
                title="Print property details"
              >
                <span className="flaticon-printer" />
              </button>
            </div>
            <h3 className="price mb-0">{getPrice()}</h3>
          </div>
        </div>
      </div>
      {/* End .col-lg--4 */}
    </>
  );
};

export default PropertyHeader;
