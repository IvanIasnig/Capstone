import { useAuth } from "../provider/AuthProvider";
import axios from "axios";
import { useState } from "react";

function UserProfile() {
  const { name } = useAuth();
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [foodQuery, setFoodQuery] = useState("");

  const storedRof = JSON.parse(localStorage.getItem("restOfData")) || {};

  function Kcal(data) {
    let bmr = 0;
    let x = 0;
    let y = 0;
    let z = 0;
    if (data.sex === "M") {
      x = 66.5;
      y = 13.75 * data.weight;
      z = 5.003 * data.height - 6.75 * data.age;
    } else {
      x = 655.1;
      y = 9.563 * data.weight;
      z = 1.85 * data.height - 4.676 * data.age;
    }
    bmr = x + y + z;
    let res = Math.round(bmr);
    return res.toString();
  }

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
      <h1>Benvenuto, {name}!</h1>
      <div>le tue kcal giornaliere sono: {Kcal(storedRof)}</div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter food item..."
          value={foodQuery}
          onChange={(e) => setFoodQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>Si è verificato un errore: {error.message}</p>}
      {apiData && (
        <div>
          <h2>{apiData.name}</h2>
          <p>Calories: {apiData.calories}</p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
