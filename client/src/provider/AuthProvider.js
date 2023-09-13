import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthProvider(props) {
  const [authToken, setAuthToken] = useState(null);
  const [name, setName] = useState(null);
  const [rof, setRof] = useState({});

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        credentials
      );
      const { token, name, ...rof } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("name", name);
      localStorage.setItem("restOfData", JSON.stringify(rof));
      setAuthToken(token);
      setName(name);
      setRof(rof);
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
      const token = response.data;
      localStorage.setItem("authToken", token);
      setAuthToken(token);
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
      throw error;
    }
  };

  const value = {
    authToken,
    name,
    rof,
    login,
    register,
  };

  return <AuthContext.Provider value={value} {...props} />;
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

