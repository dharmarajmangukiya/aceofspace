"use client";
import AddPropertyTabContent from "@/components/property/dashboard/dashboard-add-property";
import { useGetPropertyDetail } from "@/hooks/api/property";
import { useParams } from "next/navigation";

const page = () => {
  const { id } = useParams();
  const { data: propertyData, isLoading } = useGetPropertyDetail(id);

  return (
    <>
      <div className="row align-items-center pb40">
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Edit Property</h2>
          </div>
        </div>
      </div>
      {/* End .row */}

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs12 default-box-shadow2 pt30 mb30 overflow-hidden position-relative">
            <div className="navtab-style1">
              <AddPropertyTabContent propertyData={propertyData?.data || {}} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
