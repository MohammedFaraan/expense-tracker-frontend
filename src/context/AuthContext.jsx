import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("currentUserEmail")
      ? { email: localStorage.getItem("currentUserEmail") }
      : null,
  );

  const navigate = useNavigate();

  const signup = async (userData) => {
    const data = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };

    try {
      const res = await axios.post("http://localhost:8000/auth/signup", data, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("currentUserEmail", userData.email);
      localStorage.setItem("token", res.data.access_token);
      setUser({ email: userData.email });
      toast.success("Signup successfull");
      navigate("/");
    } catch (e) {
      toast.error("Login failed! " + e.response?.data?.detail);
      console.error("Login Failed:", e.response?.data?.detail || e.message);
    }
  };

  const login = async (userData) => {
    const data = {
      username: userData.email,
      password: userData.password,
    };

    try {
      const res = await axios.post("http://localhost:8000/auth/login", data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      localStorage.setItem("currentUserEmail", userData.email);
      localStorage.setItem("token", res.data.access_token);
      setUser({ email: userData.email });
      toast.success("Login successfull");
      navigate("/");
    } catch (e) {
      toast.error("Login failed! " + e.response?.data?.detail);
      console.error("Login Failed:", e.response?.data || e.message);
    }
  };

  return (
    <AuthContext.Provider value={{ login, signup, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
