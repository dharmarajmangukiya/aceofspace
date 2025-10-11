"use client";
import { useAddProperty } from "@/hooks/api/property";
import { addPropertyTypes } from "@/utils/constants";
import { cleanPayload, customSelectStyles } from "@/utils/helper";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import CommercialForm from "./commercial/CommercialForm";
import {
  convertToFormData,
  getInitialValues,
  validationSchema,
} from "./formConfig";
import ResidentialForm from "./residential/ResidentialForm";

const AddPropertyTabContent = () => {
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [selectedSubType, setSelectedSubType] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const { mutate: addProperty, isPending: isAddingProperty } = useAddProperty();

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

  const formik = useFormik({
    initialValues: getInitialValues(selectedPropertyType?.id, selectedSubType),
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const formData = convertToFormData(cleanPayload(values));

        await new Promise((resolve, reject) => {
          addProperty(formData, {
            onSuccess: (response) => {
              toast.success("Property added successfully!");
              resetForm();
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
        });
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

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
                  Complete the form below to list your property
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
                      isDisabled={currentStep !== 1}
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
                        const newSubType = e?.value ?? "";
                        handleSubTypeChange(newSubType);
                        formik.resetForm();
                        setCurrentStep(1);
                        formik.setFieldValue("subType", newSubType);
                      }}
                    />
                  </div>

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

                  {/* Debug button to test validation */}
                  <button
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
                  </button>
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
        />
      ) : (
        <CommercialForm
          subType={selectedSubType}
          onBackToSelection={handleBackToSelection}
          formikProps={formik}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      )}
    </div>
  );
};

export default AddPropertyTabContent;
