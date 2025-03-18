import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT Token to Requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
