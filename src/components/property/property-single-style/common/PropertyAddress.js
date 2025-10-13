const PropertyAddress = ({ propertyDetail }) => {
  const data = propertyDetail || {};

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="col-md-12">
        <p className="text-muted">Address information not available</p>
      </div>
    );
  }

  const getFullAddress = () => {
    try {
      const parts = [];
      if (data?.houseNo && typeof data.houseNo === "string") {
        parts.push(String(data.houseNo).trim());
      }
      if (data?.buildingName && typeof data.buildingName === "string") {
        parts.push(String(data.buildingName).trim());
      }
      if (data?.address && typeof data.address === "string") {
        parts.push(String(data.address).trim());
      }
      if (data?.area && typeof data.area === "string") {
        parts.push(String(data.area).trim());
      }
      if (data?.landmark && typeof data.landmark === "string") {
        parts.push(String(data.landmark).trim());
      }
      return parts.length > 0 ? parts.join(", ") : "Address not specified";
    } catch (error) {
      console.error("Error formatting full address:", error);
      return "Address not specified";
    }
  };

  const getMapQuery = () => {
    try {
      const addressParts = [];
      if (data?.address && typeof data.address === "string") {
        addressParts.push(String(data.address).trim());
      }
      if (data?.area && typeof data.area === "string") {
        addressParts.push(String(data.area).trim());
      }
      if (data?.city && typeof data.city === "string") {
        addressParts.push(String(data.city).trim());
      }
      if (data?.state && typeof data.state === "string") {
        addressParts.push(String(data.state).trim());
      }
      if (
        data?.pincode &&
        (typeof data.pincode === "string" || typeof data.pincode === "number")
      ) {
        addressParts.push(String(data.pincode).trim());
      }
      return addressParts.length > 0
        ? addressParts.join(", ")
        : "Unknown Location";
    } catch (error) {
      console.error("Error formatting map query:", error);
      return "Unknown Location";
    }
  };

  const getSafeValue = (value, fallback = "Not specified") => {
    try {
      if (value === null || value === undefined) return fallback;
      if (typeof value === "string" && value.trim() === "") return fallback;
      return String(value).trim();
    } catch (error) {
      console.error("Error getting safe value:", error);
      return fallback;
    }
  };

  try {
    return (
      <>
        <div className="col-md-6 col-xl-4">
          <div className="d-flex justify-content-between">
            <div className="pd-list">
              <p className="fw600 mb10 ff-heading dark-color">Address</p>
              <p className="fw600 mb10 ff-heading dark-color">City</p>
              <p className="fw600 mb10 ff-heading dark-color">State</p>
              <p className="fw600 mb10 ff-heading dark-color">Pincode</p>
              <p className="fw600 mb-0 ff-heading dark-color">Area</p>
            </div>
            <div className="pd-list">
              <p className="text mb10">{getFullAddress()}</p>
              <p className="text mb10">{getSafeValue(data?.city)}</p>
              <p className="text mb10">{getSafeValue(data?.state)}</p>
              <p className="text mb10">{getSafeValue(data?.pincode)}</p>
              <p className="text mb-0">{getSafeValue(data?.area)}</p>
            </div>
          </div>
        </div>
        {/* End col */}

        <div className="col-md-6 col-xl-4 offset-xl-2">
          <div className="d-flex justify-content-between">
            <div className="pd-list">
              <p className="fw600 mb10 ff-heading dark-color">Zone</p>
              <p className="fw600 mb10 ff-heading dark-color">Location</p>
              <p className="fw600 mb10 ff-heading dark-color">Office No</p>
              <p className="fw600 mb-0 ff-heading dark-color">Landmark</p>
            </div>
            <div className="pd-list">
              <p className="text mb10">{getSafeValue(data?.zone)}</p>
              <p className="text mb10">{getSafeValue(data?.locationInside)}</p>
              <p className="text mb10">{getSafeValue(data?.officeNo)}</p>
              <p className="text mb-0">{getSafeValue(data?.landmark)}</p>
            </div>
          </div>
        </div>
        {/* End col */}

        <div className="col-md-12">
          <iframe
            className="position-relative bdrs12 mt30 h250"
            loading="lazy"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              getMapQuery()
            )}&t=m&z=14&output=embed&iwloc=near`}
            title={getMapQuery()}
            aria-label={getMapQuery()}
            onError={(e) => {
              console.error("Error loading map:", e);
              e.target.style.display = "none";
            }}
          />
        </div>
        {/* End col */}
      </>
    );
  } catch (error) {
    console.error("Error rendering PropertyAddress:", error);
    return (
      <div className="col-md-12">
        <p className="text-muted">Address information not available</p>
      </div>
    );
  }
};

export default PropertyAddress;
