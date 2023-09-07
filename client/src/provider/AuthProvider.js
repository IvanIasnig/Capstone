import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthProvider(props) {
  const [authToken, setAuthToken] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        credentials
      );
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      setAuthToken(token);
    } catch (error) {
      console.error("Errore durante il login:", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        userData
      );
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      setAuthToken(token);
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
      throw error;
    }
  };

  const value = {
    authToken,
    login,
    register,
  };

  return <AuthContext.Provider value={value} {...props} />;
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
