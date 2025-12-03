import axios from "axios";

/**
 * BASE URL HANDLING (IMPORTANT)
 *
 * ✔ Auto-detects if you are using localhost
 * ✔ Easily switch to LAN IP without touching code everywhere
 * ✔ Prevents crashes when IP changes
 */

const BACKEND_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// Example:
// Create file: .env
// VITE_API_URL="http://192.168.1.15:4000/api"
// (your laptop WiFi IP address)

export const api = axios.create({
  baseURL: BACKEND_URL,
});

// Automatically attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
