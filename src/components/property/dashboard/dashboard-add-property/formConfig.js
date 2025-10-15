import * as Yup from "yup";

// Initial values for the form - only fields used in validation schema
export const getInitialValues = (
  propertyType = "residential",
  subType = "Apartment"
) => {
  // --- Common Values ---
  const baseInitials = {
    propertyType: propertyType,
    subType: subType,
    city: "",
    state: "",
    pincode: "",
    area: "",
    landmark: "",
    ageOfProperty: "",
    availableFrom: "",
    media: [],
    video: [],
    carpetArea: "",
    builtUpArea: "",
    clearHeight: "",
    totalFloors: "",
    propertyOnFloor: "",
    maintenance: "",
    securityDeposit: "",
    maintenancePeriod: "",
    securityDepositAmount: "",
    amenities: [],
    facilities: [],
    lockInPeriod: "",
    description: "",
    address: "",
  };

  // --- Residential Fields (from schema) ---
  const residentialSpecific = {
    houseNo: "",
    apartmentName: "",
    bedrooms: "",
    bathrooms: "",
    balconies: "",
    livingRooms: "",
    otherRooms: [],
    furnishing: "",
    specifications: "",
    expectedRent: "",
    priceNegotiation: false,
    bookingAmount: "",
    membershipCharge: "",
    durationOfAgreement: "",
    noticePeriod: "",
    coveredParking: "",
    openParking: "",
    facing: "",
    facingDetails: "",
  };

  // --- Commercial Fields (from schema) ---
  const commercialSpecific = {
    buildingName: "",
    officeNo: "",
    // commercial only fields from schema
    zone: "",
    locationInside: "",
    superBuiltUpArea: "",
    entranceWidth: "",
    flooring: "",
    lockInPeriod: "",
    description: "",
    noOfCabins: "",
    maxSeats: "",
    meetingRooms: "",
    conferenceRooms: "",
    privateWashrooms: "",
    sharedWashrooms: "",
    receptionArea: "",
    pantryType: "",
    serviceLiftCount: "",
    passengerLiftCount: "",
    liftsAvailable: "",
    staircases: "",
    parkingType: "",
    parkingSpaces: "",
    ownershipType: "",
    expectedLeaseAmount: "",
    securityDepositMonths: "",
    yearlyRentIncrease: "",
    fireNocCertified: "",
    occupancyCertificate: "",
    suitableBusinessTypes: [],
    locatedNear: "",
    furnishing: "",
    additionalPricing: [],
    maintenancePeriod: "Monthly",
  };

  if (propertyType === "commercial") {
    return {
      ...baseInitials,
      ...commercialSpecific,
    };
  } else {
    // Default to residential
    return {
      ...baseInitials,
      ...residentialSpecific,
    };
  }
};
export const validationSchema = Yup.lazy((values) => {
  // Base required fields for all property types
  let baseSchema = {
    propertyType: Yup.string().required("Property type is required"),
    subType: Yup.string().required("Property sub-type is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    pincode: Yup.string()
      .matches(/^\d{6}$/, "Pincode must be 6 digits")
      .required("Pincode is required"),
    area: Yup.mixed()
      .required("Area is required")
      .test("not-null", "Area is required", (val) => val !== null)
      .test("area-shape", "Area is required", (val) => {
        if (val === null || val === undefined || val === "") return false;
        if (typeof val === "string") return val.trim().length > 0;
        if (typeof val === "object") {
          return !!val.placeName || !!val.formattedAddress || !!val.coordinates;
        }
        return false;
      }),
    landmark: Yup.string(),
    ageOfProperty: Yup.string().required("Age of property is required"),
    availableFrom: Yup.string().required("Available from is required"),
    media: Yup.mixed()
      .test("required", "At least one image is required", (value) => {
        if (!value) return false;
        const files = Array.isArray(value) ? value : Array.from(value);
        return files.length > 0;
      })
      .test("fileType", "Only image files are allowed", (value) => {
        if (!value) return true; // skip if empty — required test will handle it
        const files = Array.isArray(value) ? value : Array.from(value);
        return files.every((file) => file && file.type.startsWith("image/"));
      })
      .test("fileCount", "You can upload up to 10 images", (value) => {
        if (!value) return true;
        const files = Array.isArray(value) ? value : Array.from(value);
        return files.length <= 10;
      }),
    carpetArea: Yup.number().required("Carpet area is required"),
    builtUpArea: Yup.number().required("Built up area is required"),
    clearHeight: Yup.number().required("Clear height is required"),
    // maintenance: Yup.string().required("Maintenance is required"),
    maintenance: Yup.string(),

    securityDeposit: Yup.string().nullable(),
    priceNegotiation: Yup.boolean(),

    amenities: Yup.array().of(Yup.string()),
    description: Yup.string().required("Description is required"),
    address: Yup.string().required("Address is required"),
  };

  if (values.propertyType === "residential") {
    baseSchema = {
      ...baseSchema,
      houseNo: Yup.string().required("House number is required"),
      apartmentName: Yup.string().required("Apartment name is required"),
      // area : in common ✅
      // landmark : in common ✅
      // city : in common ✅
      // state : in common ✅
      // pincode : in common ✅

      bedrooms: Yup.string().typeError("Bedrooms must be a number"),
      bathrooms: Yup.string().typeError("Bathrooms must be a number"),
      balconies: Yup.string().typeError("Balconies must be a number"),
      livingRooms: Yup.string().typeError("Living rooms must be a number"),
      otherRooms: Yup.array().of(Yup.string()),
      // carpetArea:  in common ✅
      // builtUpArea: in common ✅
      // clearHeight: in common ✅

      furnishing: Yup.string().required("Furnishing is required"),

      specifications: Yup.string().required("Specifications is required"),
      // totalFloors: in common ✅
      // propertyOnFloor: in common ✅
      // ageOfProperty: in common ✅
      // availableFrom: in common ✅

      // ❌ Willing to rent out to : not in payload
      expectedRent: Yup.number()
        .typeError("Expected rent must be a number")
        .min(0, "Expected rent cannot be negative")
        .required("Expected rent is required"),
      // maintenance: in common ✅

      bookingAmount: Yup.string().nullable(),
      membershipCharge: Yup.string().nullable(),
      // ❌ Electricity and water charges excluded : not in payload
      // Media : in common ✅
      // securityDeposit: in common ✅
      durationOfAgreement: Yup.string().required(
        "Duration of agreement is required"
      ),
      noticePeriod: Yup.string().required("Notice period is required"),
      coveredParking: Yup.number()
        .typeError("Covered parking must be a number")
        .nullable(),
      openParking: Yup.number()
        .typeError("Open parking must be a number")
        .nullable(),
      facing: Yup.string().required("Facing is required"),
      facingDetails: Yup.string(),
      // ❌ Amenities and facilities : not in payload
      totalFloors: Yup.string().required("Total floors is required"),
    };
  }

  if (values.propertyType === "commercial") {
    baseSchema = {
      ...baseSchema,
      // ✅ Area : in common
      buildingName: Yup.string().required("Building name is required"),
      officeNo: Yup.string().required("Office number is required"),
      zone: Yup.string().required("Zone is required"),
      locationInside: Yup.string().required("Location inside is required"),
      // ✅City, State, Pincode : in common
      superBuiltUpArea: Yup.number().required(
        "Super built-up area is required"
      ),
      // carpetArea: in common ✅
      // builtUpArea: in common ✅

      entranceWidth: Yup.number().required("Entrance width is required"),
      // clearHeight: in common ✅
      flooring: Yup.string().required("Flooring is required"),

      // propertyOnFloor: in common ✅

      //  ❌  lifts available: not in payload
      //  ❌  Parking types & no of parking spaces: not in payload
      //  ❌  Ownership: not in payload
      // Expected Lease Amount === "expectedRent"❓❓❓ @chintan bhai : Please let me know
      // ❌  Additional pricing: not in payload

      // maintenance: in common ✅
      // securityDeposit: in common ✅
      //  ❌  Yearly rent increase: not in payload
      //  ❌  Is your property fire NOC certified? : not in payload
      //  ❌  Occupancy Certificate: not in payload
      // ❌  Amenities: not in payload
      // ❌  Facilities: not in payload
      facilities: Yup.array().of(Yup.string()),

      // Media : in common ✅

      ...(values.subType === "Showroom"
        ? {
            locatedNear: Yup.string(),
            suitableBusinessTypes: Yup.array().of(Yup.string()),
            bookingAmount: Yup.number().required("Booking amount is required"),
          }
        : {
            lockInPeriod: Yup.number().required("Lock in period is required"),
            fireNocCertified: Yup.string().required(
              "Fire Noc certified is required"
            ),
            noOfCabins: Yup.number().required("No of cabins is required"),
            maxSeats: Yup.number().required("Max seats is required"),
            meetingRooms: Yup.number().required("Meeting rooms is required"),
            conferenceRooms: Yup.number().required(
              "Conference rooms is required"
            ),
            privateWashrooms: Yup.string().nullable(),
            sharedWashrooms: Yup.string().nullable(),
            furnishing: Yup.string().nullable(),
            receptionArea: Yup.string().nullable(),
            pantryType: Yup.string().nullable(),
            totalFloors: Yup.string().required("Total floors is required"),
            propertyOnFloor: Yup.string().required(
              "Property on floor is required"
            ),
            staircases: Yup.string().nullable(),
            liftsAvailable: Yup.string().required("Lifts field is required"),
            serviceLiftCount: Yup.string().nullable(),
            passengerLiftCount: Yup.string().nullable(),
            expectedLeaseAmount: Yup.number().required(
              "Expected lease amount is required"
            ),
            occupancyCertificate: Yup.string().required(
              "Occupancy certificate is required"
            ),
          }),
      parkingType: Yup.string().nullable(),
      parkingSpaces: Yup.number().nullable(),
      ownershipType: Yup.string().required("Ownership type is required"),
      additionalPricing: Yup.array().of(Yup.string()),
      maintenancePeriod: Yup.string().required(
        "Maintenance period is required"
      ),
      yearlyRentIncrease: Yup.number().nullable(),

      /*
// fireNocCertified
// lockInPeriod
// maintenancePeriod
// occupancyCertificate
propertyOnFloor
totalFloors
*/
    };
  }

  return Yup.object().shape(baseSchema);
});

// Helper function to convert form values to FormData - only fields used in validation schema
export const convertToFormData = (values) => {
  const formData = new FormData();

  // Helper function to convert area units to sq ft
  const convertToSqFt = (value, unit) => {
    if (!value || !unit) return value;
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return value;

    switch (unit) {
      case "sq yd":
        return (numValue * 9).toString(); // 1 sq yd = 9 sq ft
      case "sq mtr":
        return (numValue * 10.764).toString(); // 1 sq m = 10.764 sq ft
      case "sq ft":
      default:
        return value;
    }
  };

  // Helper function to safely append values - skip null/undefined/empty values
  const safeAppend = (key, value) => {
    if (value !== null && value !== undefined && value !== "") {
      formData.append(key, value);
    }
  };

  // Helper function to append converted area values
  const safeAppendArea = (key, value, unit) => {
    const convertedValue = convertToSqFt(value, unit);
    safeAppend(key, convertedValue);
  };

  // Common fields (base schema)
  safeAppend("propertyType", values.propertyType);
  safeAppend("subType", values.subType);
  safeAppend("city", values.city);
  safeAppend("state", values.state);
  safeAppend("pincode", values.pincode);
  // Do not append area object directly; API expects only coordinates
  // Extract latitude and longitude from area.coordinates
  if (
    values.area &&
    typeof values.area === "object" &&
    values.area.coordinates
  ) {
    safeAppend("latitude", values.area.coordinates.lat?.toString());
    safeAppend("longitude", values.area.coordinates.lng?.toString());
  }
  safeAppend("landmark", values.landmark);

  // Convert area fields to sq ft
  safeAppendArea("carpetArea", values.carpetArea, values.carpetAreaUnit);
  safeAppendArea("builtUpArea", values.builtUpArea, values.builtUpAreaUnit);
  safeAppendArea(
    "superBuiltUpArea",
    values.superBuiltUpArea,
    values.plotAreaUnit
  );

  safeAppend("clearHeight", values.clearHeight?.toString());
  safeAppend("totalFloors", values.totalFloors?.toString());
  safeAppend("propertyOnFloor", values.propertyOnFloor?.toString());
  safeAppend("maintenance", values.maintenance?.toString());
  safeAppend("address", values.address);

  // Handle security deposit based on type
  if (values.securityDeposit === "Fixed") {
    safeAppend("securityDeposit", values.securityDepositAmount?.toString());
  } else if (values.securityDeposit === "Multiple of rent") {
    safeAppend("securityDeposit", values.securityDepositMonths?.toString());
  } else {
    safeAppend("securityDeposit", values.securityDeposit);
  }

  // Residential specific fields
  if (values.propertyType === "residential") {
    safeAppend("houseNo", values.houseNo);
    safeAppend("apartmentName", values.apartmentName);

    // Bedrooms
    if (typeof values.bedrooms === "number" && !isNaN(values.bedrooms)) {
      safeAppend("bedrooms", values.bedrooms.toString());
    } else if (values.bedrooms === "Others") {
      let val = values.bedroomsOther;
      if (
        (typeof val === "number" && !isNaN(val)) ||
        (typeof val === "string" && val !== "" && !isNaN(Number(val)))
      ) {
        safeAppend("bedrooms", val.toString());
      } else {
        // Leave it empty (do not set bedrooms at all)
      }
    }

    // Bathrooms
    if (typeof values.bathrooms === "number" && !isNaN(values.bathrooms)) {
      safeAppend("bathrooms", values.bathrooms.toString());
    } else if (values.bathrooms === "Others") {
      let val = values.bathroomsOther;
      if (
        (typeof val === "number" && !isNaN(val)) ||
        (typeof val === "string" && val !== "" && !isNaN(Number(val)))
      ) {
        safeAppend("bathrooms", val.toString());
      } else {
        // Leave it empty (do not set bathrooms at all)
      }
    }

    // Living rooms
    if (typeof values.livingRooms === "number" && !isNaN(values.livingRooms)) {
      safeAppend("livingRooms", values.livingRooms.toString());
    } else if (values.livingRooms === "Others") {
      let val = values.livingRoomsOther;
      if (
        (typeof val === "number" && !isNaN(val)) ||
        (typeof val === "string" && val !== "" && !isNaN(Number(val)))
      ) {
        safeAppend("livingRooms", val.toString());
      } else {
        // Leave it empty (do not set livingRooms at all)
      }
    }

    safeAppend("balconies", values.balconies?.toString());

    // Only append otherRooms if it has content
    if (
      values.otherRooms &&
      Array.isArray(values.otherRooms) &&
      values.otherRooms.length > 0
    ) {
      safeAppend("otherRooms", JSON.stringify(values.otherRooms));
    }

    safeAppend("furnishing", values.furnishing);
    safeAppend("specifications", values.specifications);
    safeAppend("expectedRent", values.expectedRent?.toString());
    safeAppend("priceNegotiation", values.priceNegotiation?.toString());
    safeAppend("bookingAmount", values.bookingAmount?.toString());
    safeAppend("membershipCharge", values.membershipCharge?.toString());
    safeAppend("durationOfAgreement", values.durationOfAgreement);
    safeAppend("noticePeriod", values.noticePeriod);
    safeAppend("coveredParking", values.coveredParking?.toString());
    safeAppend("openParking", values.openParking?.toString());
    safeAppend("facing", values.facing);
    safeAppend("facingDetails", values.facingDetails);
  }

  // Commercial specific fields
  if (values.propertyType === "commercial") {
    safeAppend("buildingName", values.buildingName);
    safeAppend("officeNo", values.officeNo);
    safeAppend("zone", values.zone);
    safeAppend("locationInside", values.locationInside);
    safeAppend("entranceWidth", values.entranceWidth?.toString());
    safeAppend("flooring", values.flooring);
    safeAppend("lockInPeriod", values.lockInPeriod?.toString());
    safeAppend("description", values.description);

    // Commercial office-specific fields (non-showroom)
    if (values.subType !== "Showroom") {
      safeAppend("noOfCabins", values.noOfCabins?.toString());
      safeAppend("maxSeats", values.maxSeats?.toString());
      safeAppend("meetingRooms", values.meetingRooms?.toString());
      safeAppend("conferenceRooms", values.conferenceRooms?.toString());
      safeAppend("privateWashrooms", values.privateWashrooms?.toString());
      safeAppend("sharedWashrooms", values.sharedWashrooms?.toString());
      safeAppend("receptionArea", values.receptionArea);
      safeAppend("pantryType", values.pantryType);
      safeAppend("staircases", values.staircases);
      safeAppend("liftsAvailable", values.liftsAvailable);
      safeAppend("serviceLiftCount", values.serviceLiftCount?.toString());
      safeAppend("passengerLiftCount", values.passengerLiftCount?.toString());
      safeAppend("expectedLeaseAmount", values.expectedLeaseAmount?.toString());
    }

    // Commercial showroom-specific fields
    if (values.subType === "Showroom") {
      safeAppend("locatedNear", values.locatedNear);
      safeAppend("bookingAmount", values.bookingAmount?.toString());

      // Only append suitableBusinessTypes if it has content
      if (
        values.suitableBusinessTypes &&
        Array.isArray(values.suitableBusinessTypes) &&
        values.suitableBusinessTypes.length > 0
      ) {
        safeAppend(
          "suitableBusinessTypes",
          JSON.stringify(values.suitableBusinessTypes)
        );
      }
    }

    // Common commercial fields
    safeAppend("parkingType", values.parkingType);
    safeAppend("parkingSpaces", values.parkingSpaces?.toString());
    safeAppend("ownershipType", values.ownershipType);
    safeAppend("maintenancePeriod", values.maintenancePeriod);
    safeAppend("yearlyRentIncrease", values.yearlyRentIncrease?.toString());
    safeAppend("fireNocCertified", values.fireNocCertified);
    safeAppend("occupancyCertificate", values.occupancyCertificate);

    // Only append additionalPricing if it has content
    if (
      values.additionalPricing &&
      Array.isArray(values.additionalPricing) &&
      values.additionalPricing.length > 0
    ) {
      safeAppend("additionalPricing", JSON.stringify(values.additionalPricing));
    }

    // Only append facilities if it has content
    if (
      values.facilities &&
      Array.isArray(values.facilities) &&
      values.facilities.length > 0
    ) {
      safeAppend("facilities", JSON.stringify(values.facilities));
    }
  }

  // Media files - handle file uploads
  if (values.media && values.media.length > 0) {
    Object.keys(values.media).forEach((key, index) => {
      const file = values.media[key];
      if (file instanceof File) {
        formData.append("media", file);
      }
    });
  }

  return formData;
};

// Field mapping for UI components
export const fieldMappings = {
  // Map UI field names to FormData keys
  propertyName: "apartmentName", // UI uses propertyName, FormData uses apartmentName
  // Add other mappings as needed
};

// Example of the FormData structure that will be created:
/*
const exampleFormData = new FormData();
exampleFormData.append("propertyType", "residential");
exampleFormData.append("subType", "Apartment");
exampleFormData.append("address", "Ahmedabad 11111.22222");
exampleFormData.append("city", "Ahmedabad");
exampleFormData.append("state", "Gujarat");
exampleFormData.append("pincode", "382480");
exampleFormData.append("houseNo", "15/B");
exampleFormData.append("apartmentName", "Havix Residency");
exampleFormData.append("area", "Ranip");
exampleFormData.append("landmark", "Opposite Medical Store");
exampleFormData.append("bedrooms", "10");
exampleFormData.append("bathrooms", "9");
exampleFormData.append("balconies", "8");
exampleFormData.append("livingRooms", "7");
exampleFormData.append("otherRooms", "[\"Puja room\",\"Study/Co - working room\"]");
exampleFormData.append("carpetArea", "14500");
exampleFormData.append("builtUpArea", "16500");
exampleFormData.append("clearHeight", "100.5");
exampleFormData.append("furnishing", "semi - furnished");
exampleFormData.append("specifications", "Modern modular kitchen, premium flooring, AC in master bedroom");
exampleFormData.append("totalFloors", "10");
exampleFormData.append("propertyOnFloor", "4");
exampleFormData.append("buildingName", "test dev");
exampleFormData.append("ageOfProperty", "3 years");
exampleFormData.append("availableFrom", "2025 - 10 - 01");
exampleFormData.append("expectedRent", "35000");
exampleFormData.append("maintenance", "2500");
exampleFormData.append("priceNegotiation", "true");
exampleFormData.append("bookingAmount", "50000");
exampleFormData.append("membershipCharge", "2000");
exampleFormData.append("description", "Spacious 3BHK apartment in prime residential area with all modern amenities. Perfect for family living.");
exampleFormData.append("securityDeposit", "Fixed");
exampleFormData.append("durationOfAgreement", "11 months");
exampleFormData.append("noticePeriod", "2 months");
exampleFormData.append("coveredParking", "1");
exampleFormData.append("officeNo", "15010");
exampleFormData.append("openParking", "1");
exampleFormData.append("facing", "East");
exampleFormData.append("facingDetails", "Balcony faces the sunrise with open view");
exampleFormData.append("lockInPeriod", "150 days");
exampleFormData.append("media", ""); // Empty string if no files, or actual files if selected
*/

// Commented out - only fields used in validation schema are included above
// Missing fields that need to be added to UI components:
// - officeNo (commercial only)
// - facing, facingDetails, lockInPeriod (residential only)
// - securityDeposit, durationOfAgreement, noticePeriod (residential only)
// - priceNegotiation (boolean checkbox)
// - availableFrom (date picker)
// - ageOfProperty (text input)
// - furnishing (select dropdown)
// - specifications (textarea)
// - totalFloors, propertyOnFloor (number inputs)
// - buildingName (text input)
// - clearHeight (number input)
// - otherRooms (array input - can be implemented as dynamic list)
