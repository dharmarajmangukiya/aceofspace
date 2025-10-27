"use client";
export const PAGE_SIZE = 10;

export const role_enum = {
  USER: "user",
  ADMIN: "admin",
};

export const propertyTypeOptions = {
  // residential - rent
  residential: [
    {
      label: "All",
      value: "All",
      defaultChecked: true,
    },
    { label: "Appartments", value: "Appartments" },
    { label: "Bunglow", value: "Bunglow" },
    { label: "House", value: "House" },
    { label: "Villa", value: "Villa" },
  ],
  // commercial - lease
  commercial: [
    {
      label: "All",
      value: "All",
      defaultChecked: true,
    },
    { label: "Office", value: "Office" },
    { label: "Showroom", value: "Showroom" },
  ],
};

export const locationOptions = [
  { value: "All", label: "All" },
  { value: "Navrangpura", label: "Navrangpura" },
  { value: "Bopal", label: "Bopal" },
  { value: "Satellite", label: "Satellite" },
  { value: "Maninagar", label: "Maninagar" },
  { value: "SG Highway", label: "SG Highway" },
  { value: "Chandkheda", label: "Chandkheda" },
  { value: "Vastrapur", label: "Vastrapur" },
  { value: "Thaltej", label: "Thaltej" },
  { value: "Bodakdev", label: "Bodakdev" },
  { value: "Ambawadi", label: "Ambawadi" },
  { value: "Gota", label: "Gota" },
  { value: "Prahlad Nagar", label: "Prahlad Nagar" },
  { value: "Naranpura", label: "Naranpura" },
  { value: "Paldi", label: "Paldi" },
  { value: "Isanpur", label: "Isanpur" },
  { value: "Shahibaug", label: "Shahibaug" },
  { value: "Ellis Bridge", label: "Ellis Bridge" },
  { value: "Nikol", label: "Nikol" },
  { value: "Naroda", label: "Naroda" },
  { value: "Gulbai Tekra", label: "Gulbai Tekra" },
  { value: "Kankaria", label: "Kankaria" },
  { value: "Odhav", label: "Odhav" },
  { value: "Ranip", label: "Ranip" },
  { value: "Vejalpur", label: "Vejalpur" },
  { value: "Jodhpur", label: "Jodhpur" },
  { value: "Memnagar", label: "Memnagar" },
  { value: "Sola", label: "Sola" },
];

export const furnishingStatusOptions = [
  { label: "Furnished", value: "Furnished" },
  { label: "Semi furnished", value: "Semi furnished" },
  { label: "unfurnished", value: "unfurnished" },
];

export const ageOfPropertyOptions = [
  { value: "0-1", label: "0 to 1" },
  { value: "1-5", label: "1 to 5" },
  { value: "5-10", label: "5 to 10" },
  { value: "10+", label: "10+" },
];

export const availableForOptions = [
  { label: "Family", value: "Family" },
  { label: "Student", value: "Student" },
  { label: "Single men", value: "Single men" },
  { label: "Single women", value: "Single women" },
];

