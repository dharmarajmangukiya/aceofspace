"use client";
import { AuthContext } from "@/Layouts/AuthProvider";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import RecentActivities from "@/components/property/dashboard/dashboard-home/RecentActivities";
import TopStateBlock from "@/components/property/dashboard/dashboard-home/TopStateBlock";
import PropertyViews from "@/components/property/dashboard/dashboard-home/property-view";
import { useContext, useEffect, useState } from "react";

const DashboardHome = () => {
  const { userData } = useContext(AuthContext);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = (userData?.firstName ?? "").trim();
    setUserName(name ? `, ${name}` : "");
  }, [userData?.firstName]);

  return (
    <>
      <div className="row pb40">
        <div className="col-lg-12">
          <DboardMobileNavigation />
        </div>
        {/* End .col-12 */}

        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>{"Howdy" + userName + "!"}</h2>
            <p className="text">We are glad to see you again!</p>
          </div>
        </div>
        {/* col-lg-12 */}
      </div>
      {/* End .row */}

      <div className="row">
        <TopStateBlock />
      </div>
      {/* End .row */}

      <div className="row">
        <div className="col-xl-8">
          <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
            <div className="row">
              <PropertyViews />
            </div>
          </div>
        </div>
        {/* End col-xl-8 */}

        <div className="col-xl-4">
          <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
            <h4 className="title fz17 mb25">Recent Activities</h4>
            <RecentActivities />
          </div>
        </div>
        {/* End .col-xl-4 */}
      </div>
      {/* End .row */}
    </>
  );
};

export default DashboardHome;
