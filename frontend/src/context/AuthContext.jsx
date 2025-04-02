import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { loginUser, fetchUserData, logoutUser } from "../services/AuthService";
import API from "../utils/api";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // Get current path

  // Fetch user details with access token
  useEffect(() => {
    const getUser = async () => {
      if (accessToken && location.pathname !== "/login") {
        try {
          const userData = await fetchUserData();

          if (!userData) {
            throw new Error("Session expired");
          }

          setUser(userData);
        } catch (error) {
          setError(error.message || "An unexpected error occurred");
          logout();
        }
      }
    };

    if (accessToken) {
      getUser();
    }
  }, [accessToken, location.pathname]);

  useEffect(() => {
    if (user && location.pathname === "/login") {
      navigate("/dashboard");
    }
  }, [user, location.pathname, navigate]);

  // Login function
  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      const { access, refresh } = response.tokens;

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      setAccessToken(access);
      API.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      const userData = await fetchUserData();
      setUser(userData);
    } catch (error) {
      setError(error.message || "Login failed. Try again");
    }
  };

  // Logout function
  const logout = async () => {
    const cancelTokenSource = axios.CancelToken.source();
    try {
      await logoutUser();
    } catch (error) {
      setError(error.message || "Logout failed. Try again");
    } finally {
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      cancelTokenSource.cancel("Logging out, request cancelled");
      delete API.defaults.headers.common["Authorization"];
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
