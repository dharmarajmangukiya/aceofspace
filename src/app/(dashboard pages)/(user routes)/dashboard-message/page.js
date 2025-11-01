import MessageContainer from "@/components/property/dashboard/dashboard-message/MessageContainer";
import SearchBox from "@/components/property/dashboard/dashboard-message/SearchBox";
import UserInboxList from "@/components/property/dashboard/dashboard-message/UserInboxList";

export const metadata = {
  title: "Dashboard Message || Settle Wise - Real Estate NextJS Template",
};

const DashboardMessage = () => {
  return (
    <>
      <div className="row pb40">
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Messages</h2>
          </div>
        </div>
        {/* col-lg-12 */}
      </div>
      {/* End .row */}

      <div className="row mb40">
        <div className="col-lg-6 col-xl-5 col-xxl-4">
          <div className="message_container">
            <div className="inbox_user_list">
              <div className="iu_heading pr35">
                <div className="chat_user_search">
                  <SearchBox />
                </div>
              </div>
              {/* End search box */}

              <div className="chat-member-list pr20">
                <UserInboxList />
              </div>
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-lg-6 col-xl-7 col-xxl-8">
          <MessageContainer />
        </div>
        {/* End .col-6 */}
      </div>
      {/* End .row */}
    </>
  );
};

export default DashboardMessage;
