import api from "./axiosInstance.js";

export async function loginUser(credentials) {
  const payload = {
    email: credentials.email,
    password: credentials.password
  };

  const response = await api.post("/auth/login", payload);
  return response;
}

export async function registerUser(payload) {
  const response = await api.post("/auth/register", payload);
  return response;
}