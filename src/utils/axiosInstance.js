import axios from "axios";
import { API_BASE_URL } from "./config";
import { authStorage } from "./storage";

// Create a pre-configured Axios instance for client API calls
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue = [];

// Process failed requests after token refresh
const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

// Attach Authorization header if a token is available
api.interceptors.request.use((config) => {
  const token = authStorage.getAuthToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle both HTTP and logical errors
api.interceptors.response.use(
  async (response) => {
    const resData = response?.data;

    // If API returns status 0, treat it as an error
    if (resData?.status === 0) {
      return Promise.reject({
        response,
        message: resData.message || "Something went wrong",
      });
    }

    console.log(resData?.status, "resData?.status");
    // If API returns status 2, treat it as unauthorized (trigger token refresh)
    if (resData?.status === 2) {
      console.log("Status 2 detected, attempting token refresh");
      const originalRequest = response.config;

      // Create error to pass to refresh handler
      const error = new Error(resData.message || "Unauthorized");
      error.config = originalRequest;
      error.response = response;
      error.request = response.request;
      error.isAxiosError = true;
      error.response.status = 401;

      // Handle refresh logic
      if (!originalRequest._retry) {
        if (isRefreshing) {
          // If already refreshing, queue the request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return api(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshToken = authStorage.getRefreshToken();

          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          const refreshResponse = await axios.post(
            `${API_BASE_URL}/auth/refresh-token`,
            { refreshToken },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (refreshResponse?.data?.data?.token) {
            const { token, refreshToken: newRefreshToken } =
              refreshResponse.data.data;
            const rememberMe = authStorage.isRememberMe();

            // Store new tokens using centralized storage
            authStorage.setTokens(token, newRefreshToken, rememberMe);

            // Update the original request with new token
            originalRequest.headers.Authorization = `Bearer ${token}`;

            // Process queued requests
            processQueue(null, token);

            return api(originalRequest);
          } else {
            throw new Error("Invalid refresh response");
          }
        } catch (refreshError) {
          // If refresh fails, clear auth data using centralized storage
          authStorage.clearAuthData();

          // Optionally redirect to login page
          // window.location.href = "/auth/login";

          processQueue(refreshError, null);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
    }

    // Otherwise, pass the successful response through
    return response;
  },
  async (error) => {
    console.log(
      "Error handler entered",
      error.response?.status,
      "error.response?.status"
    );
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("Inside 401 check, attempting token refresh");
      if (isRefreshing) {
        // If already refreshing, queue the request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = authStorage.getRefreshToken();

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          { refreshToken },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response?.data?.data?.token) {
          const { token, refreshToken: newRefreshToken } = response.data.data;
          const rememberMe = authStorage.isRememberMe();

          // Store new tokens using centralized storage
          authStorage.setTokens(token, newRefreshToken, rememberMe);

          // Update the original request with new token
          originalRequest.headers.Authorization = `Bearer ${token}`;

          // Process queued requests
          processQueue(null, token);

          return api(originalRequest);
        } else {
          throw new Error("Invalid refresh response");
        }
      } catch (refreshError) {
        // If refresh fails, clear auth data using centralized storage
        authStorage.clearAuthData();

        // Optionally redirect to login page
        // window.location.href = "/auth/login";

        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other HTTP-level errors (network, 4xx, 5xx)
    return Promise.reject(error);
  }
);

export default api;
