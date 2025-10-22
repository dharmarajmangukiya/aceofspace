"use client";
import { queryClient } from "@/Layouts/MainLayout";
import api from "@/utils/axiosInstance";
import { PAGE_SIZE } from "@/utils/constants";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import useDebouncedValue from "../useDebouncedValue";

// Get Property Detail by ID
export const useGetPropertyDetail = (propertyId) => {
  return useQuery({
    queryKey: ["propertyDetail", propertyId],
    enabled: !!propertyId,
    meta: { globalLoader: true },
    queryFn: async () => {
      try {
        const response = await api.get(`/property/${propertyId}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Get Properties with Infinite Scroll
export const useGetProperties = (searchParams) => {
  // Convert URLSearchParams to a serializable object for query key
  const searchParamsObj = searchParams
    ? Object.fromEntries([...searchParams])
    : {};

  return useInfiniteQuery({
    queryKey: ["properties", searchParamsObj],
    enabled: true,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await api.get("/property/list", {
          params: { ...searchParamsObj, page: pageParam },
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
    // Ensure fresh data when search parameters change
    refetchOnMount: "always",
    staleTime: 0,
  });
};

// Add Property
export const useAddProperty = () => {
  return useMutation({
    mutationFn: async (data) => {
      try {
        const response = await api.post("/property/add", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
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
        const { id, ...propertyData } = data;
        const response = await api.put(`/property/update/${id}`, propertyData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Get My Properties
export const useGetMyProperties = (
  page = 1,
  limit = PAGE_SIZE,
  search = "",
  sortBy = ""
) => {
  const { debouncedValue: debouncedSearchValue } = useDebouncedValue(search);
  return useQuery({
    queryKey: ["myProperties", page, limit, debouncedSearchValue, sortBy],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await api.get("/property/my", {
          params: { page, limit, search: debouncedSearchValue, sortBy },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Delete Property
export const useDeleteProperty = () => {
  return useMutation({
    mutationFn: async (propertyId) => {
      try {
        const response = await api.delete(`/property/${propertyId}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Add to Favorites
export const useAddToFavorites = () => {
  return useMutation({
    mutationFn: async (propertyId) => {
      try {
        const response = await api.post("/favorites/add", { propertyId });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data, propertyId) => {
      // Invalidate favorites list queries
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
      // Invalidate property detail query to update favorite status
      queryClient.invalidateQueries({
        queryKey: ["propertyDetail", propertyId],
      });
    },
  });
};

// Get Favorites with Pagination
export const useGetFavorites = (page = 1, limit = PAGE_SIZE) => {
  return useQuery({
    queryKey: ["favorites", page, limit],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await api.get("/favorites/list", {
          params: { page, limit },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Remove from Favorites
export const useRemoveFromFavorites = () => {
  return useMutation({
    mutationFn: async (propertyId) => {
      try {
        const response = await api.delete("/favorites/remove", {
          data: { propertyId },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data, propertyId) => {
      // Invalidate favorites list queries
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
      // Invalidate property detail query to update favorite status
      queryClient.invalidateQueries({
        queryKey: ["propertyDetail", propertyId],
      });
    },
  });
};
