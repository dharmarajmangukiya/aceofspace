import api from "@/utilis/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";

// Utility functions for localStorage token management
export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

export const getUserData = () => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const clearAuthData = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  }
};

// Login mutation
export const useSignIn = () => {
  return useMutation({
    mutationKey: ["signIn"],
    mutationFn: async (credentials) => {
      try {
        const response = await api.post("/auth/signin", credentials);

        // Handle successful login - store token in localStorage
        if (response.data?.token || response.data?.accessToken) {
          const token = response.data.token || response.data.accessToken;
          localStorage.setItem("authToken", token);

          // Store user data if provided
          if (response.data?.user) {
            localStorage.setItem(
              "userData",
              JSON.stringify(response.data.user)
            );
          }
        }

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Register mutation
export const useSignUp = () => {
  return useMutation({
    mutationKey: ["signUp"],
    mutationFn: async (payload) => {
      try {
        const response = await api.post("/auth/signup", payload);

        // Handle successful registration - store token in localStorage if auto-login
        if (response.data?.token || response.data?.accessToken) {
          const token = response.data.token || response.data.accessToken;
          localStorage.setItem("authToken", token);

          // Store user data if provided
          if (response.data?.user) {
            localStorage.setItem(
              "userData",
              JSON.stringify(response.data.user)
            );
          }
        }

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Forgot password mutation
export const useForgotPassword = () => {
  return useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: async (email) => {
      try {
        const response = await api.post("/auth/forgot-password", { email });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Reset password mutation
export const useResetPassword = () => {
  return useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: async (payload) => {
      try {
        const response = await api.post("/auth/reset-password", payload);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Get current user profile
export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    enabled: isAuthenticated(),
    queryFn: async () => {
      try {
        const response = await api.get("/auth/profile");

        // Update user data in localStorage if profile is fetched
        if (response.data?.user) {
          localStorage.setItem("userData", JSON.stringify(response.data.user));
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

// Get user data from localStorage (synchronous)
export const useGetUserData = () => {
  return getUserData();
};

// Logout mutation
export const useLogout = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      try {
        const response = await api.post("/auth/logout");

        // Clear localStorage on logout
        clearAuthData();

        return response.data;
      } catch (error) {
        // Even if API call fails, clear localStorage
        clearAuthData();
        throw error;
      }
    },
  });
};
