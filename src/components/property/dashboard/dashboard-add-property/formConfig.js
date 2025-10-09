import * as Yup from "yup";

// Initial values for the form
export const getInitialValues = (
  propertyType = "residential",
  subType = "Apartment"
) => ({
  // Basic property info
  propertyType: propertyType,
  subType: subType,

  // Address fields
  address: "",
  city: "",
  state: "",
  pincode: "",
  houseNo: "",
  apartmentName: "", // Will be mapped from propertyName in UI
  area: "",
  landmark: "",

  // Room details
  bedrooms: "",
  bathrooms: "",
  balconies: "",
  livingRooms: "",
  otherRooms: [], // Array in UI, will be stringified for FormData

  // Area details
  carpetArea: "",
  builtUpArea: "",
  clearHeight: "",

  // Property specifications
  furnishing: "",
  specifications: "",
  totalFloors: "",
  propertyOnFloor: "",
  buildingName: "",
  ageOfProperty: "",

  // Availability and pricing
  availableFrom: "",
  expectedRent: "",
  maintenance: "",
  priceNegotiation: false,
  bookingAmount: "",
  membershipCharge: "",

  // Description and terms
  description: "",
  securityDeposit: "",
  durationOfAgreement: "",
  noticePeriod: "",

  // Parking and location
  coveredParking: "",
  officeNo: "",
  openParking: "",
  facing: "",
  facingDetails: "",
  lockInPeriod: "",

  // Media files
  media: [], // Array of files, will be handled in FormData
});

