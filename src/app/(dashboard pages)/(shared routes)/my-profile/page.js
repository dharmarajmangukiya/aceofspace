"use client";
import ChangePasswordForm from "@/components/property/dashboard/dashboard-profile/ChangePasswordForm";
import PersonalInfo from "@/components/property/dashboard/dashboard-profile/PersonalInfo";
// import ProfileBox from "@/components/property/dashboard/dashboard-profile/ProfileBox";
import KycSection from "@/components/property/dashboard/dashboard-profile/KycSection";
import { useGetProfile } from "@/hooks/api/user";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const DashboardMyProfile = () => {
  const { data: userData, refetch: refetchProfile } = useGetProfile();
  const searchParams = useSearchParams();
  const scrollTo = searchParams.get("scrollTo");
  // Refetch profile when authChange event is fired (e.g., after login)
  useEffect(() => {
    const handleAuthChange = () => {
      refetchProfile();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("authChange", handleAuthChange);
      return () => {
        window.removeEventListener("authChange", handleAuthChange);
      };
    }
  }, [refetchProfile]);

  useEffect(() => {
    if (scrollTo && typeof window !== "undefined") {
      const scrollToElement = document.getElementById(scrollTo);
      if (scrollToElement) {
        const y = scrollToElement.getBoundingClientRect().top - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, [scrollTo]);
  return (
    <>
      <div className="row align-items-center pb40">
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>My Profile</h2>
          </div>
        </div>
      </div>
      {/* End .row */}

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
            {/* <div className="col-xl-7">
              <ProfileBox />
            </div> */}
            {/* End ProfileBox */}

            <div className="col-lg-12">
              <PersonalInfo
                userData={userData}
                refetchProfile={refetchProfile}
              />
            </div>
            {/* End PersonalInfo */}
          </div>
          {/* End .ps-widget */}

          <div
            className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative"
            id="kyc-update"
          >
            <h4 className="title fz17 mb30">Update KYC</h4>
            <KycSection userData={userData} refetchProfile={refetchProfile} />
          </div>
          {/* End .ps-widget */}

          <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Change password</h4>
            <ChangePasswordForm />
          </div>
          {/* End .ps-widget */}
        </div>
      </div>
      {/* End .row */}
    </>
  );
};

export default DashboardMyProfile;