export const amenitiesOptions = [
  { label: "Lift", icon: "/images/icon/lift.svg", value: "lift" },
  { label: "Intercom", icon: "/images/icon/lift.svg", value: "intercom" },
  { label: "Garden", icon: "/images/icon/lift.svg", value: "garden" },
  { label: "Sports", icon: "/images/icon/lift.svg", value: "sports" },
  {
    label: "Kids Area",
    icon: "/images/icon/lift.svg",
    value: "kids_area",
  },
  { label: "CCTV", icon: "/images/icon/lift.svg", value: "cctv" },
  {
    label: "Gated Community",
    icon: "/images/icon/lift.svg",
    value: "gated_community",
  },
  {
    label: "Club House",
    icon: "/images/icon/lift.svg",
    value: "club_house",
  },
  {
    label: "Community Hall",
    icon: "/images/icon/lift.svg",
    value: "community_hall",
  },
  {
    label: "Regular Water Supply",
    icon: "/images/icon/lift.svg",
    value: "regular_water_supply",
  },
  {
    label: "Amphitheater",
    icon: "/images/icon/lift.svg",
    value: "amphitheater",
  },
  {
    label: "Tennis Court",
    icon: "/images/icon/lift.svg",
    value: "tennis_court",
  },
  {
    label: "Swimming Pool",
    icon: "/images/icon/lift.svg",
    value: "swimming_pool",
  },
  {
    label: "Vaastu Compliant",
    icon: "/images/icon/lift.svg",
    value: "vaastu_compliant",
  },
  {
    label: "Fire Sprinklers",
    icon: "/images/icon/lift.svg",
    value: "fire_sprinklers",
  },
  {
    label: "Landscaping",
    icon: "/images/icon/lift.svg",
    value: "landscaping",
  },
  { label: "Gymnasium", icon: "/images/icon/lift.svg", value: "gymnasium" },
  {
    label: "Fire Fighting System",
    icon: "/images/icon/lift.svg",
    value: "fire_fighting_system",
  },
  {
    label: "Car Parking",
    icon: "/images/icon/lift.svg",
    value: "car_parking",
  },
  {
    label: "Jogging Track",
    icon: "/images/icon/lift.svg",
    value: "jogging_track",
  },
  {
    label: "Street Lighting",
    icon: "/images/icon/lift.svg",
    value: "street_lighting",
  },
  {
    label: "Staff Quarter",
    icon: "/images/icon/lift.svg",
    value: "staff_quarter",
  },
  {
    label: "Indoor Games",
    icon: "/images/icon/lift.svg",
    value: "indoor_games",
  },
  {
    label: "Rain Water Harvesting",
    icon: "/images/icon/lift.svg",
    value: "rain_water_harvesting",
  },
  {
    label: "24x7 Security",
    icon: "/images/icon/lift.svg",
    value: "24x7_security",
  },
  {
    label: "Power Backup",
    icon: "/images/icon/lift.svg",
    value: "power_backup",
  },
  {
    label: "24x7 CCTV Surveillance",
    icon: "/images/icon/lift.svg",
    value: "24x7_cctv_surveillance",
  },
];

export const buildingAmenitiesOptions = [
  {
    value: "reception_area",
    label: "Reception area",
    icon: "/images/icon/lift.svg",
  },
  { value: "furnished", label: "Furnished", icon: "/images/icon/lift.svg" },
  {
    value: "central_air_conditioning",
    label: "Central Air Conditioning",
    icon: "/images/icon/lift.svg",
  },
  { value: "oxygen_duct", label: "Oxygen Duct", icon: "/images/icon/lift.svg" },
  { value: "ups", label: "UPS", icon: "/images/icon/lift.svg" },
  {
    value: "fire_extinguisher",
    label: "Fire extinguisher",
    icon: "/images/icon/lift.svg",
  },
  {
    value: "fire_sensors",
    label: "Fire sensors",
    icon: "/images/icon/lift.svg",
  },
  { value: "sprinklers", label: "Sprinklers", icon: "/images/icon/lift.svg" },
  { value: "fire_hose", label: "Fire hose", icon: "/images/icon/lift.svg" },
  {
    value: "no_conference_room",
    label: "No Conference room",
    icon: "/images/icon/lift.svg",
  },
];

export const facilitiesOptions = [
  {
    value: "power_backup",
    label: "Power Back-up",
    icon: "/images/icon/lift.svg",
  },
  {
    value: "cafeteria_food_court",
    label: "Cafeteria / Food Court",
    icon: "/images/icon/lift.svg",
  },
  {
    value: "visitor_parking",
    label: "Visitor Parking",
    icon: "/images/icon/lift.svg",
  },
  {
    value: "wheelchair_accessibility",
    label: "WheelChair Accessibility",
    icon: "/images/icon/lift.svg",
  },
  {
    value: "security_personnel",
    label: "Security Personnel",
    icon: "/images/icon/lift.svg",
  },
  {
    value: "cctv_surveillance",
    label: "CCTV Surveillance",
    icon: "/images/icon/lift.svg",
  },
  {
    value: "maintenance_staff",
    label: "Maintenance Staff",
    icon: "/images/icon/lift.svg",
  },
  { value: "atm", label: "ATM", icon: "/images/icon/lift.svg" },
  {
    value: "water_storage",
    label: "Water Storage",
    icon: "/images/icon/lift.svg",
  },
  {
    value: "feng_shui_vaastu_compliant",
    label: "Feng Shui / Vaastu Compliant",
    icon: "/images/icon/lift.svg",
  },
  {
    value: "waste_disposal",
    label: "Waste Disposal",
    icon: "/images/icon/lift.svg",
  },
  {
    value: "grade_a_building",
    label: "Grade A Building",
    icon: "/images/icon/lift.svg",
  },
];

