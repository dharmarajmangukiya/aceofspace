"use client";
import listings from "@/data/listings";
import Image from "next/image";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import { API_BASE_DOCUMENT_URL } from "@/utils/config";


const PropertyGallery = ({ id, images = [] }) => {
  return (
    <>
      <Gallery>
        <div className="col-sm-6">
          <div className="sp-img-content mb15-md">
            <div className="popup-img preview-img-1 sp-img">
              <Item
                original={`${API_BASE_DOCUMENT_URL}/${images[0]}`}
                thumbnail={`${API_BASE_DOCUMENT_URL}/${images[0]}`}
                width={610}
                height={510}
              >
                {({ ref, open }) => (
                  <Image
                    src={`${API_BASE_DOCUMENT_URL}/${images[0]}`}
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
            {images?.map((image, index) => (
              <div className="col-6 ps-sm-0" key={index}>
                <div className="sp-img-content">
                  <div
                    className={`popup-img preview-img-${index + 2} sp-img mb10`}
                  >
                    <Item
                      original={`${API_BASE_DOCUMENT_URL}/${image}`}
                      thumbnail={`${API_BASE_DOCUMENT_URL}/${image}`}
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
                          src={`${API_BASE_DOCUMENT_URL}/${image}`}
                          alt={'image'}
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
