# Add Property Form Documentation

This folder contains the complete implementation of the multi-step property addition form for both **Residential** and **Commercial** properties.

## 📁 Folder Structure

```
dashboard-add-property/
├── README.md                           # This file
├── index.js                           # Main export
├── AddPropertyTabContent.jsx          # Main form container
├── formConfig.js                      # Form configuration & validation
├── stepValidation.js                  # Step-by-step validation logic
├── Amenities.js                       # Amenities selection component
├── residential/                       # Residential property forms
│   ├── ResidentialForm.jsx           # Residential form wrapper
│   └── components/                    # Step components
│       ├── AddressStep.jsx
│       ├── RoomDetailsStep.jsx
│       ├── AreaDetailsStep.jsx
│       ├── RentDetailsStep.jsx
│       ├── AgreementTypeStep.jsx
│       ├── MediaStep.jsx
│       └── OtherDetailsStep.jsx
├── commercial/                        # Commercial property forms
│   ├── CommercialForm.jsx            # Commercial form wrapper
│   └── components/                    # Step components
│       ├── AddressStep.jsx
│       └── ... (other steps)
└── (other utility folders)
```

## 🎯 Key Features

### 1. Multi-Step Form System

- **Residential**: 7 steps
- **Commercial**: 4 steps (varies by sub-type)
- Step-by-step validation
- Navigation between steps
- Error tracking per step

### 2. Google Maps Location Integration

#### **Area Field with Coordinates**

The Area field uses Google Places Autocomplete API to:

- Search only within Ahmedabad city boundaries
- Auto-complete location suggestions with debouncing (300ms)
- Capture coordinates (latitude & longitude) on selection

**Location: `residential/components/AddressStep.jsx` & `commercial/components/AddressStep.jsx`**

```javascript
// Area is stored as an object containing all location data
const areaObject = {
  placeId: "ChIJ...",
  placeName: "Navrangpura",
  formattedAddress: "Navrangpura, Ahmedabad, Gujarat, India",
  coordinates: {
    lat: 23.0356,
    lng: 72.5569,
  },
};
```

**How it works:**

1. User types in the Area field (react-select with autocomplete)
2. `usePlacesAutocomplete` hook fetches suggestions from Google Places API
3. Only Ahmedabad locations are shown (strictBounds + filtering)
4. On selection, full location data is saved to `formData.area`
5. During form submission, coordinates are extracted and sent to API

#### **Hook: `usePlacesAutocomplete`**

**Location: `src/hooks/usePlacesAutocomplete.js`**

```javascript
// Usage
const { options, isLoading, fetchPlaceDetails } = usePlacesAutocomplete({
  input: inputValue,
  enabled: isClient,
});
```

**Features:**

- ✅ Debounced input (300ms)
- ✅ React Query for caching
- ✅ Ahmedabad-only bounds restriction
- ✅ Returns formatted options for react-select
- ✅ `fetchPlaceDetails()` gets full location data with coordinates

**Ahmedabad Bounds:**

- Southwest: `{ lat: 22.9074872, lng: 72.4487989 }`
- Northeast: `{ lat: 23.1645253, lng: 72.7379532 }`

#### **Global API Provider**

**Location: `src/app/layout.js`**

```javascript
import { APIProvider } from "@vis.gl/react-google-maps";
import { GOOGLE_MAPS_API_KEY } from "@/utils/config";

// Wraps entire app
<APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
  <MainLayout>{children}</MainLayout>
</APIProvider>;
```

## 📋 Form Configuration

### `formConfig.js`

Contains three main exports:

#### 1. `getInitialValues(propertyType, subType)`

Returns initial form values based on property type.

```javascript
const initialValues = getInitialValues("residential", "Apartment");

// Returns:
{
  propertyType: "residential",
  subType: "Apartment",
  area: "",  // ← Will store location object
  city: "",
  state: "",
  pincode: "",
  // ... all other fields
}
```

#### 2. `validationSchema`

Yup validation schema using lazy evaluation.

**Area Validation:**

```javascript
area: Yup.mixed().test("area-shape", "Area is required", (val) => {
  if (val === null || val === undefined || val === "") return false;
  if (typeof val === "string") return val.trim().length > 0;
  if (typeof val === "object") {
    return !!val.placeName || !!val.formattedAddress || !!val.coordinates;
  }
  return false;
});
```

This validates that:

- Area is not empty
- If string: has content
- If object: has location data (placeName/address/coordinates)

#### 3. `convertToFormData(values)`

Converts Formik values to FormData for API submission.

**Coordinate Extraction:**

```javascript
// Area object is NOT sent to API
// Only latitude and longitude are extracted and sent
if (values.area && typeof values.area === "object" && values.area.coordinates) {
  formData.append("latitude", values.area.coordinates.lat.toString());
  formData.append("longitude", values.area.coordinates.lng.toString());
}
```

**What gets sent to API:**

```
✅ latitude: "23.0356"
✅ longitude: "72.5569"
❌ area: { ... } // NOT sent
```

### `stepValidation.js`

Maps which fields belong to which step for validation.

