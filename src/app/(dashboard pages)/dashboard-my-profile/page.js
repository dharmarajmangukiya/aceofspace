import ChangePasswordForm from "@/components/property/dashboard/dashboard-profile/ChangePasswordForm";
import PersonalInfo from "@/components/property/dashboard/dashboard-profile/PersonalInfo";
// import ProfileBox from "@/components/property/dashboard/dashboard-profile/ProfileBox";
import KycSection from "@/components/property/dashboard/dashboard-profile/KycSection";

export const metadata = {
  title: "Dashboard My Profile || Settle Wise - Real Estate NextJS Template",
};

const DashboardMyProfile = () => {
  return (
    <>
      <div className="row align-items-center pb40">
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>My Profile</h2>
            <p className="text">We are glad to see you again!</p>
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
              <PersonalInfo />
            </div>
            {/* End PersonalInfo */}
          </div>
          {/* End .ps-widget */}

          <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Update KYC</h4>
            <KycSection />
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
