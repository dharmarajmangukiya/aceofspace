const OverView = ({ propertyDetail }) => {
  const data = propertyDetail || {};

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="col-md-12">
        <p className="text-muted">Property overview not available</p>
      </div>
    );
  }

  const getSafeValue = (value, fallback = "N/A") => {
    try {
      if (value === null || value === undefined) return fallback;
      if (typeof value === "string" && value.trim() === "") return fallback;
      return String(value).trim();
    } catch (error) {
      console.error("Error getting safe value:", error);
      return fallback;
    }
  };

  const getSafeNumber = (value, fallback = "N/A") => {
    try {
      if (value === null || value === undefined) return fallback;
      const num = Number(value);
      return isNaN(num) ? fallback : num;
    } catch (error) {
      console.error("Error getting safe number:", error);
      return fallback;
    }
  };

  const getAreaValue = (area) => {
    try {
      const num = getSafeNumber(area);
      return num !== "N/A" ? `${num} sqft` : "N/A";
    } catch (error) {
      console.error("Error formatting area:", error);
      return "N/A";
    }
  };

  const getHeightValue = (height) => {
    try {
      const num = getSafeNumber(height);
      return num !== "N/A" ? `${num} mm` : "N/A";
    } catch (error) {
      console.error("Error formatting height:", error);
      return "N/A";
    }
  };

  const getParkingValue = () => {
    try {
      const covered = getSafeNumber(data?.coveredParking, 0);
      const open = getSafeNumber(data?.openParking, 0);
      if (covered === "N/A" && open === "N/A") return "N/A";
      const total =
        (covered === "N/A" ? 0 : covered) + (open === "N/A" ? 0 : open);
      return total > 0 ? `${total} spaces` : "N/A";
    } catch (error) {
      console.error("Error formatting parking:", error);
      return "N/A";
    }
  };

  const getOverviewData = () => {
    try {
      const isCommercial = data?.propertyType === "commercial";

      if (isCommercial) {
        return [
          {
            icon: "flaticon-expand",
            label: "Carpet Area",
            value: getAreaValue(data?.carpetArea),
          },
          {
            icon: "flaticon-expand",
            label: "Built-up Area",
            value: getAreaValue(data?.builtUpArea),
          },
          {
            icon: "flaticon-expand",
            label: "Super Built-up",
            value: getAreaValue(data?.superBuiltUpArea),
          },
          {
            icon: "flaticon-expand",
            label: "Clear Height",
            value: getHeightValue(data?.clearHeight),
          },
          {
            icon: "flaticon-garage",
            label: "Parking",
            value: getParkingValue(),
            xs: true,
          },
          {
            icon: "flaticon-home-1",
            label: "Property Type",
            value: getSafeValue(data?.subType || data?.propertyType),
            xs: true,
          },
          {
            icon: "flaticon-event",
            label: "Age of Property",
            value: getSafeValue(data?.ageOfProperty),
          },
          {
            icon: "flaticon-share-1",
            label: "Entrance Width",
            value: getHeightValue(data?.entranceWidth),
          },
        ];
      } else {
        // Residential property overview
        return [
          {
            icon: "flaticon-bed",
            label: "Bedrooms",
            value: getSafeValue(data?.bedrooms),
          },
          {
            icon: "flaticon-shower",
            label: "Bathrooms",
            value: getSafeValue(data?.bathrooms),
          },
          {
            icon: "flaticon-bed",
            label: "Balconies",
            value: getSafeValue(data?.balconies),
          },
          {
            icon: "flaticon-expand",
            label: "Carpet Area",
            value: getAreaValue(data?.carpetArea),
          },
          {
            icon: "flaticon-garage",
            label: "Parking",
            value: getParkingValue(),
            xs: true,
          },
          {
            icon: "flaticon-home-1",
            label: "Property Type",
            value: getSafeValue(data?.subType || data?.propertyType),
            xs: true,
          },
          {
            icon: "flaticon-event",
            label: "Age of Property",
            value: getSafeValue(data?.ageOfProperty),
          },
        ];
      }
    } catch (error) {
      console.error("Error getting overview data:", error);
      return [];
    }
  };

  const overviewData = getOverviewData();

  try {
    if (!overviewData || overviewData.length === 0) {
      return (
        <div className="col-md-12">
          <p className="text-muted">Property overview not available</p>
        </div>
      );
    }

    return (
      <>
        {overviewData.map((item, index) => {
          try {
            return (
              <div
                key={index}
                className={`col-sm-6 col-lg-4 ${item?.xs ? "mb25-xs" : "mb25"}`}
              >
                <div className="overview-element d-flex align-items-center">
                  <span className={`icon ${item?.icon || "flaticon-home-1"}`} />
                  <div className="ml15">
                    <h6 className="mb-0">{item?.label || "N/A"}</h6>
                    <p className="text mb-0 fz15">{item?.value || "N/A"}</p>
                  </div>
                </div>
              </div>
            );
          } catch (error) {
            console.error(`Error rendering overview item ${index}:`, error);
            return null;
          }
        })}
      </>
    );
  } catch (error) {
    console.error("Error rendering OverView:", error);
    return (
      <div className="col-md-12">
        <p className="text-muted">Property overview not available</p>
      </div>
    );
  }
};

export default OverView;
