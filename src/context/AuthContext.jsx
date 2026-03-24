import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("currentUserEmail")
      ? {email: localStorage.getItem("currentUserEmail")}
      : null,
  );

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
      console.log(res);
      alert("Signup successfull");
    } catch (e) {
      console.log(e);
      console.log(e.response.data);
      alert("Signup failed");
      console.error("Login Failed:", e.response?.data || e.message);
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
      console.log(res);
      alert("Login successfull");
    } catch (e) {
      console.log(e);
      alert("Login failed");
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
