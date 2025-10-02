import api from "@/utilis/axiosInstance";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

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

// Get Properties
export const useGetProperties = (searchParams) => {
  return useInfiniteQuery({
    queryKey: ["properties", searchParams],
    enabled: true,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await api.get("/properties", {
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

// Add Property
export const useAddProperty = () => {
  return useMutation({
    mutationFn: async (data) => {
      try {
        const response = await api.post("/properties", data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Update Property
export const useUpdateProperty = () => {
  return useMutation({
    mutationFn: async (data) => {
      try {
        const response = await api.put(`/properties/${data.id}`, data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};
