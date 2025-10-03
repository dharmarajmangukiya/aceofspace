import api from "@/utilis/axiosInstance";
import { useMutation } from "@tanstack/react-query";

// Utility functions for localStorage token management
export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return (
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
    );
  }
  return null;
};

export const getUserData = () => {
  if (typeof window !== "undefined") {
    const userData =
      localStorage.getItem("userData") || sessionStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const isRememberMe = () => {
  return typeof window !== "undefined" && localStorage.getItem("rememberMe");
};

export const clearAuthData = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userData");
    localStorage.removeItem("rememberMe");
  }
};

// Login mutation
export const useSignIn = () => {
  return useMutation({
    mutationKey: ["signIn"],
    mutationFn: async (credentials) => {
      try {
        const { rememberMe, ...data } = credentials;
        const response = await api.post("/auth/login", data);

        // Handle successful login - store token in localStorage
        if (response?.data?.token || response?.data?.accessToken) {
          const token = response.data.token || response.data.accessToken;
          if (rememberMe) {
            localStorage.setItem("authToken", token);
          } else {
            sessionStorage.setItem("authToken", token);
          }

          // Store user data if provided
          if (response.data?.user) {
            if (rememberMe) {
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
        const response = await api.post("/auth/register", {
          ...payload,
          role: "user",
        });

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

// Get user data from localStorage (synchronous)
export const useGetUserData = () => {
  return getUserData();
};

// OTP Verification mutation
export const useVerifyOtp = () => {
  return useMutation({
    mutationKey: ["verifyOtp"],
    mutationFn: async (payload) => {
      try {
        const response = await api.post("/auth/verify-otp", payload);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
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