// Validation schema
export const _validationSchema = Yup.object({
  // Basic property info
  propertyType: Yup.string().required("Property type is required"),
  subType: Yup.string().required("Property sub-type is required"),

  // Address fields
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^\d{6}$/, "Pincode must be 6 digits"),
  houseNo: Yup.string().required("House number is required"),
  apartmentName: Yup.string().required("Apartment/Property name is required"),
  area: Yup.string().required("Area is required"),
  landmark: Yup.string(),

  // Room details - numbers
  bedrooms: Yup.number()
    .typeError("Bedrooms must be a number")
    .min(0, "Bedrooms cannot be negative")
    .required("Bedrooms is required"),
  bathrooms: Yup.number()
    .typeError("Bathrooms must be a number")
    .min(0, "Bathrooms cannot be negative")
    .required("Bathrooms is required"),
  balconies: Yup.number()
    .typeError("Balconies must be a number")
    .min(0, "Balconies cannot be negative"),
  livingRooms: Yup.number()
    .typeError("Living rooms must be a number")
    .min(0, "Living rooms cannot be negative"),
  otherRooms: Yup.array().of(Yup.string()),

  // Area details - numbers
  carpetArea: Yup.number()
    .typeError("Carpet area must be a number")
    .min(0, "Carpet area cannot be negative")
    .required("Carpet area is required"),
  builtUpArea: Yup.number()
    .typeError("Built-up area must be a number")
    .min(0, "Built-up area cannot be negative"),
  clearHeight: Yup.number()
    .typeError("Clear height must be a number")
    .min(0, "Clear height cannot be negative"),

  // Property specifications
  furnishing: Yup.string(),
  specifications: Yup.string(),
  totalFloors: Yup.number()
    .typeError("Total floors must be a number")
    .min(1, "Total floors must be at least 1"),
  propertyOnFloor: Yup.number()
    .typeError("Property floor must be a number")
    .min(0, "Property floor cannot be negative"),
  buildingName: Yup.string(),
  ageOfProperty: Yup.string(),

  // Availability and pricing
  availableFrom: Yup.date().typeError("Available from must be a valid date"),
  expectedRent: Yup.number()
    .typeError("Expected rent must be a number")
    .min(0, "Expected rent cannot be negative"),
  maintenance: Yup.number()
    .typeError("Maintenance must be a number")
    .min(0, "Maintenance cannot be negative"),
  priceNegotiation: Yup.boolean(),
  bookingAmount: Yup.number()
    .typeError("Booking amount must be a number")
    .min(0, "Booking amount cannot be negative"),
  membershipCharge: Yup.number()
    .typeError("Membership charge must be a number")
    .min(0, "Membership charge cannot be negative"),

  // Description and terms
  description: Yup.string(),
  securityDeposit: Yup.string(),
  durationOfAgreement: Yup.string(),
  noticePeriod: Yup.string(),

  // Parking and location
  coveredParking: Yup.number()
    .typeError("Covered parking must be a number")
    .min(0, "Covered parking cannot be negative"),
  officeNo: Yup.string().required("Office number is required"),
  openParking: Yup.number()
    .typeError("Open parking must be a number")
    .min(0, "Open parking cannot be negative"),
  facing: Yup.string(),
  facingDetails: Yup.string(),
  lockInPeriod: Yup.string(),

  // Media files
  media: Yup.array().of(Yup.mixed()),
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
    media: Yup.array()
      .of(
        Yup.mixed().test("fileType", "Only image files are allowed", (file) => {
          if (!file) return true;
          return (
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/jpg" ||
            file.type === "image/webp"
          );
        })
      )
      .min(1, "At least one image is required")
      .required("At least one image is required"),
    carpetArea: Yup.string().required("Carpet area is required"),
    builtUpArea: Yup.string().required("Built up area is required"),
    clearHeight: Yup.string().required("Clear height is required"),
    totalFloors: Yup.string().required("Total floors is required"),
    propertyOnFloor: Yup.string().required("Property on floor is required"), //Your floor No
    maintenance: Yup.string().required("Maintenance is required"),
    securityDeposit: Yup.string().required("Security deposit is required"),
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

      bedrooms: Yup.number()
        .typeError("Bedrooms must be a number")
        .min(0, "Bedrooms cannot be negative"),
      bathrooms: Yup.number()
        .typeError("Bathrooms must be a number")
        .min(0, "Bathrooms cannot be negative"),
      balconies: Yup.number()
        .typeError("Balconies must be a number")
        .min(0, "Balconies cannot be negative"),
      livingRooms: Yup.number()
        .typeError("Living rooms must be a number")
        .min(0, "Living rooms cannot be negative"),
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
        .min(0, "Covered parking cannot be negative")
        .required("Covered parking is required"),
      openParking: Yup.number()
        .typeError("Open parking must be a number")
        .min(0, "Open parking cannot be negative")
        .required("Open parking is required"),
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

// Helper function to convert form values to FormData
export const convertToFormData = (values) => {
  const formData = new FormData();

  // Helper function to safely append values
  const safeAppend = (key, value) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    } else {
      formData.append(key, "");
    }
  };

  // Basic property info
  safeAppend("propertyType", values.propertyType);
  safeAppend("subType", values.subType);

  // Address fields
  safeAppend("address", values.address);
  safeAppend("city", values.city);
  safeAppend("state", values.state);
  safeAppend("pincode", values.pincode);
  safeAppend("houseNo", values.houseNo);
  safeAppend("apartmentName", values.apartmentName);
  safeAppend("area", values.area);
  safeAppend("landmark", values.landmark);

  // Room details - convert numbers to strings
  safeAppend("bedrooms", values.bedrooms?.toString() || "");
  safeAppend("bathrooms", values.bathrooms?.toString() || "");
  safeAppend("balconies", values.balconies?.toString() || "");
  safeAppend("livingRooms", values.livingRooms?.toString() || "");
  safeAppend("otherRooms", JSON.stringify(values.otherRooms || []));

  // Area details - convert numbers to strings
  safeAppend("carpetArea", values.carpetArea?.toString() || "");
  safeAppend("builtUpArea", values.builtUpArea?.toString() || "");
  safeAppend("clearHeight", values.clearHeight?.toString() || "");

  // Property specifications
  safeAppend("furnishing", values.furnishing);
  safeAppend("specifications", values.specifications);
  safeAppend("totalFloors", values.totalFloors?.toString() || "");
  safeAppend("propertyOnFloor", values.propertyOnFloor?.toString() || "");
  safeAppend("buildingName", values.buildingName);
  safeAppend("ageOfProperty", values.ageOfProperty);

  // Availability and pricing
  safeAppend("availableFrom", values.availableFrom);
  safeAppend("expectedRent", values.expectedRent?.toString() || "");
  safeAppend("maintenance", values.maintenance?.toString() || "");
  safeAppend(
    "priceNegotiation",
    values.priceNegotiation?.toString() || "false"
  );
  safeAppend("bookingAmount", values.bookingAmount?.toString() || "");
  safeAppend("membershipCharge", values.membershipCharge?.toString() || "");

  // Description and terms
  safeAppend("description", values.description);
  safeAppend("securityDeposit", values.securityDeposit);
  safeAppend("durationOfAgreement", values.durationOfAgreement);
  safeAppend("noticePeriod", values.noticePeriod);

  // Parking and location
  safeAppend("coveredParking", values.coveredParking?.toString() || "");
  safeAppend("officeNo", values.officeNo);
  safeAppend("openParking", values.openParking?.toString() || "");
  safeAppend("facing", values.facing);
  safeAppend("facingDetails", values.facingDetails);
  safeAppend("lockInPeriod", values.lockInPeriod);

  // Media files - handle file uploads
  if (values.media && values.media.length > 0) {
    values.media.forEach((file, index) => {
      if (file instanceof File) {
        formData.append("media", file);
      }
    });
  } else {
    formData.append("media", "");
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