```javascript
export const residentialStepFields = {
  1: ["city", "state", "pincode", "area", "landmark", "houseNo", ...],
  2: ["bedrooms", "bathrooms", ...],
  // ...
};

export const commercialStepFields = {
  1: ["city", "state", "pincode", "area", "landmark", "buildingName", ...],
  // ...
};
```

**Functions:**

- `validateStep(formik, step, formType)` - Validates current step
- `getStepErrorCount(errors, step, formType)` - Counts errors in a step
- `validateAllSteps(formik, totalSteps, formType)` - Validates entire form

## 🔄 Form Flow

### 1. Property Type Selection

User selects "Residential" or "Commercial"

### 2. Sub-type Selection

Dropdown appears based on property type:

- **Residential**: Apartment, Bungalow, Villa, etc.
- **Commercial**: Office Space, Showroom, etc.

### 3. Multi-Step Form

Form initializes with fields based on property type and sub-type.

**Example Flow (Residential):**

```
Step 1: Address Details
  ↓ (validates required fields)
Step 2: Room Details
  ↓
Step 3: Area Details
  ↓
Step 4: Rent Details
  ↓
Step 5: Agreement Type
  ↓
Step 6: Media Upload
  ↓
Step 7: Other Details & Submit
```

### 4. Navigation Rules

- **Forward**: Must pass current step validation
- **Backward**: No validation required
- **Step Click**: Validates current step before jumping
- **Submit**: Validates all steps

### 5. Submission

```javascript
const formData = convertToFormData(cleanPayload(values));
addProperty(formData, { onSuccess, onError });
```

## 🎨 Styling & Components

### React Select Customization

```javascript
import { smallSelectStyles } from "@/utils/helper";

<Select
  styles={smallSelectStyles(error)}
  className="select-custom filterSelect"
  classNamePrefix="select"
/>;
```

### Error Display Pattern

```javascript
{
  getFieldError("fieldName") && (
    <div className="text-danger">{getFieldError("fieldName")}</div>
  );
}
```

## 🔧 Integration Guide

### Adding a New Field

1. **Add to Initial Values** (`formConfig.js`)

```javascript
const baseInitials = {
  // ...
  newField: "",
};
```

2. **Add Validation** (`formConfig.js`)

```javascript
baseSchema = {
  // ...
  newField: Yup.string().required("New field is required"),
};
```

3. **Add to Step Fields** (`stepValidation.js`)

```javascript
residentialStepFields = {
  1: [...existingFields, "newField"],
};
```

4. **Add to Component** (e.g., `AddressStep.jsx`)

```javascript
<input
  type="text"
  className={`form-control filterInput ${
    getFieldError("newField") ? "is-invalid" : ""
  }`}
  value={formData.newField || ""}
  onChange={(e) => handleInputChange("newField", e.target.value)}
  onBlur={() => handleBlur("newField")}
/>;
{
  getFieldError("newField") && (
    <div className="text-danger">{getFieldError("newField")}</div>
  );
}
```

5. **Add to FormData** (`formConfig.js`)

```javascript
safeAppend("newField", values.newField);
```

### Using Location Autocomplete in Other Forms

```javascript
import { usePlacesAutocomplete } from "@/hooks/usePlacesAutocomplete";

const { options, isLoading, fetchPlaceDetails } = usePlacesAutocomplete({
  input: inputValue,
  enabled: true,
});

// On selection
const details = await fetchPlaceDetails(placeId);
// details = { placeId, placeName, formattedAddress, coordinates }
```

## 🐛 Common Issues & Solutions

### Issue: Area validation not showing

**Solution:** Ensure error message is rendered below the AreaAutocomplete component

```javascript
{
  error && <div className="text-danger mt-1">{error}</div>;
}
```

### Issue: Coordinates not in FormData

**Solution:** Check that `values.area` is an object with `coordinates` property

```javascript
console.log(values.area);
// Should be: { placeId, placeName, formattedAddress, coordinates: {lat, lng} }
```

### Issue: Google Maps not loading

**Solution:** Verify `APIProvider` is wrapping the app in `src/app/layout.js` and `GOOGLE_MAPS_API_KEY` is set

### Issue: Only local results showing

**Solution:** Check bounds configuration in `usePlacesAutocomplete.js` - ensure Ahmedabad bounds are correct

## 📝 Environment Variables

Required in `.env` or `src/utils/config.js`:

```
GOOGLE_MAPS_API_KEY=your_api_key_here
```

**API Requirements:**

- Places API enabled
- Geocoding API enabled (optional, for reverse geocoding)

## 🚀 Future Enhancements

- [ ] Add map preview showing selected location
- [ ] Support multiple cities (currently Ahmedabad-only)
- [ ] Add geolocation to auto-detect user location
- [ ] Cache recent searches locally
- [ ] Add location history/favorites

## 📞 Support

For questions or issues:

1. Check this README
2. Review `formConfig.js` for field definitions
3. Check step validation in `stepValidation.js`
4. Review individual step components for UI/UX

---

**Last Updated:** January 2025
**Maintained By:** Development Team
