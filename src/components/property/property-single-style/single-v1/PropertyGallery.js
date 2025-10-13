"use client";
import Image from "next/image";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";

const PropertyGallery = ({ id, images = [] }) => {
  try {
    console.log("PropertyGallery images:", images);

    // Safe array check with proper validation
    const safeImages = Array.isArray(images)
      ? images.filter((img) => {
          try {
            return img && typeof img === "string" && img.trim().length > 0;
          } catch (error) {
            console.error("Error filtering image:", error);
            return false;
          }
        })
      : [];

    // Early return if no valid images
    if (safeImages.length === 0) {
      return (
        <div className="col-12">
          <div className="sp-img-content mb15-md">
            <div className="popup-img preview-img-1 sp-img">
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ height: "400px", backgroundColor: "#f8f9fa" }}
              >
                <p className="text-muted mb-0">No images available</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const getSafeImageUrl = (imageUrl) => {
      try {
        if (!imageUrl || typeof imageUrl !== "string") return "";
        const trimmed = imageUrl.trim();
        return trimmed.startsWith("http") ? trimmed : `/${trimmed}`;
      } catch (error) {
        console.error("Error processing image URL:", error);
        return "";
      }
    };

    const mainImage = getSafeImageUrl(safeImages[0]);
    const remainingImages = safeImages.slice(1);

    return (
      <>
        <Gallery>
          <div className="col-sm-6">
            <div className="sp-img-content mb15-md">
              <div className="popup-img preview-img-1 sp-img">
                <Item
                  original={mainImage}
                  thumbnail={mainImage}
                  width={610}
                  height={510}
                >
                  {({ ref, open }) => (
                    <Image
                      src={mainImage}
                      width={591}
                      height={558}
                      ref={ref}
                      onClick={open}
                      alt="Property main image"
                      role="button"
                      className="w-100 h-100 cover"
                      onError={(e) => {
                        console.error("Error loading main image:", e);
                        e.target.style.display = "none";
                      }}
                    />
                  )}
                </Item>
              </div>
            </div>
          </div>
          {/* End .col-6 */}

          <div className="col-sm-6">
            <div className="row">
              {remainingImages.map((image, index) => {
                const safeImageUrl = getSafeImageUrl(image);
                if (!safeImageUrl) return null;

                return (
                  <div className="col-6 ps-sm-0" key={index}>
                    <div className="sp-img-content">
                      <div
                        className={`popup-img preview-img-${
                          index + 2
                        } sp-img mb10`}
                      >
                        <Item
                          original={safeImageUrl}
                          thumbnail={safeImageUrl}
                          width={270}
                          height={250}
                        >
                          {({ ref, open }) => (
                            <Image
                              width={270}
                              height={250}
                              className="w-100 h-100 cover"
                              ref={ref}
                              onClick={open}
                              role="button"
                              src={safeImageUrl}
                              alt={`Property image ${index + 2}`}
                              onError={(e) => {
                                console.error(
                                  `Error loading image ${index + 2}:`,
                                  e
                                );
                                e.target.style.display = "none";
                              }}
                            />
                          )}
                        </Item>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Gallery>
      </>
    );
  } catch (error) {
    console.error("Error rendering PropertyGallery:", error);
    return (
      <div className="col-12">
        <div className="sp-img-content mb15-md">
          <div className="popup-img preview-img-1 sp-img">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: "400px", backgroundColor: "#f8f9fa" }}
            >
              <p className="text-muted mb-0">Error loading images</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PropertyGallery;
