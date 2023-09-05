import React from "react";

const HomeScreen = () => {
  return (
    <>
      <div className="card" style={{ height: "200px" }}>
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <div className="m-1">Already have an account?</div>
          <button className="btn btn-primary m-1">Login</button>
          <div className="m-1">or</div>
          <button className="btn btn-primary m-1">Register</button>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
