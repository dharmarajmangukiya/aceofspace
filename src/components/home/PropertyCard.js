"use client";
import Image from "next/image";
import Link from "next/link";

const PropertyCard = ({
  listing,
  onClick = () => {},
  onFeatureClick,
  onForSaleClick,
  onNewTabClick,
  onPlusClick,
  onLikeClick,
  imageStyles = {},
}) => {
  return (
    <div role="button" onClick={onClick} className="listing-style9">
      <div className="list-thumb">
        <Image
          width={465}
          height={382}
          className={"w-100 h-100 cover"}
          style={imageStyles}
          src={"/images/listings/xl-6.jpg"}
          alt="listings"
        />
        <div className="sale-sticker-wrap">
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

        <div className="list-meta">
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
          {listing.price} / <span>mo</span>
        </div>
        <h6 className="list-title my-1">
          <Link href={`/single-v2/${listing.id}`}>{listing.title}</Link>
        </h6>
        <div className="list-meta2 d-flex align-items-center">
          <a href="#" className="mr10">
            <span className="flaticon-bed mr5" /> {listing.bed} bed
          </a>
          <a href="#" className="mr10">
            <span className="flaticon-shower mr5" /> {listing.bath} bath
          </a>
          <a href="#">
            <span className="flaticon-expand mr5" /> {listing.sqft} sqft
          </a>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
