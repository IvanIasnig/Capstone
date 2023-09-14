import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Papa from "papaparse";

const WeeklyMealPlan = () => {
  const [response, setResponse] = useState(null);
  const [dayDiets, setDayDiets] = useState({
    Monday: {
      breakfast: { food: "", grams: 0 },
      morningSnack: { food: "", grams: 0 },
      lunch: { food: "", grams: 0 },
      afternoonSnack: { food: "", grams: 0 },
      dinner: { food: "", grams: 0 },
    },
    Tuesday: {
      breakfast: { food: "", grams: 0 },
      morningSnack: { food: "", grams: 0 },
      lunch: { food: "", grams: 0 },
      afternoonSnack: { food: "", grams: 0 },
      dinner: { food: "", grams: 0 },
    },
    Wednesday: {
      breakfast: { food: "", grams: 0 },
      morningSnack: { food: "", grams: 0 },
      lunch: { food: "", grams: 0 },
      afternoonSnack: { food: "", grams: 0 },
      dinner: { food: "", grams: 0 },
    },
    Thursday: {
      breakfast: { food: "", grams: 0 },
      morningSnack: { food: "", grams: 0 },
      lunch: { food: "", grams: 0 },
      afternoonSnack: { food: "", grams: 0 },
      dinner: { food: "", grams: 0 },
    },
    Friday: {
      breakfast: { food: "", grams: 0 },
      morningSnack: { food: "", grams: 0 },
      lunch: { food: "", grams: 0 },
      afternoonSnack: { food: "", grams: 0 },
      dinner: { food: "", grams: 0 },
    },
    Saturday: {
      breakfast: { food: "", grams: 0 },
      morningSnack: { food: "", grams: 0 },
      lunch: { food: "", grams: 0 },
      afternoonSnack: { food: "", grams: 0 },
      dinner: { food: "", grams: 0 },
    },
    Sunday: {
      breakfast: { food: "", grams: 0 },
      morningSnack: { food: "", grams: 0 },
      lunch: { food: "", grams: 0 },
      afternoonSnack: { food: "", grams: 0 },
      dinner: { food: "", grams: 0 },
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
        const foods = result.data.map((row) => row.FoodItem);
        setAvailableFoods(foods);
      },
    });
  };

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

    const data = { dayDiets: Object.values(dayDiets) };

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
          <div className="card-header">{day}</div>
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
      {response && (
        <div className="mt-4 alert alert-info">
          Risposta del server: {JSON.stringify(response)}
        </div>
      )}
    </div>
  );
};

export default WeeklyMealPlan;
