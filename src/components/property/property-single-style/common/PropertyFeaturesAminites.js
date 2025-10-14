const PropertyFeaturesAminites = ({ amenities = [] }) => {
  const data =
    amenities && typeof amenities === "string"
      ? JSON.parse(amenities)
      : amenities;
  if (!data || data?.length === 0) return <></>;

  return (
    <>
      <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
        <h4 className="title fz17 mb30">Features &amp; Amenities</h4>
        <div className="row">
          {data.map((row, rowIndex) => (
            <div key={rowIndex} className="col-sm-6 col-md-4">
              <div className="pd-list">
                <p className="text mb10">
                  <i className="fas fa-circle fz6 align-middle pe-2" />
                  {row}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PropertyFeaturesAminites;
