import axios from "axios";

// Create a pre-configured Axios instance for client API calls
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Attach Authorization header if a token is available in localStorage
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Basic response interceptor (extend as needed)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: handle 401/403 globally if needed
    return Promise.reject(error);
  }
);

export default api;
