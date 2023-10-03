import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { useAuth } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../component/Logo";
import gymLogin from "../images/gymLogin.jpg";

function Login() {
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });

  const [logoVisible, setLogoVisible] = useState(true);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const logoTimeout = setTimeout(() => {
      setLogoVisible(false);
    }, 5000);

    return () => clearTimeout(logoTimeout);
  }, []);

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
    <MDBContainer
      fluid
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${gymLogin})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          {logoVisible ? (
            <Logo />
          ) : (
            <MDBCard
              className="bg-dark text-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">
                  Please enter your login and password!
                </p>

                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Email address"
                  id="formEmail"
                  name="mail"
                  type="email"
                  size="lg"
                  onChange={handleChange}
                />

                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Password"
                  id="formPassword"
                  name="password"
                  type="password"
                  size="lg"
                  onChange={handleChange}
                />

                <button
                  className="btn btn-lg mx-2 px-5 text-white mb-3"
                  onClick={handleSubmit}
                  style={{
                    background: "black",
                    borderColor: "orange",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 15px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  Login
                </button>

                <div>
                  <p className="mb-0">
                    Don't have an account?
                    <Link to="/registration" className="text-white-50 fw-bold">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          )}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
