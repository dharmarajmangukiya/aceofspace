# Step Navigation Components

A collection of reusable step navigation components for multi-step forms and wizards.

## Components

### 1. StepNavigation

The main step indicator component with progress bar and step circles.

### 2. StepNavigationButtons

Navigation buttons for moving between steps.

### 3. StepFormWrapper

A complete wrapper that combines both navigation and buttons.

## Usage Examples

### Basic Step Navigation

```jsx
import { StepNavigation } from "../common/StepNavigation";

const steps = [
  { id: 1, title: "Personal Info" },
  { id: 2, title: "Contact Details" },
  { id: 3, title: "Preferences" },
  { id: 4, title: "Review" },
];

<StepNavigation
  steps={steps}
  currentStep={2}
  onStepClick={(stepId) => setCurrentStep(stepId)}
  showProgressBar={true}
  showStepNumbers={true}
  showStepTitles={true}
/>;
```

### Step Navigation Buttons

```jsx
import { StepNavigationButtons } from "../common/StepNavigation";

<StepNavigationButtons
  currentStep={2}
  totalSteps={4}
  onPrevious={() => setCurrentStep(currentStep - 1)}
  onNext={() => setCurrentStep(currentStep + 1)}
  onBack={() => navigate("/")}
  onSubmit={() => handleSubmit()}
  previousText="Previous"
  nextText="Next"
  backText="Cancel"
  submitText="Complete"
  buttonSize="medium" // small, medium, large
/>;
```

### Complete Step Form Wrapper

```jsx
import { StepFormWrapper } from "../common/StepNavigation";

const steps = [
  { id: 1, title: "Address", component: AddressStep },
  { id: 2, title: "Details", component: DetailsStep },
  { id: 3, title: "Review", component: ReviewStep },
];

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
  buttonSize="medium"
  wrapperClassName="custom-wrapper"
  navigationClassName="custom-nav"
  buttonsClassName="custom-buttons"
  contentClassName="custom-content"
>
  <div className="step-content">{/* Your step content here */}</div>
</StepFormWrapper>;
```

## Props

### StepNavigation Props

- `steps` (array, required): Array of step objects with id and title
- `currentStep` (number, required): Current active step number
- `onStepClick` (function, optional): Callback when step is clicked
- `showProgressBar` (boolean, default: true): Show progress bar
- `showStepNumbers` (boolean, default: true): Show step numbers in circles
- `showStepTitles` (boolean, default: true): Show step titles
- `className` (string, optional): Additional CSS classes

### StepNavigationButtons Props

- `currentStep` (number, required): Current step number
- `totalSteps` (number, required): Total number of steps
- `onPrevious` (function, optional): Previous button handler
- `onNext` (function, optional): Next button handler
- `onBack` (function, optional): Back button handler
- `onSubmit` (function, optional): Submit button handler
- `showBackButton` (boolean, default: true): Show back button
- `showPreviousButton` (boolean, default: true): Show previous button
- `showNextButton` (boolean, default: true): Show next button
- `showSubmitButton` (boolean, default: true): Show submit button
- `buttonSize` (string, default: "medium"): Button size (small, medium, large)
- `className` (string, optional): Additional CSS classes

### StepFormWrapper Props

All props from both StepNavigation and StepNavigationButtons, plus:

- `children` (node, required): Step content to render
- `wrapperClassName` (string, optional): Wrapper CSS classes
- `navigationClassName` (string, optional): Navigation CSS classes
- `buttonsClassName` (string, optional): Buttons CSS classes
- `contentClassName` (string, optional): Content CSS classes

## Styling

The components use CSS classes that are defined in `custom-styles.scss`:

- `.step-navigation-wrapper`
- `.step-indicators`
- `.step-indicator`
- `.step-navigation-buttons`
- `.step-btn`

You can customize the appearance by overriding these classes or using the className props.

## Features

- ✅ Responsive design
- ✅ Smooth animations
- ✅ Customizable button sizes
- ✅ Optional progress bar
- ✅ Clickable step navigation
- ✅ Icon support
- ✅ Custom text labels
- ✅ Flexible styling options
- ✅ TypeScript support (via PropTypes)
