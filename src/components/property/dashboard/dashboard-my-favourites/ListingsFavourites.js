"use client";
import Loader from "@/components/common/Loader";
import PropertyCard from "@/components/home/PropertyCard";

const ListingsFavourites = ({ properties, loading }) => {
  if (loading) {
    return <Loader />;
  }

  console.log("properties", properties);
  return (
    <>
      {!properties || (properties && properties?.length === 0) ? (
        <h3>No favourites available.</h3>
      ) : (
        <div className="row">
          {properties?.map((property, index) => (
            <div className="col-sm-6  col-xl-4" key={property?.id + index}>
              <PropertyCard propertyData={property?.property} showLikeButton />
            </div>
          ))}
        </div>
      )}
      {/* <div className="col-md-6 col-lg-4 col-xl-3" key={listing.id}>
            <div className="listing-style1 style2">
              <div className="list-thumb">
                <Image
                  width={382}
                  height={248}
                  className="w-100 h-100 cover"
                  src={listing.image}
                  alt="listings"
                />

                <button
                  className="tag-del"
                  title="Delete Item"
                  onClick={() => handleDeleteListing(listing.id)}
                  style={{ border: "none" }}
                  data-tooltip-id={`delete-${listing.id}`}
                >
                  <span className="fas fa-trash-can"></span>
                </button>

                <ReactTooltip
                  id={`delete-${listing.id}`}
                  place="left"
                  content="Delete"
                />

                <div className="list-price">
                  {listing.price} / <span>mo</span>
                </div>
              </div>
              <div className="list-content">
                <h6 className="list-title">
                  <Link href={`/single-v3/${listing.id}`}>{listing.title}</Link>
                </h6>
                <p className="list-text">{listing.location}</p>
                <div className="list-meta d-flex align-items-center">
                  <a href="#">
                    <span className="flaticon-bed" /> {listing.bed} bed
                  </a>
                  <a href="#">
                    <span className="flaticon-shower" /> {listing.bath} bath
                  </a>
                  <a href="#">
                    <span className="flaticon-expand" /> {listing.sqft} sqft
                  </a>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="list-meta2 d-flex justify-content-between align-items-center">
                  <span className="for-what">For Rent</span>
                  <div className="icons d-flex align-items-center">
                    <a href="#">
                      <span className="flaticon-fullscreen" />
                    </a>
                    <a href="#">
                      <span className="flaticon-new-tab" />
                    </a>
                    <a href="#">
                      <span className="flaticon-like" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
    </>
  );
};

export default ListingsFavourites;
