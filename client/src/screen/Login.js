import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        formData
      );
      const token = response.data.token;

      // token nel localStorage
      localStorage.setItem("authToken", token);
    } catch (error) {
      console.error("Errore durante il login:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="mail"
        name="mail"
        placeholder="e-mail"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">Accedi</button>
    </form>
  );
}

export default Login;
