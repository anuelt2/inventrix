import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, fetchUserData, logoutUser } from "../services/AuthService";

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
    const response = await loginUser(credentials);
    const { access, refresh } = response.tokens;

    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    setAccessToken(access);

    const userData = await fetchUserData();
    setUser(userData);

    navigate("/dashboard");
  };

  // Logout function
  const logout = () => {
    logoutUser();
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
