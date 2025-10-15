// Field mappings for each step in residential and commercial forms
// This helps validate only the fields relevant to the current step

export const residentialStepFields = {
  1: [
    // Address Step
    "city",
    "state",
    "pincode",
    "area",
    "landmark",
    "houseNo",
    "apartmentName",
    "address",
  ],
  2: [
    // Room Details Step
    "bedrooms",
    "bathrooms",
    "balconies",
    "livingRooms",
    "otherRooms",
  ],
  3: [
    // Area Details Step
    "carpetArea",
    "builtUpArea",
    "clearHeight",
    "totalFloors",
    "propertyOnFloor",
    "furnishing",
    "specifications",
    "availableFrom",
    "ageOfProperty",
  ],
  4: [
    // Rent Details Step
    "expectedRent",
    "maintenance",
    "bookingAmount",
    "membershipCharge",
    "securityDeposit",
    "securityDepositAmount",
    "securityDepositMonths",
    "priceNegotiation",
  ],
  5: ["description"],
  6: [
    // Media Step
    "media",
  ],
  7: [
    // Other Details Step
    "furnishing",
    "specifications",
    "coveredParking",
    "openParking",
    "facing",
    "facingDetails",
    "amenities",
    "description",
  ],
};

export const commercialStepFields = {
  1: [
    // Address Step
    "city",
    "state",
    "pincode",
    "area",
    "landmark",
    "buildingName",
    "officeNo",
    "address",
    "zone",
    "locationInside",
  ],
  2: [
    // Property Details Step - Base fields
    "superBuiltUpArea",
    "carpetArea",
    "builtUpArea",
    "entranceWidth",
    "clearHeight",
    "flooring",
    "totalFloors",
    "propertyOnFloor",
    "ageOfProperty",
    "availableFrom",
    // Office-specific fields (non-showroom)
    "noOfCabins",
    "maxSeats",
    "meetingRooms",
    "conferenceRooms",
    "privateWashrooms",
    "sharedWashrooms",
    "receptionArea",
    "pantryType",
    "staircases",
    "liftsAvailable",
    "serviceLiftCount",
    "passengerLiftCount",
    // Showroom-specific fields
    "locatedNear",
    "suitableBusinessTypes",
  ],
  3: [
    // Media Step
    "media",
    "video",
  ],
  4: [
    // Pricing & Details Step
    "maintenance",
    "securityDeposit",
    "securityDepositAmount",
    "securityDepositMonths",
    "ownershipType",
    "parkingType",
    "parkingSpaces",
    "lockInPeriod",
    "maintenancePeriod",
    "yearlyRentIncrease",
    "facilities",
    "amenities",
    "description",
    "ageOfProperty",
    "availableFrom",
    "fireNocCertified",
    "occupancyCertificate",
    "expectedLeaseAmount",
    "bookingAmount",
  ],
};

/**
 * Validates fields for a specific step
 * @param {Object} formik - Formik instance
 * @param {number} step - Current step number
 * @param {string} formType - 'residential' or 'commercial'
 * @returns {Promise<boolean>} - Returns true if step is valid, false otherwise
 */
export const validateStep = async (formik, step, formType) => {
  const stepFieldsMap =
    formType === "residential" ? residentialStepFields : commercialStepFields;
  const fieldsToValidate = stepFieldsMap[step] || [];

  // First, validate the entire form to get all errors
  const errors = await formik.validateForm();

  // Touch all fields in the current step to show errors
  fieldsToValidate.forEach((field) => {
    formik.setFieldTouched(field, true, false);
  });

  // Check if any of the current step's fields have errors
  const hasErrors = fieldsToValidate.some((field) => {
    return errors[field] !== undefined;
  });

  if (hasErrors) {
    // Extract only the errors for the current step
    const stepErrors = {};
    fieldsToValidate.forEach((field) => {
      if (errors[field]) {
        stepErrors[field] = errors[field];
      }
    });

    console.log(`Step ${step} validation failed:`, stepErrors);
    return false;
  }

  return true;
};

/**
 * Get error count for a specific step
 * @param {Object} errors - Formik errors object
 * @param {number} step - Step number
 * @param {string} formType - 'residential' or 'commercial'
 * @returns {number} - Number of errors in the step
 */
export const getStepErrorCount = (errors, step, formType) => {
  const stepFieldsMap =
    formType === "residential" ? residentialStepFields : commercialStepFields;
  const fieldsToCheck = stepFieldsMap[step] || [];

  return fieldsToCheck.filter((field) => errors[field] !== undefined).length;
};

/**
 * Validates all steps in the form
 * @param {Object} formik - Formik instance
 * @param {number} totalSteps - Total number of steps
 * @param {string} formType - 'residential' or 'commercial'
 * @returns {Promise<{isValid: boolean, firstInvalidStep: number|null}>}
 */
export const validateAllSteps = async (formik, totalSteps, formType) => {
  // Validate entire form
  const errors = await formik.validateForm();

  const stepFieldsMap =
    formType === "residential" ? residentialStepFields : commercialStepFields;

  // Check each step for errors
  for (let step = 1; step <= totalSteps; step++) {
    const fieldsToValidate = stepFieldsMap[step] || [];

    // Touch all fields in this step
    fieldsToValidate.forEach((field) => {
      formik.setFieldTouched(field, true, false);
    });

    // Check if this step has errors
    const hasErrors = fieldsToValidate.some(
      (field) => errors[field] !== undefined
    );

    if (hasErrors) {
      return {
        isValid: false,
        firstInvalidStep: step,
      };
    }
  }

  return {
    isValid: true,
    firstInvalidStep: null,
  };
};
