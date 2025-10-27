"use client";
import { useAddProperty, useUpdateProperty } from "@/hooks/api/property";
import { addPropertyTypes } from "@/utils/constants";
import { cleanPayload, customSelectStyles } from "@/utils/helper";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import CommercialForm from "./commercial/CommercialForm";
import {
  convertToFormData,
  getInitialValues,
  validationSchema,
} from "./formConfig";
import ResidentialForm from "./residential/ResidentialForm";

// Helper function to transform property data to initial form values
const transformPropertyToInitialValues = (propertyData) => {
  if (!propertyData || !propertyData.id) return null;

  // Handle area - convert to object format if needed
  let areaValue = "";
  if (propertyData.latitude && propertyData.longitude) {
    // Use areaFromGoogle if available, otherwise use address
    const areaText = propertyData.areaFromGoogle || propertyData.address || "";
    areaValue = {
      placeId: propertyData.areaFromGoogle
        ? undefined
        : `place_${propertyData.id}`,
      placeName: areaText,
      formattedAddress: areaText,
      coordinates: {
        lat: parseFloat(propertyData.latitude),
        lng: parseFloat(propertyData.longitude),
      },
    };
  }

  // Parse JSON strings
  const parseJsonField = (field) => {
    if (!field) return [];
    try {
      return typeof field === "string" ? JSON.parse(field) : field;
    } catch {
      return [];
    }
  };

  const facilities = parseJsonField(propertyData.facilities);
  const amenities = parseJsonField(propertyData.amenities);
  const otherRooms = parseJsonField(propertyData.otherRooms);
  const suitableBusinessTypes = parseJsonField(
    propertyData.suitableBusinessTypes
  );
  const additionalPricing = parseJsonField(propertyData.additionalPricing);

  // Base values
  const baseValues = {
    propertyType: propertyData.propertyType || "",
    subType: propertyData.subType || "",
    city: propertyData.city || "",
    state: propertyData.state || "",
    pincode: propertyData.pincode?.toString() || "",
    area: areaValue || "",
    landmark: propertyData.landmark || "",
    ageOfProperty: propertyData.ageOfProperty || "",
    availableFrom: propertyData.availableFrom || "",
    video: propertyData.video || [],
    carpetArea: propertyData.carpetArea?.toString() || "",
    builtUpArea: propertyData.builtUpArea?.toString() || "",
    clearHeight: propertyData.clearHeight?.toString() || "",
    totalFloors: propertyData.totalFloors?.toString() || "",
    propertyOnFloor: propertyData.propertyOnFloor?.toString() || "",
    maintenance: propertyData.maintenance || "",
    securityDeposit: propertyData.securityDeposit || "",
    maintenancePeriod: propertyData.maintenancePeriod || "",
    securityDepositAmount: "",
    amenities: amenities,
    facilities: facilities,
    description: propertyData.description || "",
    address: propertyData.address || "",
    // Existing images
    existingImages: propertyData.images || [],
  };

  // Residential specific values
  if (propertyData.propertyType === "residential") {
    return {
      ...baseValues,
      houseNo: propertyData.houseNo || "",
      apartmentName: propertyData.apartmentName || "",
      bedrooms: propertyData.bedrooms?.toString() || "",
      bathrooms: propertyData.bathrooms?.toString() || "",
      balconies: propertyData.balconies?.toString() || "",
      livingRooms: propertyData.livingRooms?.toString() || "",
      otherRooms: otherRooms,
      furnishing: propertyData.furnishing || "",
      specifications: propertyData.specifications || "",
      expectedRent: propertyData.expectedRent?.toString() || "",
      priceNegotiation: propertyData.priceNegotiation || false,
      bookingAmount: propertyData.bookingAmount?.toString() || "",
      membershipCharge: propertyData.membershipCharge?.toString() || "",
      durationOfAgreement: propertyData.durationOfAgreement || "",
      noticePeriod: propertyData.noticePeriod || "",
      coveredParking: propertyData.coveredParking?.toString() || "",
      openParking: propertyData.openParking?.toString() || "",
      facing: propertyData.facing || "",
      facingDetails: propertyData.facingDetails || "",
    };
  }

  // Commercial specific values
  if (propertyData.propertyType === "commercial") {
    return {
      ...baseValues,
      buildingName: propertyData.buildingName || "",
      officeNo: propertyData.officeNo || "",
      zone: propertyData.zone || "",
      locationInside: propertyData.locationInside || "",
      superBuiltUpArea: propertyData.superBuiltUpArea?.toString() || "",
      entranceWidth: propertyData.entranceWidth?.toString() || "",
      flooring: propertyData.flooring || "",
      lockInPeriod: propertyData.lockInPeriod?.toString() || "",
      noOfCabins: propertyData.noOfCabins?.toString() || "",
      maxSeats: propertyData.maxSeats?.toString() || "",
      meetingRooms: propertyData.meetingRooms?.toString() || "",
      conferenceRooms: propertyData.conferenceRooms?.toString() || "",
      privateWashrooms: propertyData.privateWashrooms?.toString() || "",
      sharedWashrooms: propertyData.sharedWashrooms?.toString() || "",
      receptionArea: propertyData.receptionArea || "",
      pantryType: propertyData.pantryType || "",
      liftsAvailable: propertyData.liftsAvailable || "",
      serviceLiftCount: propertyData.serviceLiftCount?.toString() || "",
      passengerLiftCount: propertyData.passengerLiftCount?.toString() || "",
      expectedLeaseAmount: propertyData.expectedLeaseAmount?.toString() || "",
      ownershipType: propertyData.ownershipType || "",
      fireNocCertified: propertyData.fireNocCertified || "",
      occupancyCertificate: propertyData.occupancyCertificate || "",
      yearlyRentIncrease: propertyData.yearlyRentIncrease?.toString() || "",
      suitableBusinessTypes: suitableBusinessTypes,
      locatedNear: propertyData.locatedNear || "",
      bookingAmount: propertyData.bookingAmount?.toString() || "",
      additionalPricing: additionalPricing,
      parkingType: propertyData.parkingType || "",
      parkingSpaces: propertyData.parkingSpaces?.toString() || "",
      staircases: propertyData.staircases?.toString() || "",
      furnishing: propertyData.furnishing || "",
    };
  }

  return baseValues;
};

