import React, { useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

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
      navigate("/userProfile");
    } catch (error) {
      console.error("Errore durante il login:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-50 mx-auto mt-5">
      <h3 className="text-center mb-3">Login</h3>
      <div className="form-floating mb-3">
        <input
          type="email"
          id="email"
          name="mail"
          className="form-control"
          placeholder="name@example.com"
          onChange={handleChange}
        />
        <label htmlFor="email">E-mail</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="password"
          id="password"
          name="password"
          className="form-control"
          placeholder="Password"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Login
      </button>
    </form>
  );
}

export default Login;
