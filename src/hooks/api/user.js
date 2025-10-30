import { AuthContext } from "@/Layouts/AuthProvider";
import api from "@/utils/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { clearAuthData, isRememberMe, storeUserData } from "./auth";

// Get current user profile
export const useGetProfile = () => {
  const { isAuth } = useContext(AuthContext);
  const rememberMe = isRememberMe();

  return useQuery({
    queryKey: ["profile", isAuth],
    enabled: isAuth,
    meta: { globalLoader: true },
    queryFn: async () => {
      try {
        const response = await api.get("/user/profile");

        // Update user data in localStorage if profile is fetched
        console.log("response.data.data", response.data.data);
        if (response?.data?.data) {
          storeUserData(response.data.data, true);
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("authChange"));
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
