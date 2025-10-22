"use client";
import CommonPagination from "@/components/common/CommonPagination";
import FilterHeader from "@/components/property/dashboard/dashboard-my-properties/FilterHeader";
import PropertyDataTable from "@/components/property/dashboard/dashboard-my-properties/PropertyDataTable";
import { useGetMyProperties } from "@/hooks/api/property";
import { PAGE_SIZE } from "@/utils/constants";
import { useEffect, useState } from "react";
const DashboardMyProperties = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  const { data: propertiesResponse, isFetching: isMyPropertiesFetching } =
    useGetMyProperties(currentPage, PAGE_SIZE, searchTerm, sortBy);

  const properties = propertiesResponse?.data || [];
  const pagination = propertiesResponse?.pagination || {};

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
    setCurrentPage(1); // Reset to first page when sorting
  };

  // Reset to first page when search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  return (
    <>
      <div className="row align-items-center pb40">
        <div className="col-xxl-3">
          <div className="dashboard_title_area">
            <h2>My Properties</h2>
          </div>
        </div>
        <div className="col-xxl-9">
          <FilterHeader
            onSearchTermChange={handleSearch}
            onSortChange={handleSortChange}
            searchTerm={searchTerm}
            sortValue={sortBy}
            isLoading={isMyPropertiesFetching}
          />
        </div>
      </div>
      {/* End .row */}

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
            <div className="packages_table table-responsive">
              <PropertyDataTable
                properties={properties}
                isLoading={isMyPropertiesFetching}
              />

              <div className="mt30">
                <CommonPagination
                  currentPage={currentPage}
                  totalPages={pagination?.totalPages || 1}
                  totalItems={pagination?.totalItems || 0}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End .row */}
    </>
  );
};

export default DashboardMyProperties;
