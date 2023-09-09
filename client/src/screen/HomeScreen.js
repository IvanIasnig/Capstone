import { Link } from "react-router-dom";
import React from "react";

const HomeScreen = () => {
  return (
    <>
      <div className="card">
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <div className="m-1">Already have an account?</div>
          <Link
            to="/login"
            className="btn btn-primary m-1 text-decoration-none"
          >
            Login
          </Link>
          <div className="m-1">or</div>
          <Link
            to="/registration"
            className="btn btn-primary m-1 text-decoration-none"
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
