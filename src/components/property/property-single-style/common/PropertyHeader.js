"use client";

import listings from "@/data/listings";

const PropertyHeader = ({ id, propertyDetail, isRental }) => {
  const data = propertyDetail;
  console.log(propertyDetail);
  
  return (
    <>
      <div className="col-lg-8">
        <div className="single-property-content mb30-md">
          <h2 className="sp-lg-title">{data.apartmentName}</h2>
          <div className="pd-meta mb15 d-md-flex align-items-center">
            {/* bdrr1 */}
            <p className="text fz15 mb-0  pr10 bdrrn-sm">{data?.address}, {data?.area}, {data?.city}, {data?.state}</p>
          </div>
          <div className="property-meta d-flex align-items-center">
            <a className="text fz15" href="#">
              <i className="flaticon-expand pe-2 align-text-top" />
              {data.carpetArea} sqft
            </a>
          </div>
        </div>
      </div>
      {/* End .col-lg--8 */}

      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
              <a className="icon mr10" href="#">
                <span className="flaticon-like" />
              </a>
              <a className="icon mr10" href="#">
                <span className="flaticon-share-1" />
              </a>
              <a className="icon" href="#">
                <span className="flaticon-printer" />
              </a>
            </div>
            <h3 className="price mb-0">{data.expectedRent}/Month</h3>
          </div>
        </div>
      </div>
      {/* End .col-lg--4 */}
    </>
  );
};

export default PropertyHeader;
