import React from "react";
import Lottie from "lottie-react";
import errorLottie from "../images/404.json";

function ErrorPage() {
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
          fontSize: "2rem",
          paddingBottom: "10%",
        }}
      >
        Page Not Found
      </div>
      <Lottie
        animationData={errorLottie}
        loop={true}
        style={{ height: "100vh" }}
      />
      ;
    </div>
  );
}

export default ErrorPage;
