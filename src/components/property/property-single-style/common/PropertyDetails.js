const PropertyDetails = ({ propertyDetail }) => {
  const data = propertyDetail || {};

  const getPropertySize = () => {
    try {
      if (data?.carpetArea && typeof data.carpetArea === "number") {
        return `${data.carpetArea} Sq Ft`;
      }
      if (data?.builtUpArea && typeof data.builtUpArea === "number") {
        return `${data.builtUpArea} Sq Ft`;
      }
      if (data?.superBuiltUpArea && typeof data.superBuiltUpArea === "number") {
        return `${data.superBuiltUpArea} Sq Ft`;
      }
      return "Not specified";
    } catch (error) {
      console.error("Error getting property size:", error);
      return "Not specified";
    }
  };

  const getPrice = () => {
    try {
      if (data?.expectedRent && typeof data.expectedRent === "number") {
        return `₹${data.expectedRent.toLocaleString()}/Month`;
      }
      if (data?.bookingAmount && typeof data.bookingAmount === "number") {
        return `₹${data.bookingAmount.toLocaleString()}`;
      }
      return "Price on Request";
    } catch (error) {
      console.error("Error getting price:", error);
      return "Price on Request";
    }
  };

  const getParking = () => {
    try {
      const covered = Number(data?.coveredParking) || 0;
      const open = Number(data?.openParking) || 0;
      const total = covered + open;
      return total > 0
        ? `${total} (${covered} covered, ${open} open)`
        : "Not specified";
    } catch (error) {
      console.error("Error getting parking info:", error);
      return "Not specified";
    }
  };

  const getBathrooms = () => {
    try {
      if (data?.bathrooms && typeof data.bathrooms === "number") {
        return data.bathrooms.toString();
      }
      if (data?.sharedWashrooms && typeof data.sharedWashrooms === "number") {
        return data.sharedWashrooms.toString();
      }
      return "N/A";
    } catch (error) {
      console.error("Error getting bathrooms:", error);
      return "N/A";
    }
  };

  const getBedrooms = () => {
    try {
      if (data?.bedrooms && typeof data.bedrooms === "number") {
        return data.bedrooms.toString();
      }
      return "N/A";
    } catch (error) {
      console.error("Error getting bedrooms:", error);
      return "N/A";
    }
  };

  const getClearHeight = () => {
    try {
      if (data?.clearHeight && typeof data.clearHeight === "number") {
        return `${data.clearHeight} mm`;
      }
      return "N/A";
    } catch (error) {
      console.error("Error getting clear height:", error);
      return "N/A";
    }
  };

  const getPropertyId = () => {
    try {
      return data?.id ? String(data.id) : "N/A";
    } catch (error) {
      console.error("Error getting property ID:", error);
      return "N/A";
    }
  };

  const getPropertyType = () => {
    try {
      return data?.subType || data?.propertyType || "N/A";
    } catch (error) {
      console.error("Error getting property type:", error);
      return "N/A";
    }
  };

  const getPropertyStatus = () => {
    try {
      return data?.status || "N/A";
    } catch (error) {
      console.error("Error getting property status:", error);
      return "N/A";
    }
  };

  const getAgeOfProperty = () => {
    try {
      return data?.ageOfProperty || "N/A";
    } catch (error) {
      console.error("Error getting age of property:", error);
      return "N/A";
    }
  };

  const columns = [
    [
      {
        label: "Property ID",
        value: getPropertyId(),
      },
      {
        label: "Price",
        value: getPrice(),
      },
      {
        label: "Property Size",
        value: getPropertySize(),
      },
      {
        label: "Bathrooms",
        value: getBathrooms(),
      },
      {
        label: "Bedrooms",
        value: getBedrooms(),
      },
    ],
    [
      {
        label: "Parking",
        value: getParking(),
      },
      {
        label: "Clear Height",
        value: getClearHeight(),
      },
      {
        label: "Age of Property",
        value: getAgeOfProperty(),
      },
      {
        label: "Property Type",
        value: getPropertyType(),
      },
      {
        label: "Property Status",
        value: getPropertyStatus(),
      },
    ],
  ];

  try {
    return (
      <div className="row">
        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className={`col-md-6 col-xl-4${
              columnIndex === 1 ? " offset-xl-2" : ""
            }`}
          >
            {column.map((detail, index) => (
              <div key={index} className="d-flex justify-content-between">
                <div className="pd-list">
                  <p className="fw600 mb10 ff-heading dark-color">
                    {detail?.label || "N/A"}
                  </p>
                </div>
                <div className="pd-list">
                  <p className="text mb10">{detail?.value || "N/A"}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error rendering PropertyDetails:", error);
    return (
      <div className="row">
        <div className="col-md-12">
          <p className="text-muted">Property details not available</p>
        </div>
      </div>
    );
  }
};

export default PropertyDetails;
