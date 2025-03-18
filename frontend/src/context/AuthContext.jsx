import React, { createContext, useState, useEffect } from "react";
import { loginUser, fetchUserData, logoutUser } from "../services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [error, setError] = useState("");

  // Fetch user details with access token
  useEffect(() => {
    const getUser = async () => {
      if (accessToken) {
        try {
          const userData = await fetchUserData();
          setUser(userData);
        } catch (error) {
          setError(error);
          logout();
        }
      }
    };

    getUser();
  }, [accessToken]);

  // Login function
  const login = async (credentials) => {
    try {
      const { accessToken, refreshToken } = await loginUser(credentials);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setAccessToken(accessToken);
    } catch (error) {
      setError(error);
    }
  };

  // Logout function
  const logout = () => {
    logoutUser();
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
