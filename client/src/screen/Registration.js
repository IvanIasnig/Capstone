import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
} from "mdb-react-ui-kit";
import { useAuth } from "../provider/AuthProvider";

function RegistrationApp() {
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
    { label: "Cognome", name: "surname", type: "text" },
    { label: "Nome", name: "name", type: "text" },
    { label: "Età", name: "age", type: "number" },
    { label: "Sesso", name: "sex", type: "text" },
    { label: "Password", name: "password", type: "password" },
    { label: "Email", name: "mail", type: "email" },
    { label: "Nome utente", name: "username", type: "text" },
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

  const handleSubmit = async () => {
    try {
      await register(formData);
      console.log("Registrazione riuscita!");
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
    }
  };

  return (
    <MDBContainer
      fluid
      style={{
        background:
          "linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))",
      }}
    >
      <MDBCard
        className="text-white m-5"
        style={{
          borderRadius: "25px",
          minHeight: "100vh",
          background: "black",
        }}
      >
        <MDBCardBody>
          <MDBRow>
            <MDBCol md="10" lg="6" className="order-2 order-lg-1">
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Sign up
              </p>

              {formFields.map((field, index) => (
                <div
                  key={index}
                  className="d-flex flex-column align-items-start mb-4"
                >
                  <label>{field.label}</label>
                  {field.name === "sex" ? (
                    <MDBInput
                      id={`form${index}`}
                      type="text"
                      className="w-100"
                      name="sex"
                      placeholder="M/F"
                      value={formData["sex"] || ""}
                      onChange={handleChange}
                    />
                  ) : field.name === "activity" ? (
                    <select
                      className="form-control"
                      name="activity"
                      onChange={handleChange}
                    >
                      <option value="" disabled selected>
                        Seleziona l'attività
                      </option>
                      <option value="SEDENTARY">SEDENTARY</option>
                      <option value="MILDLY">MILDLY</option>
                      <option value="MODERATLY">MODERATLY</option>
                      <option value="VERY">VERY</option>
                      <option value="EXTRA">EXTRA</option>
                    </select>
                  ) : (
                    <MDBInput
                      id={`form${index}`}
                      type={field.type || "text"}
                      className="w-100"
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}

              <MDBBtn className="mb-4" size="lg" onClick={handleSubmit}>
                Register
              </MDBBtn>
            </MDBCol>

            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
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
