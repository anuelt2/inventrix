import API from "../utils/api";

const API_BASE_URL = "/auth";

// Login function
export const loginUser = async (credentials) => {
  try {
    const response = await API.post(`${API_BASE_URL}/login`, credentials);

    localStorage.setItem("access_token", response.data.tokens.access);

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed. Try again";
  }
};

// Fetch user details
export const fetchUserData = async () => {
  try {
    const response = await API.get(`${API_BASE_URL}/me`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Fetching user data failed";
  }
};

// Logout function
export const logoutUser = async () => {
  try {
    await API.post(`${API_BASE_URL}/logout`);
  } catch (error) {
    throw error.response?.data?.message || "Logout failed. Try again";
  } finally {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    delete API.defaults.headers.common["Authorization"];
  }
};

// Register function
export const registerUser = async (userData) => {
  try {
    const response = await API.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed. Try again";
  }
};
