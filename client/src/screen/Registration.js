import { React, useState } from "react";
import axios from "axios";

function Registration() {
  const [formData, setFormData] = useState({
    surname: "",
    name: "",
    age: "",
    sex: "",
    password: "",
    mail: "",
    username: "",
    role: "",
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
        "http://localhost:3001/auth/register",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="surname"
        placeholder="Cognome"
        onChange={handleChange}
      />
      <input
        type="text"
        name="name"
        placeholder="Nome"
        onChange={handleChange}
      />
      <input
        type="number"
        name="age"
        placeholder="Età"
        onChange={handleChange}
      />
      <input
        type="text"
        name="sex"
        placeholder="Sesso (M/F)"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <input
        type="email"
        name="mail"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        type="text"
        name="username"
        placeholder="Nome utente"
        onChange={handleChange}
      />
      <input
        type="text"
        name="role"
        placeholder="Ruolo"
        onChange={handleChange}
      />
      <button type="submit">Registrati</button>
    </form>
  );
}

export default Registration;
