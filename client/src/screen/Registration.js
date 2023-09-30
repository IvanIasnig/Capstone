import React, { useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { Button } from "@mui/material";
import { useAuth } from "../provider/AuthProvider";
import gymLogin from "../images/gymLogin.jpg";
import { useNavigate } from "react-router-dom";

function RegistrationApp() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    surname: "",
    name: "",
    age: "",
    sex: "",
    password: "",
    mail: "",
    username: "",
    height: "",
    weight: "",
    activity: "",
  });

  const formFields = [
    { label: "Surname", name: "surname", type: "text" },
    { label: "Name", name: "name", type: "text" },
    { label: "Age", name: "age", type: "number" },
    { label: "Sex", name: "sex", type: "text" },
    { label: "Password", name: "password", type: "password" },
    { label: "Email", name: "mail", type: "email" },
    { label: "Username", name: "username", type: "text" },
    { label: "Height", name: "height", type: "number" },
    { label: "Weight", name: "weight", type: "number" },
    { label: "Activity", name: "activity", type: "text" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { register } = useAuth();

  const handleSubmit = async () => {
    try {
      await register(formData);
      await login({ mail: formData.mail, password: formData.password });
      navigate("/userProfile");
      console.log("Registrazione riuscita!");
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
    }
  };

  return (
    <>
      <MDBContainer
        fluid
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${gymLogin})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "2%",
          paddingBottom: "2%",
        }}
      >
        <MDBCard
          className="text-white"
          style={{
            borderRadius: "25px",
            width: "50vw",
            background: "rgba(0, 0, 0, 0.8)",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <MDBCardBody>
            <MDBRow>
              <MDBCol md="12" lg="12" className="mb-4 px-5">
                <p className="text-center h1 fw-bold mb-5">Sign up</p>
                {formFields.map((field, index) => (
                  <div
                    key={index}
                    className="d-flex flex-column align-items-start mb-3"
                  >
                    <label className="mb-2">{field.label}</label>
                    {field.name === "sex" ? (
                      <select
                        className="form-control"
                        name="sex"
                        onChange={handleChange}
                        value={formData["sex"]}
                      >
                        <option value="" disabled>
                          Select sex:
                        </option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                      </select>
                    ) : field.name === "activity" ? (
                      <select
                        className="form-control"
                        name="activity"
                        onChange={handleChange}
                        value={formData["activity"]}
                      >
                        <option value="" disabled>
                          Select activity:
                        </option>
                        <option value="SEDENTARY">One per week</option>
                        <option value="MILDLY">Two per week</option>
                        <option value="MODERATLY">Three per week</option>
                        <option value="VERY">Five per week</option>
                        <option value="EXTRA">Six per week</option>
                      </select>
                    ) : (
                      <input
                        id={`form${index}`}
                        type={field.type || "text"}
                        className="form-control"
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                      />
                    )}
                  </div>
                ))}
                <div className="text-center">
                  <Button
                    className="px-3 py-2 mt-2 "
                    size="lg"
                    onClick={handleSubmit}
                    sx={{
                      backgroundColor: "black",
                      color: "green",
                      fontSize: "18px",
                      "&:hover": {
                        backgroundColor: "orange",
                      },
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    Register
                  </Button>
                </div>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="d-none d-lg-flex align-items-center"
              ></MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
}

export default RegistrationApp;

// import React, { useState } from "react";
// import { useAuth } from "../provider/AuthProvider";

// function Registration() {
//   const [formData, setFormData] = useState({
//     surname: "",
//     name: "",
//     age: "",
//     sex: "",
//     password: "",
//     mail: "",
//     username: "",
//     height: "",
//     weight: "",
//     activity: "",
//   });

//   const [step, setStep] = useState(0);

//   const formFields = [
//     { label: "Cognome", name: "surname", type: "text" },
//     { label: "Nome", name: "name", type: "text" },
//     { label: "Età", name: "age", type: "number" },
//     { label: "Sesso", name: "sex", type: "text" },
//     { label: "Password", name: "password", type: "password" },
//     { label: "Email", name: "mail", type: "email" },
//     { label: "Nome utente", name: "username", type: "text" },
//     { label: "Altezza", name: "height", type: "number" },
//     { label: "Peso", name: "weight", type: "number" },
//     { label: "Attività", name: "activity", type: "text" },
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const { register } = useAuth();

//   const handleNext = () => {
//     if (step < formFields.length - 1) {
//       setStep(step + 1);
//     } else {
//       handleSubmit();
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       await register(formData);
//       console.log("Registrazione riuscita!");
//     } catch (error) {
//       console.error("Errore durante la registrazione:", error);
//     }
//   };

//   return (
//     <div
//       className="d-block mx-auto"
//       style={{ width: "300px", overflow: "hidden" }}
//     >
//       <form onSubmit={(e) => e.preventDefault()}>
//         <div
//           style={{
//             display: "flex",
//             transform: `translateX(-${step * 300}px)`,
//             transition: "transform 0.3s",
//           }}
//         >
//           {formFields.map((field, index) => (
//             <div key={index} style={{ minWidth: "300px" }}>
//               <div className="form-group">
//                 <label>{field.label}</label>
//                 <input
//                   className="form-control"
//                   type={field.type || "text"}
//                   name={field.name}
//                   value={formData[field.name] || ""}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 {index === formFields.length - 1 ? (
//                   <button className="btn btn-primary" onClick={handleSubmit}>
//                     Register!
//                   </button>
//                 ) : (
//                   <button className="btn btn-primary" onClick={handleNext}>
//                     Next
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Registration;
