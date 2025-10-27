import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getStepErrorCount,
  validateAllSteps,
  validateStep,
} from "../stepValidation";
import AddressStep from "./components/AddressStep";
import MediaStep from "./components/MediaStep";
import PricingDetailsStep from "./components/PricingDetailsStep";
import PropertyDetailsStep from "./components/PropertyDetailsStep";

const CommercialForm = ({
  subType,
  onBackToSelection,
  formikProps,
  currentStep,
  setCurrentStep,
  isEditMode = false,
}) => {
  const {
    values,
    setFieldValue,
    isSubmitting,
    errors,
    touched,
    handleSubmit,
    setFieldTouched,
  } = formikProps;

  // Track visited steps
  const [visitedSteps, setVisitedSteps] = useState(new Set([1]));

  // Mark current step as visited
  useEffect(() => {
    setVisitedSteps((prev) => new Set([...prev, currentStep]));
  }, [currentStep]);

  // Reset visited steps when form is reset (currentStep goes back to 1)
  useEffect(() => {
    if (currentStep === 1) {
      setVisitedSteps(new Set([1]));
    }
  }, [subType]); // Reset when subType changes or form is reinitialized

  // All commercial properties have 4 steps
  const steps = [
    { id: 1, title: "Address", component: AddressStep },
    { id: 2, title: "Property Details", component: PropertyDetailsStep },
    { id: 3, title: "Media", component: MediaStep },
    { id: 4, title: "Add Pricing & Details", component: PricingDetailsStep },
  ];

  const totalSteps = steps.length;

  const handleNext = async () => {
    // Validate current step before proceeding
    const isValid = await validateStep(formikProps, currentStep, "commercial");

    if (!isValid) {
      toast.error(
        "Please fill all required fields in this step before proceeding"
      );
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = async (stepNumber) => {
    // Allow backward navigation without validation
    if (stepNumber < currentStep) {
      setCurrentStep(stepNumber);
      return;
    }

    // For forward navigation, validate current step
    if (stepNumber > currentStep) {
      const isValid = await validateStep(
        formikProps,
        currentStep,
        "commercial"
      );

      if (!isValid) {
        toast.error(
          "Please fill all required fields in the current step before proceeding"
        );
        return;
      }
    }

    setCurrentStep(stepNumber);
  };

  const handleFormDataChange = (stepData) => {
    // Update Formik values instead of local state
    Object.keys(stepData).forEach((key) => {
      setFieldValue(key, stepData[key]);
    });
  };

  const CurrentStepComponent = steps.find(
    (step) => step.id === currentStep
  )?.component;

  return (
    <div className="commercial-form">
      {/* Step Navigation */}
      <nav className="mb-4">
        <div className="nav nav-tabs" id="commercial-tab" role="tablist">
          {steps.map((step) => {
            const errorCount = getStepErrorCount(errors, step.id, "commercial");
            const isVisited = visitedSteps.has(step.id);
            const showError = errorCount > 0 && isVisited;

            return (
              <button
                key={step.id}
                className={`nav-link ${
                  currentStep === step.id ? "active" : ""
                } fw600 ${showError ? "text-danger" : ""}`}
                id={`step-${step.id}-tab`}
                onClick={() => handleStepClick(step.id)}
                type="button"
                role="tab"
                aria-controls={`step-${step.id}`}
                aria-selected={currentStep === step.id}
              >
                Step {step.id}: {step.title}
                {showError && (
                  <span className="badge bg-danger ms-2">{errorCount}</span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Step Content */}
      <div className="tab-content" id="commercial-tabContent">
        <div className="tab-pane fade show active">
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            {CurrentStepComponent && (
              <CurrentStepComponent
                formData={values}
                onDataChange={handleFormDataChange}
                subType={subType}
                errors={errors}
                touched={touched}
                setFieldTouched={setFieldTouched}
              />
            )}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="row">
        <div className="col-12">
          <div className="p30 pt0 d-flex justify-content-between">
            <button
              className="reset-button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </button>

            <div className="d-flex gap-2">
              <button className="reset-button" onClick={onBackToSelection}>
                Back to Selection
              </button>

              {currentStep < totalSteps ? (
                <button className="ud-btn btn-thm" onClick={handleNext}>
                  Next
                </button>
              ) : (
                <button
                  className="ud-btn btn-thm"
                  type="button"
                  onClick={async () => {
                    // Validate all steps before submission
                    const { isValid, firstInvalidStep } =
                      await validateAllSteps(
                        formikProps,
                        totalSteps,
                        "commercial"
                      );
                    console.log("errors", errors);

                    if (!isValid) {
                      toast.error(
                        "Please fill all required fields in this step before proceeding"
                      );
                      setCurrentStep(firstInvalidStep);
                      return;
                    }

                    handleSubmit();
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : isEditMode
                    ? "Update Property"
                    : "Submit Property"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CommercialForm.propTypes = {
  subType: PropTypes.string.isRequired,
  onBackToSelection: PropTypes.func.isRequired,
  formikProps: PropTypes.shape({
    values: PropTypes.object.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
  }).isRequired,
  isEditMode: PropTypes.bool,
};

export default CommercialForm;
