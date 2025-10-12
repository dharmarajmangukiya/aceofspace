import PropTypes from "prop-types";
import AddressStep from "./components/AddressStep";
import AgreementTypeStep from "./components/AgreementTypeStep";
import AreaDetailsStep from "./components/AreaDetailsStep";
import MediaStep from "./components/MediaStep";
import OtherDetailsStep from "./components/OtherDetailsStep";
import RentDetailsStep from "./components/RentDetailsStep";
import RoomDetailsStep from "./components/RoomDetailsStep";

const ResidentialForm = ({
  subType,
  onBackToSelection,
  formikProps,
  currentStep,
  setCurrentStep,
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

  // Define steps - ALL residential subtypes use the same 7 steps
  const getSteps = () => {
    return [
      { id: 1, title: "Address", component: AddressStep },
      { id: 2, title: "Room Details", component: RoomDetailsStep },
      { id: 3, title: "Area Details", component: AreaDetailsStep },
      { id: 4, title: "Rent Details", component: RentDetailsStep },
      {
        id: 5,
        title: "Preferred Agreement Type",
        component: AgreementTypeStep,
      },
      { id: 6, title: "Media", component: MediaStep },
      { id: 7, title: "Other Details", component: OtherDetailsStep },
    ];
  };

  const steps = getSteps();
  const totalSteps = steps.length;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepNumber) => {
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
    <div className="residential-form">
      {/* Step Navigation */}
      <nav className="mb-4">
        <div
          className="flex-nowrap overflow-auto nav nav-tabs elegant-scrollbar pb-1"
          id="residential-tab"
          role="tablist"
        >
          {steps.map((step) => (
            <button
              key={step.id}
              className={`text-nowrap nav-link ${
                currentStep === step.id ? "active" : ""
              } fw600`}
              id={`step-${step.id}-tab`}
              onClick={() => handleStepClick(step.id)}
              type="button"
              role="tab"
              aria-controls={`step-${step.id}`}
              aria-selected={currentStep === step.id}
            >
              Step {step.id}: {step.title}
            </button>
          ))}
        </div>
      </nav>

      {/* Step Content */}
      <div className="tab-content" id="residential-tabContent">
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
                  onClick={() => {
                    handleSubmit();
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Property"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ResidentialForm.propTypes = {
  subType: PropTypes.string.isRequired,
  onBackToSelection: PropTypes.func.isRequired,
  formikProps: PropTypes.shape({
    values: PropTypes.object.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ResidentialForm;
