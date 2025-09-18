"use client";
import listings from "@/data/listings";
import Image from "next/image";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";

const images = [
  {
    src: "/images/properties/detail/listing-single-6-1.webp",
    alt: "2.jpg",
  },
  {
    src: "/images/properties/detail/listing-single-6-2.webp",
    alt: "3.jpg",
  },
  {
    src: "/images/properties/detail/listing-single-6-3.webp",
    alt: "4.jpg",
  },
  {
    src: "/images/properties/detail/listing-single-6-4.webp",
    alt: "5.jpg",
  },
];

const PropertyGallery = ({ id }) => {
  const data = listings.filter((elm) => elm.id == id)[0] || listings[0];
  return (
    <>
      <Gallery>
        <div className="col-sm-6">
          <div className="sp-img-content mb15-md">
            <div className="popup-img preview-img-1 sp-img">
              <Item
                original={"/images/properties/detail/listing-single-6-1.webp"}
                thumbnail={"/images/properties/detail/listing-single-6-1.webp"}
                width={610}
                height={510}
              >
                {({ ref, open }) => (
                  <Image
                    src={"/images/properties/detail/listing-single-6-1.webp"}
                    width={591}
                    height={558}
                    ref={ref}
                    onClick={open}
                    alt="image"
                    role="button"
                    className="w-100 h-100 cover"
                  />
                )}
              </Item>
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6">
          <div className="row">
            {images.map((image, index) => (
              <div className="col-6 ps-sm-0" key={index}>
                <div className="sp-img-content">
                  <div
                    className={`popup-img preview-img-${index + 2} sp-img mb10`}
                  >
                    <Item
                      original={image.src}
                      thumbnail={image.src}
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
                          src={image.src}
                          alt={image.alt}
                        />
                      )}
                    </Item>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Gallery>
    </>
  );
};

export default PropertyGallery;
