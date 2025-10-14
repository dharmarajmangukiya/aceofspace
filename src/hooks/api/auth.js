import api from "@/utils/axiosInstance";
import { authStorage } from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";

// Utility functions for token management using centralized storage
export const getAuthToken = () => authStorage.getAuthToken();

export const getRefreshToken = () => authStorage.getRefreshToken();

export const getUserData = () => authStorage.getUserData();

export const isRememberMe = () => authStorage.isRememberMe();

export const clearAuthData = () => authStorage.clearAuthData();

// Store both tokens based on rememberMe preference
export const storeTokens = (accessToken, refreshToken, rememberMe = false) => {
  return authStorage.setTokens(accessToken, refreshToken, rememberMe);
};

// Store user data based on rememberMe preference
export const storeUserData = (userData, rememberMe = false) => {
  return authStorage.setUserData(userData, rememberMe);
};

// Check if access token is expired (basic JWT decode)
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
};

// Check if refresh token is expired
export const isRefreshTokenExpired = (refreshToken) => {
  if (!refreshToken) return true;

  try {
    const payload = JSON.parse(atob(refreshToken.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    return true;
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

        // Handle successful login - store both tokens
        if (response?.data?.data?.token) {
          const { token, refreshToken, user } = response.data.data;

          // Store both tokens
          storeTokens(token, refreshToken, rememberMe);

          // Store user data if provided
          if (user) {
            storeUserData(user, rememberMe);
          }

          // Dispatch custom event to update auth state instantly
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("authChange"));
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

        // Handle successful registration - store both tokens if auto-login
        if (response?.data?.data?.token) {
          const { token, refreshToken, user } = response.data.data;

          // Store both tokens (default to localStorage for registration)
          storeTokens(token, refreshToken, true);

          // Store user data if provided
          if (user) {
            storeUserData(user, true);
          }

          // Dispatch custom event to update auth state instantly
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("authChange"));
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

// Logout mutation (no API call, just clear localStorage)
export const useLogout = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      // Since there is no API for logout, just clear auth data
      clearAuthData();
      // Dispatch custom event to update auth state instantly
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("authChange"));
      }
      // Optionally, return a resolved value to indicate success
      return { message: "Logged out successfully (local only)" };
    },
  });
};

// Resend OTP mutation
export const useResendOtp = () => {
  return useMutation({
    mutationKey: ["resendOtp"],
    mutationFn: async (payload) => {
      try {
        const response = await api.post("/auth/resend-otp", payload);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Refresh token mutation
export const useRefreshToken = () => {
  return useMutation({
    mutationKey: ["refreshToken"],
    mutationFn: async () => {
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await api.post("/auth/refresh-token", {
          refreshToken,
        });

        // Update tokens if refresh is successful
        if (response?.data?.data?.token) {
          const { token, refreshToken: newRefreshToken } = response.data.data;
          const rememberMe = isRememberMe();

          // Store new tokens
          storeTokens(token, newRefreshToken, rememberMe);

          // Dispatch custom event to update auth state instantly
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("authChange"));
          }
        }

        return response.data;
      } catch (error) {
        // If refresh fails, clear auth data
        clearAuthData();
        throw error;
      }
    },
  });
};

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
