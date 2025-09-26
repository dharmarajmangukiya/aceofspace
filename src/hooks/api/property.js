import api from "@/utilis/axiosInstance";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

// Get Rental Properties
export const useGetRentalProperties = (params) => {
  return useInfiniteQuery({
    queryKey: ["rentalProperties", params],
    enabled: true,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await api.get("/properties/rental", {
          params: { ...params, page: pageParam },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.pagination?.isNextPage) return undefined;
      return allPages.length + 1;
    },
  });
};

// Get Lease Properties
export const useGetLeaseProperties = (params) => {
  return useInfiniteQuery({
    queryKey: ["leaseProperties", params],
    enabled: true,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await api.get("/properties/lease", {
          params: { ...params, page: pageParam },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.pagination?.isNextPage) return undefined;
      return allPages.length + 1;
    },
  });
};

// Get Property Detail by ID
export const useGetPropertyDetail = (propertyId) => {
  return useQuery({
    queryKey: ["propertyDetail", propertyId],
    enabled: !!propertyId,
    queryFn: async () => {
      try {
        const response = await api.get(`/properties/${propertyId}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Get Featured Properties
export const useGetFeaturedProperties = (params) => {
  return useQuery({
    queryKey: ["featuredProperties", params],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await api.get("/properties/featured", { params });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Get Best Deals Properties
export const useGetBestDeals = (params) => {
  return useQuery({
    queryKey: ["bestDeals", params],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await api.get("/properties/best-deals", { params });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Search Properties
export const useSearchProperties = (searchParams) => {
  return useInfiniteQuery({
    queryKey: ["searchProperties", searchParams],
    enabled: true,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await api.get("/properties/search", {
          params: { ...searchParams, page: pageParam },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.pagination?.isNextPage) return undefined;
      return allPages.length + 1;
    },
  });
};

// Get Properties by Location
export const useGetPropertiesByLocation = (location, params) => {
  return useInfiniteQuery({
    queryKey: ["propertiesByLocation", location, params],
    enabled: !!location,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await api.get(`/properties/location/${location}`, {
          params: { ...params, page: pageParam },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.pagination?.isNextPage) return undefined;
      return allPages.length + 1;
    },
  });
};

// Get Properties by Type
export const useGetPropertiesByType = (propertyType, params) => {
  return useInfiniteQuery({
    queryKey: ["propertiesByType", propertyType, params],
    enabled: !!propertyType,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await api.get(`/properties/type/${propertyType}`, {
          params: { ...params, page: pageParam },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.pagination?.isNextPage) return undefined;
      return allPages.length + 1;
    },
  });
};

// Contact Property Owner/Agent
export const useContactProperty = () => {
  return useMutation({
    mutationKey: ["contactProperty"],
    mutationFn: async (contactData) => {
      try {
        const response = await api.post("/properties/contact", contactData);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Save Property to Favorites
export const useSaveProperty = () => {
  return useMutation({
    mutationKey: ["saveProperty"],
    mutationFn: async (propertyId) => {
      try {
        const response = await api.post(`/properties/${propertyId}/save`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Get Saved Properties
export const useGetSavedProperties = () => {
  return useQuery({
    queryKey: ["savedProperties"],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await api.get("/properties/saved");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};
