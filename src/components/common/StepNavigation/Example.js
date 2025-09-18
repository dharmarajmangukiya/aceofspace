import { useState } from "react";
import { StepFormWrapper } from "./index";

// Example step components
const Step1 = () => (
  <div className="p-4">
    <h3>Step 1: Personal Information</h3>
    <p>Enter your personal details here.</p>
    <div className="form-group">
      <label>Name:</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter your name"
      />
    </div>
  </div>
);

const Step2 = () => (
  <div className="p-4">
    <h3>Step 2: Contact Details</h3>
    <p>Provide your contact information.</p>
    <div className="form-group">
      <label>Email:</label>
      <input
        type="email"
        className="form-control"
        placeholder="Enter your email"
      />
    </div>
  </div>
);

const Step3 = () => (
  <div className="p-4">
    <h3>Step 3: Preferences</h3>
    <p>Set your preferences and settings.</p>
    <div className="form-group">
      <label>Theme:</label>
      <select className="form-control">
        <option>Light</option>
        <option>Dark</option>
      </select>
    </div>
  </div>
);

const Step4 = () => (
  <div className="p-4">
    <h3>Step 4: Review & Submit</h3>
    <p>Review your information and submit the form.</p>
    <div className="alert alert-info">
      <strong>Ready to submit!</strong> Please review all information before
      proceeding.
    </div>
  </div>
);

const StepNavigationExample = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const steps = [
    { id: 1, title: "Personal Info", component: Step1 },
    { id: 2, title: "Contact Details", component: Step2 },
    { id: 3, title: "Preferences", component: Step3 },
    { id: 4, title: "Review", component: Step4 },
  ];

  const handleStepClick = (stepId) => {
    setCurrentStep(stepId);
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    // Navigate back to previous page or reset form
    console.log("Back to previous page");
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };

  const CurrentStepComponent = steps.find(
    (step) => step.id === currentStep
  )?.component;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="text-center mb-4">Step Navigation Example</h2>

          <StepFormWrapper
            steps={steps}
            currentStep={currentStep}
            onStepClick={handleStepClick}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onBack={handleBack}
            onSubmit={handleSubmit}
            showProgressBar={true}
            showStepNumbers={true}
            showStepTitles={true}
            showBackButton={true}
            showPreviousButton={true}
            showNextButton={true}
            showSubmitButton={true}
            previousText="Previous"
            nextText="Next"
            backText="Cancel"
            submitText="Submit Form"
            buttonSize="medium"
            wrapperClassName="mb-5"
            contentClassName="bg-white rounded shadow-sm"
          >
            <div className="p-4">
              {CurrentStepComponent && <CurrentStepComponent />}
            </div>
          </StepFormWrapper>
        </div>
      </div>
    </div>
  );
};

export default StepNavigationExample;
