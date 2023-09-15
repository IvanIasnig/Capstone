import React from "react";

import WeeklyMealPlan from "../component/WeeklyMealPlan";

function Diet() {
  return (
    <div>
      <form>
        <div>
          <label htmlFor="dieta">Scegli la tua dieta: </label>
          <select id="dieta">
            <option value="mediterranea">Dieta Mediterranea</option>
            <option value="vegana">Dieta Vegana</option>
            <option value="vegetariana">Dieta Vegetariana</option>
          </select>
        </div>
      </form>
      <WeeklyMealPlan />
    </div>
  );
}

export default Diet;
