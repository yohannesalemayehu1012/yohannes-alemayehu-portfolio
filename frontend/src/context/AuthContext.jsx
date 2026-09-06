import { useState } from "react";

import { AuthContext } from "./auth-context";

const getStoredUser = () => {
  const storedUser = localStorage.getItem("adminUser");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Failed to parse stored admin user:", error);
    localStorage.removeItem("adminUser");
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const [token, setToken] = useState(() => localStorage.getItem("adminToken"));
  const loading = false;

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);

    localStorage.setItem("adminUser", JSON.stringify(userData));
    localStorage.setItem("adminToken", jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
