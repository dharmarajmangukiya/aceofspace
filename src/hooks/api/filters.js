import api from "@/utilis/axiosInstance";
import { useQuery } from "@tanstack/react-query";

// Get Rent Amenities
export const useGetRentAmenities = () => {
  return useQuery({
    queryKey: ["rentAmenities"],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await api.get("/filters/rent-amenities");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Get Lease Amenities
export const useGetLeaseAmenities = () => {
  return useQuery({
    queryKey: ["leaseAmenities"],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await api.get("/filters/lease-amenities");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Get Lease Facilities
export const useGetLeaseFacilities = () => {
  return useQuery({
    queryKey: ["leaseFacilities"],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await api.get("/filters/lease-facilities");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Get Property Types
export const useGetPropertyTypes = () => {
  return useQuery({
    queryKey: ["propertyTypes"],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await api.get("/filters/property-types");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Get Locations
export const useGetLocations = () => {
  return useQuery({
    queryKey: ["locations"],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await api.get("/filters/locations");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Get Furnishing Status Options
export const useGetFurnishingStatus = () => {
  return useQuery({
    queryKey: ["furnishingStatus"],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await api.get("/filters/furnishing-status");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Get Age of Property Options
export const useGetAgeOfProperty = () => {
  return useQuery({
    queryKey: ["ageOfProperty"],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await api.get("/filters/age-of-property");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Get Available For Options
export const useGetAvailableFor = () => {
  return useQuery({
    queryKey: ["availableFor"],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await api.get("/filters/available-for");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Get Zone Type Options
export const useGetZoneTypes = () => {
  return useQuery({
    queryKey: ["zoneTypes"],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await api.get("/filters/zone-types");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Get Floor Preference Options
export const useGetFloorPreferences = () => {
  return useQuery({
    queryKey: ["floorPreferences"],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await api.get("/filters/floor-preferences");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};
