"use client";
import CommonPagination from "@/components/common/CommonPagination";
import ListingsFavourites from "@/components/property/dashboard/dashboard-my-favourites/ListingsFavourites";
import { useGetFavorites } from "@/hooks/api/property";
import { useState } from "react";

const DashboardMyFavourites = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: propertiesResponse, isFetching: isMyPropertiesFetching } =
    useGetFavorites(currentPage);

  const properties = propertiesResponse?.data || { favorites: [] };
  const pagination = propertiesResponse?.pagination || {};

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="row align-items-center pb40">
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>My Favourites</h2>
          </div>
        </div>
      </div>
      {/* End .row */}

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
            <ListingsFavourites
              properties={properties?.favorites || []}
              loading={isMyPropertiesFetching}
            />
            <div className="mt30">
              {pagination?.totalPages > 1 && (
                <CommonPagination
                  currentPage={currentPage}
                  totalPages={pagination?.totalPages || 1}
                  totalItems={pagination?.totalItems || 0}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardMyFavourites;
