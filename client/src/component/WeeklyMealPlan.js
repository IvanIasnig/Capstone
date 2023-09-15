import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Papa from "papaparse";

const WeeklyMealPlan = () => {
  const [response, setResponse] = useState(null);
  const [foodData, setFoodData] = useState([]);
  const [dayDiets, setDayDiets] = useState({
    Monday: {
      breakfast: { food: "Yoplait Mixed Berry", grams: 100 },
      morningSnack: { food: "Smoothie", grams: 300 },
      lunch: { food: "Chicken Breast", grams: 400 },
      afternoonSnack: { food: "Multi-Grain Bread", grams: 120 },
      dinner: { food: "Salmon", grams: 400 },
    },
    Tuesday: {
      breakfast: { food: "Yoplait Mixed Berry", grams: 100 },
      morningSnack: { food: "Smoothie", grams: 300 },
      lunch: { food: "Chicken Breast", grams: 400 },
      afternoonSnack: { food: "Multi-Grain Bread", grams: 120 },
      dinner: { food: "Salmon", grams: 400 },
    },
    Wednesday: {
      breakfast: { food: "Yoplait Mixed Berry", grams: 100 },
      morningSnack: { food: "Smoothie", grams: 300 },
      lunch: { food: "Chicken Breast", grams: 400 },
      afternoonSnack: { food: "Multi-Grain Bread", grams: 120 },
      dinner: { food: "Salmon", grams: 400 },
    },
    Thursday: {
      breakfast: { food: "Yoplait Mixed Berry", grams: 100 },
      morningSnack: { food: "Smoothie", grams: 300 },
      lunch: { food: "Chicken Breast", grams: 400 },
      afternoonSnack: { food: "Multi-Grain Bread", grams: 120 },
      dinner: { food: "Salmon", grams: 400 },
    },
    Friday: {
      breakfast: { food: "Yoplait Mixed Berry", grams: 100 },
      morningSnack: { food: "Smoothie", grams: 300 },
      lunch: { food: "Chicken Breast", grams: 400 },
      afternoonSnack: { food: "Multi-Grain Bread", grams: 120 },
      dinner: { food: "Salmon", grams: 400 },
    },
    Saturday: {
      breakfast: { food: "Yoplait Mixed Berry", grams: 100 },
      morningSnack: { food: "Smoothie", grams: 300 },
      lunch: { food: "Chicken Breast", grams: 400 },
      afternoonSnack: { food: "Multi-Grain Bread", grams: 120 },
      dinner: { food: "Salmon", grams: 400 },
    },
    Sunday: {
      breakfast: { food: "Yoplait Mixed Berry", grams: 100 },
      morningSnack: { food: "Smoothie", grams: 300 },
      lunch: { food: "Chicken Breast", grams: 400 },
      afternoonSnack: { food: "Multi-Grain Bread", grams: 120 },
      dinner: { food: "Salmon", grams: 400 },
    },
  });

  const [availableFoods, setAvailableFoods] = useState([]);

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = () => {
    Papa.parse("/calories.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setFoodData(result.data); // per calcolo kcal
        const foods = result.data.map((row) => row.FoodItem);
        setAvailableFoods(foods);
      },
    });
  };

  const calculateCaloriesForDay = (meals) => {
    return Object.values(meals).reduce((total, { food, grams }) => {
      const foodInfo = foodData.find((f) => f.FoodItem === food);
      if (foodInfo) {
        const calsPer100g = parseInt(foodInfo.Cals_per100grams);
        const calsForGrams = (calsPer100g / 100) * grams;
        return total + calsForGrams;
      }
      return total;
    }, 0);
  };

  function totalKcal() {
    const rof = localStorage.getItem("restOfData");
    const jRof = JSON.parse(rof);
    let bmr = 0;
    if (jRof.sex === "M") {
      bmr = 66.5 + 13.75 * jRof.weight + 5.0033 * jRof.height - 6.75 * jRof.age;
    }
    if (jRof.sex === "F") {
      bmr =
        655.5 + 9.563 * jRof.weight + 1.8496 * jRof.height - 4.6756 * jRof.age;
    }
    if (jRof.activity === "SEDENTARY") bmr = bmr * 1.2;
    if (jRof.activity === "MILDLY") bmr = bmr * 1.375;
    if (jRof.activity === "MODERATLY") bmr = bmr * 1.375;
    if (jRof.activity === "VERY") bmr = bmr * 1.725;
    if (jRof.activity === "EXTRA") bmr = bmr * 1.9;
    return Math.floor(bmr);
  }

  // Recupera il token dal localStorage
  const authToken = localStorage.getItem("authToken");

  function getUserIdFromToken() {
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      return decoded.sub;
    } catch (err) {
      console.error("Errore durante la decodifica del token", err);
      return null;
    }
  }

  const handleInputChange = (day, meal, type, value) => {
    const updatedDayDiets = { ...dayDiets };
    updatedDayDiets[day][meal][type] = value;
    setDayDiets(updatedDayDiets);
  };

  const postData = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setResponse("Errore: impossibile ottenere l'ID dell'utente dal token.");
      return;
    }
    const url = `http://localhost:3001/user/diet/registerDiet?userId=${userId}`;

    const data = {
      dayDiets: Object.entries(dayDiets).map(([dayName, meals]) => ({
        dayName,
        ...meals,
      })),
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const result = await axios.post(url, data, config);
      setResponse(result.data);
    } catch (error) {
      console.error("Si è verificato un errore:", error.response);
      setResponse(error.message);
    }
  };

  return (
    <div className="container mt-4">
      {Object.entries(dayDiets).map(([day, meals]) => (
        <div key={day} className="card mb-4">
          <div className="card-header">
            {day} - Total Calories: {calculateCaloriesForDay(meals)} kcal
          </div>
          <div className="card-body">
            {Object.entries(meals).map(([meal, details]) => (
              <div key={meal} className="mb-3 row">
                <label className="col-sm-2 col-form-label">{meal}</label>
                <div className="col-sm-4">
                  <select
                    className="form-control"
                    value={details.food}
                    onChange={(e) =>
                      handleInputChange(day, meal, "food", e.target.value)
                    }
                  >
                    <option value="">Seleziona un cibo...</option>
                    {availableFoods.map((food, index) => (
                      <option key={`${food}-${index}`} value={food}>
                        {food}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Grammi"
                    value={details.grams}
                    onChange={(e) =>
                      handleInputChange(day, meal, "grams", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={postData} className="btn btn-primary">
        Invia Piano Alimentare
      </button>
      <div>{totalKcal()}</div>
      {response && (
        <div className="mt-4 alert alert-info">
          Risposta del server: {JSON.stringify(response)}
        </div>
      )}
    </div>
  );
};

export default WeeklyMealPlan;
