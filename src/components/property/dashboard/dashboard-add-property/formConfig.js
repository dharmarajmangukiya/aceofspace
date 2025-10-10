import * as Yup from "yup";

// Initial values for the form - only fields used in validation schema
export const getInitialValues = (
  propertyType = "residential",
  subType = "Apartment"
) => ({
  // Basic property info (common)
  propertyType: propertyType,
  subType: subType,
  city: "",
  state: "",
  pincode: "",
  area: "",
  landmark: "",
  ageOfProperty: "",
  availableFrom: "",
  media: [], // Array of files, will be handled in FormData
  video: [], // Array of files, will be handled in FormData
  carpetArea: "",
  builtUpArea: "",
  clearHeight: "",
  totalFloors: "",
  propertyOnFloor: "",
  maintenance: "",
  securityDeposit: "",

  // Residential specific fields
  address: "",
  houseNo: "",
  apartmentName: "", // Will be mapped from propertyName in UI
  bedrooms: "",
  bathrooms: "",
  balconies: "",
  livingRooms: "",
  otherRooms: [], // Array in UI, will be stringified for FormData
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

  // Commercial specific fields
  buildingName: "",
  officeNo: "",
  lockInPeriod: "",
  description: "",
});
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
    area: Yup.string().required("Area is required"),
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
    totalFloors: Yup.string().required("Total floors is required"),
    propertyOnFloor: Yup.string().required("Property on floor is required"),
    // maintenance: Yup.string().required("Maintenance is required"),
    maintenance: Yup.string(),
    securityDeposit: Yup.string().nullable(),
  };

  if (values.propertyType === "residential") {
    baseSchema = {
      ...baseSchema,
      address: Yup.string().required("Address is required"),
      houseNo: Yup.string().required("House number is required"),
      apartmentName: Yup.string().required("Apartment name is required"),
      // area : in common ✅
      // landmark : in common ✅
      // city : in common ✅
      // state : in common ✅
      // pincode : in common ✅

      bedrooms: Yup.number().typeError("Bedrooms must be a number"),
      bathrooms: Yup.number().typeError("Bathrooms must be a number"),
      balconies: Yup.number().typeError("Balconies must be a number"),
      livingRooms: Yup.number().typeError("Living rooms must be a number"),
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

      priceNegotiation: Yup.boolean(),
      bookingAmount: Yup.number().required("Booking amount is required"),
      membershipCharge: Yup.number().nullable(),
      // ❌ Electricity and water charges excluded : not in payload
      // ❌ Price Negotiation       : not in payload
      // ❌ Booking amount : not in payload
      // ❌ Membership charge : not in payload
      // ❌ What makes your property unique : not in payload
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
    };
  }

  if (values.propertyType === "commercial") {
    baseSchema = {
      ...baseSchema,
      // ✅ Area : in common
      buildingName: Yup.string().required("Building name is required"),
      officeNo: Yup.string().required("Office number is required"),
      // ❌  Zone  : not in payload
      // ❌  Location inside: not in payload
      // ✅City, State, Pincode : in common

      // carpetArea: in common ✅
      // ❌  Super built-up area : not in payload
      // builtUpArea: in common ✅

      // ❌  Entrance width : not in payload
      // clearHeight: in common ✅
      //  ❌  Flooring : not in payload
      //  ❌  No of Cabins: not in payload
      //  ❌  Max no of seats: not in payload
      //  ❌  No of meeting rooms: not in payload
      //  ❌  Conference rooms: not in payload
      //  ❌  No of Washrooms: not in payload
      //  ❌  No of shared washrooms: not in payload

      //  ❌  Reception area: not in payload
      //  ❌  Pantry type: not in payload
      //  ❌  Facilities: not in payload
      //  ❌  Fire safety measures: not in payload

      // totalFloors: in common ✅
      // propertyOnFloor: in common ✅

      //  ❌  no of staircases: not in payload
      //  ❌  lifts available: not in payload
      //  ❌  Parking types & no of parking spaces: not in payload
      //  ❌  Ownership: not in payload
      // Expected Lease Amount === "expectedRent"❓❓❓ @chintan bhai : Please let me know
      // ❌  Additional pricing: not in payload

      // maintenance: in common ✅
      // securityDeposit: in common ✅
      lockInPeriod: Yup.string().required("Lock in period is required"),
      //  ❌  Yearly rent increase: not in payload
      //  ❌  Is your property fire NOC certified? : not in payload
      //  ❌  Occupancy Certificate: not in payload
      description: Yup.string().required("Description is required"),
      // ❌  Amenities: not in payload
      // ❌  Facilities: not in payload

      // Media : in common ✅
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
  safeAppend("area", values.area);
  safeAppend("landmark", values.landmark);
  safeAppend("ageOfProperty", values.ageOfProperty);
  safeAppend("availableFrom", values.availableFrom);

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
    safeAppend("address", values.address);
    safeAppend("houseNo", values.houseNo);
    safeAppend("apartmentName", values.apartmentName);
    safeAppend("bedrooms", values.bedrooms?.toString());
    safeAppend("bathrooms", values.bathrooms?.toString());
    safeAppend("balconies", values.balconies?.toString());
    safeAppend("livingRooms", values.livingRooms?.toString());

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
    safeAppend("lockInPeriod", values.lockInPeriod);
    safeAppend("description", values.description);
  }

  // Media files - handle file uploads
  if (values.media && Array.isArray(values.media) && values.media.length > 0) {
    values.media.forEach((file, index) => {
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