const AddPropertyTabContent = ({ propertyData }) => {
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [selectedSubType, setSelectedSubType] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  // Determine if we're in edit mode
  const isEditMode = useMemo(() => {
    return propertyData && propertyData.id;
  }, [propertyData]);

  const { mutate: addProperty } = useAddProperty();
  const { mutate: updateProperty } = useUpdateProperty();

  const handlePropertyTypeSelect = (propertyType) => {
    setSelectedPropertyType(propertyType);
    setSelectedSubType(propertyType.subTypes[0]);
  };

  const handleBackToSelection = () => {
    if (isEditMode) {
      // In edit mode, don't reset the form
      return;
    }
    formik.resetForm();
    setCurrentStep(1);
    setSelectedPropertyType(null);
    setSelectedSubType("");
  };

  const handleSubTypeChange = (subType) => {
    setSelectedSubType(subType);
  };

  // Initialize form values
  const getFormInitialValues = () => {
    if (isEditMode && propertyData) {
      return transformPropertyToInitialValues(propertyData);
    }
    return getInitialValues(selectedPropertyType?.id, selectedSubType);
  };

  // Initialize property type and sub-type in edit mode
  useEffect(() => {
    if (isEditMode && propertyData) {
      const matchingType = addPropertyTypes.find(
        (type) => type.id === propertyData.propertyType
      );
      if (matchingType) {
        setSelectedPropertyType(matchingType);
        setSelectedSubType(propertyData.subType);
      }
    }
  }, [isEditMode, propertyData]);

  const formik = useFormik({
    initialValues: getFormInitialValues(),
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const formData = convertToFormData(cleanPayload(values));

        await new Promise((resolve, reject) => {
          if (isEditMode) {
            // Update existing property
            // Add the id to the FormData
            formData.append("id", propertyData.id);
            updateProperty(formData, {
              onSuccess: (response) => {
                toast.success("Property updated successfully!");
                resolve(response);
              },
              onError: (error) => {
                toast.error(
                  error.response?.data?.message || "Failed to update property"
                );
                reject(error);
              },
            });
          } else {
            // Add new property
            addProperty(formData, {
              onSuccess: (response) => {
                toast.success("Property added successfully!");
                resetForm();
                setCurrentStep(1);
                setSelectedPropertyType(null);
                setSelectedSubType("");
                resolve(response);
              },
              onError: (error) => {
                toast.error(
                  error.response?.data?.message || "Failed to add property"
                );
                reject(error);
              },
            });
          }
        });
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Don't show property type selection in edit mode
  if (!selectedPropertyType && !isEditMode) {
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
          {addPropertyTypes.map((type) => (
            <div key={type.id} className="col-lg-5 col-md-6 mb30">
              <button
                className="card h-100 property-type-card w-100 text-start"
                onClick={() => handlePropertyTypeSelect(type)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handlePropertyTypeSelect(type);
                  }
                }}
                type="button"
              >
                <div className="card-body">
                  <span className="property-icon">{type.icon}</span>
                  <h4 className="card-title">{type.title}</h4>
                  <p className="card-text">{type.description}</p>
                  <small className="selection-hint">Click to select</small>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show loading or empty state if property type not selected in edit mode
  if (!selectedPropertyType && isEditMode) {
    return (
      <div className="text-center p-5">
        <p>Loading property data...</p>
      </div>
    );
  }

  return (
    <div className="property-form-container">
      {/* Header with property type and sub-type selection */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="property-header-card p-4 border-0" style={{}}>
            <div className="row align-items-center">
              <div className=" col-md-7 mb-3 mb-md-0">
                <div className="d-flex align-items-center mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <span style={{ fontSize: "18px" }}>
                      {selectedPropertyType.icon}
                    </span>
                    <h4 className="mb-0 fw-bold" style={{ color: "#2c3e50" }}>
                      {selectedPropertyType.title} - {selectedSubType}
                    </h4>
                  </div>
                </div>

                <p className="text-muted mb-0 fs-6">
                  {isEditMode
                    ? "Update your property details below"
                    : "Complete the form below to list your property"}
                </p>
              </div>

              <div className=" col-md-5">
                <div className="d-flex flex-wrap flex-column flex-md-row gap-3 align-items-md-end">
                  <div className="flex-grow-1">
                    <label
                      htmlFor="subTypeSelect"
                      className="form-label fw-semibold mb-2 text-nowrap"
                      style={{ color: "#495057" }}
                    >
                      Property Sub-type
                    </label>
                    <Select
                      isDisabled={currentStep !== 1 || isEditMode}
                      options={selectedPropertyType.subTypes.map((subType) => ({
                        value: subType,
                        label: subType,
                      }))}
                      id="subTypeSelect"
                      styles={{
                        ...customSelectStyles,
                        control: (provided) => ({
                          ...provided,
                          minHeight: "45px",
                          border: "2px solid #e9ecef",
                          borderRadius: "8px",
                          "&:hover": {
                            borderColor: "var(--primary-color, #eb6753)",
                          },
                          "&:focus-within": {
                            borderColor: "var(--primary-color, #eb6753)",
                            boxShadow: "0 0 0 0.2rem rgba(235, 103, 83, 0.25)",
                          },
                        }),
                      }}
                      className="select-custom"
                      value={{
                        value: selectedSubType,
                        label: selectedSubType,
                      }}
                      onChange={(e) => {
                        if (isEditMode) return;
                        const newSubType = e?.value ?? "";
                        handleSubTypeChange(newSubType);
                        formik.resetForm();
                        setCurrentStep(1);
                        formik.setFieldValue("subType", newSubType);
                      }}
                    />
                  </div>

                  {!isEditMode && (
                    <button
                      className="ud-btn btn-thm d-flex align-items-center gap-2"
                      onClick={handleBackToSelection}
                      style={{
                        borderRadius: "8px",
                        fontWeight: "600",
                        minHeight: "45px",
                        padding: "10px 16px",
                        transition: "all 0.3s ease",
                        whiteSpace: "nowrap",
                        minWidth: "fit-content",
                      }}
                    >
                      <i className="fas fa-arrow-left"></i>
                      Back to Selection
                    </button>
                  )}

                  {/* Debug button to test validation */}
                  {/* <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      formik.handleSubmit();
                      console.log("Form errors:", formik.errors);
                      console.log("Form values:", formik.values);
                      console.log("Touched fields:", formik.touched);
                    }}
                    style={{
                      borderRadius: "8px",
                      fontWeight: "600",
                      minHeight: "45px",
                      padding: "10px 16px",
                      marginLeft: "10px",
                    }}
                  >
                    Debug Validation
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render appropriate form based on property type */}
      {selectedPropertyType.id === "residential" ? (
        <ResidentialForm
          subType={selectedSubType}
          onBackToSelection={handleBackToSelection}
          formikProps={formik}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          isEditMode={isEditMode}
        />
      ) : (
        <CommercialForm
          subType={selectedSubType}
          onBackToSelection={handleBackToSelection}
          formikProps={formik}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          isEditMode={isEditMode}
        />
      )}
    </div>
  );
};

export default AddPropertyTabContent;
