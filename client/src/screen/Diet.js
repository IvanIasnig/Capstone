import React from "react";
import WeeklyMealPlan from "../component/WeeklyMealPlan";
import NavBar from "../component/Navbar";
import Bg from "../images/foodbg.jpg";

function Diet() {
  return (
    <div
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        color: "white",
      }}
    >
      <NavBar />

      {/* <div className="p-3 ">
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
        </div> */}
      <WeeklyMealPlan />
    </div>
  );
}

export default Diet;
