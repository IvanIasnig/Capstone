import React from "react";
import axios from "axios";
import { useState } from "react";
import WeeklyMealPlan from "../component/WeeklyMealPlan";

function Diet() {
  const [foodQuery, setFoodQuery] = useState("");
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const KEY = "d802a615ff134b103d4b0a29cdf27e04";
  const ID = "43f50be8";

  const BASE_URL = `https://api.edamam.com/api/nutrition-data?app_id=${ID}&app_key=${KEY}&nutrition-type=cooking&ingr=${foodQuery}`;

  async function fetchNutritionInfo() {
    try {
      const response = await axios.get(BASE_URL);
      console.log(response.data);
      setApiData(response.data);
    } catch (error) {
      console.error("Errore durante la chiamata API:", error);
      setError(error);
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchNutritionInfo();
  };

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
        <button type="submit">Conferma</button>
      </form>
      <WeeklyMealPlan />
    </div>
  );
}

export default Diet;
