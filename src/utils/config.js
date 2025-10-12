export const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const API_BASE_URL =
  BACKEND_BASE_URL !== "" ? BACKEND_BASE_URL + "/api" : "/api";
export const API_BASE_DOCUMENT_URL =
  BACKEND_BASE_URL !== "" ? BACKEND_BASE_URL + "/assets" : "/assets";

export const GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
