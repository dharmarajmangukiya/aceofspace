export const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const API_BASE_URL =
  BACKEND_BASE_URL !== "" ? BACKEND_BASE_URL + "/api" : "/api";
