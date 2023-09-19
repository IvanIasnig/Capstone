import React from "react";
import WeeklyMealPlan from "../component/WeeklyMealPlan";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function Diet() {
  return (
    <Box
      sx={{
        backgroundImage:
          "url('https://img.wallpapic.it/i5921-731-915/medium/frutta-e-verdura-frutti-di-bosco-rossi-sfondo.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        color: "white",
      }}
    >
      <div className="p-3 ">
        <div className="form-group">
          <label htmlFor="diet" className="text-white">
            Select your diet:
          </label>
          <select
            className="form-select form-select-lg bg-dark text-white border-0 rounded"
            id="dieta"
            style={{ opacity: 0.7 }}
          >
            <option value="mediterranea">Dieta Mediterranea</option>
            <option value="vegana">Dieta Vegana</option>
            <option value="vegetariana">Dieta Vegetariana</option>
          </select>
        </div>
      </div>
      <WeeklyMealPlan />
    </Box>
  );
}

export default Diet;
