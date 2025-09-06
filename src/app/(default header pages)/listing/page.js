import Listing from "@/components/listing/list-view/Listing";

const page = () => {
  return (
    <>
      <section className="breadcumb-section bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">All List Style</h2>
                <div className="breadcumb-list">
                  <a href="/">Home</a>
                  <a href="/listing">Property Listing</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt0 pb90 bgc-f7">
        <div className="container">
          <div className="mb30">
            <h4 className="mb30">Rent</h4>
            <div className="row">
              <Listing />;
            </div>
          </div>
          <div className="mb30">
            <h4 className="mb30">Commercial</h4>
            <div className="row">
              <Listing />;
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
