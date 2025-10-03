import api from "@/utilis/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { clearAuthData, isAuthenticated, isRememberMe } from "./auth";

// Get current user profile
export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    enabled: isAuthenticated(),
    meta: { globalLoader: true },
    queryFn: async () => {
      try {
        const response = await api.get("/auth/profile");

        // Update user data in localStorage if profile is fetched
        if (response.data?.user) {
          if (isRememberMe()) {
            localStorage.setItem(
              "userData",
              JSON.stringify(response.data.user)
            );
          } else {
            sessionStorage.setItem(
              "userData",
              JSON.stringify(response.data.user)
            );
          }
        }

        return response.data;
      } catch (error) {
        // If profile fetch fails, clear auth data
        clearAuthData();
        throw error;
      }
    },
  });
};

// update user
export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async (payload) => {
      try {
        const response = await api.put("/user/update", payload);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// change password
export const useChangePassword = () => {
  return useMutation({
    mutationKey: ["changePassword"],
    mutationFn: async (payload) => {
      try {
        const response = await api.post("/user/change-password", payload);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};