export const zoneTypeOptions = [
  { value: "open-spaces", label: "Open Spaces" },
  { value: "agricultural-zone", label: "Agricultural Zone" },
  { value: "special-economic-zone", label: "Special Economic Zone" },
  { value: "natural-conservation-zone", label: "Natural Conservation Zone" },
  { value: "government-use", label: "Government Use" },
  { value: "other", label: "Other" },
  { value: "industrial", label: "Industrial" },
  { value: "commercial", label: "Commercial" },
  { value: "residential", label: "Residential" },
  {
    value: "transport-and-communication",
    label: "Transport and Communication",
  },
  { value: "public-utilities", label: "Public Utilities" },
  { value: "public-and-semi-public-use", label: "Public and Semi Public Use" },
];

export const floorPreferenceOptions = [
  { value: "lower-basement", label: "Lower Basement" },
  { value: "basement", label: "Basement" },
  { value: "lower-ground", label: "Lower Ground" },
  { value: "ground", label: "Ground" },
  { value: "rooftop-terrace", label: "Rooftop/Terrace" },
  { value: "1", label: "1" },
];

export const residentialAmenities = [
  "Basketball court",
  "Squash court",
  "Badminton court",
  "All k...",
  "Fitness/Gym",
  "Swimming pool",
  "Spa",
  "Sauna",
  "Club house",
  "Playground / Kids Play Area",
  "Indoor games",
  "Movie theatre",
  "Garden",
  "24x7 security & surveillance",
  "EV Charging",
  "Jogging Park",
];

const commonManageAccount = {
  title: "MANAGE ACCOUNT",
  items: [
    {
      href: "/dashboard-my-package",
      icon: "flaticon-protection",
      text: "My Package",
    },
    {
      href: "/my-profile",
      icon: "flaticon-user",
      text: "My Profile",
    },
    {
      href: "#",
      icon: "flaticon-logout",
      text: "Logout",
      props: {
        role: "button",
        id: "logoutButton",
        "data-bs-toggle": "modal",
        "data-bs-target": "#globalLogoutModal",
      },
    },
  ],
};

export const getSidebarItems = (role) => {
  if (role === role_enum.ADMIN) {
    return [
      {
        title: "MAIN",
        items: [
          {
            href: "/dashboard",
            icon: "flaticon-discovery",
            text: "Dashboard",
          },
          {
            href: "/kyc-approval",
            icon: "fa-solid fa-id-card",
            text: "Pending KYC",
          },
        ],
      },
      commonManageAccount,
    ];
  } else {
    return [
      {
        title: "MAIN",
        items: [
          {
            href: "/dashboard",
            icon: "flaticon-discovery",
            text: "Dashboard",
          },
          {
            href: "/dashboard-message",
            icon: "flaticon-chat-1",
            text: "Message",
          },
        ],
      },
      {
        title: "MANAGE LISTINGS",
        items: [
          {
            href: "/add-property",
            icon: "flaticon-new-tab",
            text: "Add New Property",
          },
          {
            href: "/my-properties",
            icon: "flaticon-home",
            text: "My Properties",
          },
          {
            href: "/dashboard-my-favourites",
            icon: "flaticon-like",
            text: "My Favorites",
          },
          // {
          //   href: "/dashboard-saved-search",
          //   icon: "flaticon-search-2",
          //   text: "Saved Search",
          // },
          // {
          //   href: "/dashboard-reviews",
          //   icon: "flaticon-review",
          //   text: "Reviews",
          // },
        ],
      },
      commonManageAccount,
    ];
  }
};

export const addPropertyTypes = [
  {
    id: "residential",
    title: "Residential",
    description: "Flats, Bungalows, Houses, Villas",
    icon: "🏠",
    subTypes: ["Flat", "Bungalow", "House", "Villa"],
  },
  {
    id: "commercial",
    title: "Commercial",
    description: "Offices, Shops, Warehouses, Showrooms",
    icon: "🏢",
    subTypes: ["Office", "Shop", "Warehouse", "Showroom"],
  },
];

export const kycDocumentTypeOptions = [
  { value: "aadhar", label: "Aadhar" },
  { value: "pan", label: "Pan" },
  { value: "driving_license", label: "Driving Licence" },
];
