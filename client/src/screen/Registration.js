import React, { useState } from "react";
import { useAuth } from "../provider/AuthProvider";

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
    height: "",
    weight: "",
    activity: "",
  });

  const [step, setStep] = useState(0);

  const formFields = [
    { label: "Cognome", name: "surname", type: "text" },
    { label: "Nome", name: "name", type: "text" },
    { label: "Età", name: "age", type: "number" },
    { label: "Sesso", name: "sex", type: "text" },
    { label: "Password", name: "password", type: "password" },
    { label: "Email", name: "mail", type: "email" },
    { label: "Nome utente", name: "username", type: "text" },
    { label: "Ruolo", name: "role", type: "text" },
    { label: "Altezza", name: "height", type: "number" },
    { label: "Peso", name: "weight", type: "number" },
    { label: "Attività", name: "activity", type: "text" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { register } = useAuth();

  const handleNext = () => {
    if (step < formFields.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      await register(formData);
      console.log("Registrazione riuscita!");
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
    }
  };

  return (
    <div style={{ width: "300px", overflow: "hidden" }}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div
          style={{
            display: "flex",
            transform: `translateX(-${step * 300}px)`,
            transition: "transform 0.3s",
          }}
        >
          {formFields.map((field, index) => (
            <div key={index} style={{ minWidth: "300px" }}>
              <div>
                <label>{field.label}</label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                />
              </div>
              {index === formFields.length - 1 ? (
                <button onClick={handleSubmit}>Register!</button>
              ) : (
                <button onClick={handleNext}>Next</button>
              )}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default Registration;
