import { createContext, useContext, useEffect, useState } from "react";
import { setLogoutHandler, setTokenProvider } from "../api/client";

const AuthContext = createContext(null);

const getSavedToken = () => {
  return localStorage.getItem("token");
};

const getSavedUser = () => {
  try {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(getSavedUser);
  const [token, setToken] = useState(getSavedToken);
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!getSavedUser() && !!getSavedToken(),
  );

  // Providing latest token to api client directly through state
  useEffect(() => {
    setTokenProvider(() => token);
  }, [token]);

  // Triggers logout when token expires in api client
  useEffect(() => {
    setLogoutHandler(logout);
  }, []);

  const signup = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);
    setIsAuthenticated(true);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenValue);
  };

  const login = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);
    setIsAuthenticated(true);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenValue);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ login, signup, logout, user, token, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
