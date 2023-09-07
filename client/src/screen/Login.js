import React, { useState } from "react";
import { useAuth } from "../provider/AuthProvider";

function Login() {
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });

  const { login } = useAuth();

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
      await login({ mail: formData.mail, password: formData.password });
    } catch (error) {
      console.error("Errore durante il login:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
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
