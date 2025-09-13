"use client";
import { customSelectStyles } from "@/utilis/helper";
import { useState } from "react";
import Select from "react-select";
import CommercialForm from "./commercial/CommercialForm";
import ResidentialForm from "./residential/ResidentialForm";

const AddPropertyTabContent = () => {
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [selectedSubType, setSelectedSubType] = useState("");

  const propertyTypes = [
    {
      id: "residential",
      title: "Residential",
      description: "Flats, Bungalows, Houses, Villas",
      icon: "🏠",
      subTypes: ["Flat", "Bungalow", "House", "Villa"],
    },
    {
      id: "commercial",
      title: "Commercial",
      description: "Offices, Shops, Warehouses, Showrooms",
      icon: "🏢",
      subTypes: ["Office", "Shop", "Warehouse", "Showroom"],
    },
  ];

  const handlePropertyTypeSelect = (propertyType) => {
    setSelectedPropertyType(propertyType);
    setSelectedSubType(propertyType.subTypes[0]);
  };

  const handleBackToSelection = () => {
    setSelectedPropertyType(null);
    setSelectedSubType("");
  };

  const handleSubTypeChange = (subType) => {
    setSelectedSubType(subType);
  };

  if (!selectedPropertyType) {
    return (
      <div className="property-type-selection">
        <div className="row">
          <div className="col-12">
            <div className="text-center mb-4">
              <h3 className="mb-2">Select Property Type</h3>
              <p className="text-muted">
                Choose the type of property you want to add
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          {propertyTypes.map((type) => (
            <div key={type.id} className="col-lg-5 col-md-6 mb30">
              <button
                className="card h-100 property-type-card w-100 text-start"
                style={{
                  transition: "all 0.3s ease",
                  border: "2px solid #e9ecef",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transition =
                    "all 0.25s cubic-bezier(0.4,0,0.2,1)";
                  e.currentTarget.style.borderColor =
                    "var(--primary-color, #eb6753)";
                  e.currentTarget.style.transform =
                    "translateY(-6px) scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 32px rgba(235, 103, 83, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e9ecef";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                onClick={() => handlePropertyTypeSelect(type)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handlePropertyTypeSelect(type);
                  }
                }}
                type="button"
              >
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <span style={{ fontSize: "3rem" }}>{type.icon}</span>
                  </div>
                  <h4 className="card-title mb-2">{type.title}</h4>
                  <p className="card-text text-muted">{type.description}</p>
                  <div className="mt-3">
                    <small className="text-primary">Click to select</small>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="property-form-container">
      {/* Header with property type and sub-type selection */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="p30 d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-1">
                {selectedPropertyType.title} Property - {selectedSubType}
              </h4>
              <p className="text-muted mb-0">Add your property details</p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div>
                <label htmlFor="subTypeSelect" className="form-label small">
                  Sub-type:
                </label>
                <Select
                  options={selectedPropertyType.subTypes.map((subType) => ({
                    value: subType,
                    label: subType,
                  }))}
                  id="subTypeSelect"
                  styles={customSelectStyles}
                  className="select-custom"
                  value={{
                    value: selectedSubType,
                    label: selectedSubType,
                  }}
                  onChange={(e) => handleSubTypeChange(e?.value ?? "")}
                />
              </div>
              {/* <div className="btn-area">
              </div> */}
              <button
                className="ud-btn btn-thm btn-sm p-1"
                onClick={handleBackToSelection}
              >
                Back to Selection
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Render appropriate form based on property type */}
      {selectedPropertyType.id === "residential" ? (
        <ResidentialForm
          subType={selectedSubType}
          onBackToSelection={handleBackToSelection}
        />
      ) : (
        <CommercialForm
          subType={selectedSubType}
          onBackToSelection={handleBackToSelection}
        />
      )}
    </div>
  );
};

export default AddPropertyTabContent;
