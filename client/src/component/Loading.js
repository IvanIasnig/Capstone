import React from "react";
import { CircularProgress } from "@mui/material";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "black",
      }}
    >
      <CircularProgress sx={{ color: "white" }} />
    </div>
  );
}

export default Loading;
