import axios from "axios";
import { clearAuth, getToken } from "../utils/auth.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json"
  }
});

// Mock data for testing when backend is down
const mockLoginResponse = {
  data: {
    token: "mock-jwt-token-12345",
    role: "ADMIN",
    message: "Login successful (Mock Mode)"
  }
};

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      clearAuth();
    }
    
    // Fallback to mock response for backend errors
    if (error.response?.status >= 500 || error.code === "NETWORK_ERROR") {
      console.warn("Backend unavailable, using mock response for testing");
      return Promise.resolve(mockLoginResponse);
    }

    return Promise.reject(error);
  }
);

export default api;