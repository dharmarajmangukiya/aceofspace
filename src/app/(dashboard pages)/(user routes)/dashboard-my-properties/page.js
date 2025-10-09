import PropertyDataTable from "@/components/property/dashboard/dashboard-my-properties/PropertyDataTable";
import Pagination from "@/components/property/Pagination";
import FilterHeader from "../../../../components/property/dashboard/dashboard-my-properties/FilterHeader";

export const metadata = {
  title: "Dashboard Properties || Settle Wise - Real Estate NextJS Template",
};

const DashboardMyProperties = () => {
  return (
    <>
      <div className="row align-items-center pb40">
        <div className="col-xxl-3">
          <div className="dashboard_title_area">
            <h2>My Properties</h2>
            <p className="text">We are glad to see you again!</p>
          </div>
        </div>
        <div className="col-xxl-9">
          <FilterHeader />
        </div>
      </div>
      {/* End .row */}

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
            <div className="packages_table table-responsive">
              <PropertyDataTable />

              <div className="mt30">
                <Pagination />
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
