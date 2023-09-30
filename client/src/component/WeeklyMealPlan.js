import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import ReactSelect from "react-select";

const mealArr = function (meal) {
  if (meal === "breakfast") return "Breakfast";
  if (meal === "morningSnack") return "Morning Snack";
  if (meal === "lunch") return "Lunch";
  if (meal === "afternoonSnack") return "Afternoon Snack";
  if (meal === "dinner") return "Dinner";
};

const WeeklyMealPlan = () => {
  const [response, setResponse] = useState(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // imposta la data corrente come valore iniziale

  const [foodData, setFoodData] = useState([]);

  var grams = (grams) => {
    return Math.floor((grams * totalKcal()) / 2000);
  };

  const [dayDiets, setDayDiets] = useState({
    Monday: {
      breakfast: { food: "Yoplait Mixed Berry", grams: grams(100) },
      morningSnack: { food: "Smoothie", grams: grams(300) },
      lunch: { food: "Chicken Breast", grams: grams(400) },
      afternoonSnack: { food: "Multi-Grain Bread", grams: grams(120) },
      dinner: { food: "Salmon", grams: grams(400) },
    },
    Tuesday: {
      breakfast: { food: "Yoplait Mixed Berry", grams: grams(100) },
      morningSnack: { food: "Smoothie", grams: grams(300) },
      lunch: { food: "Chicken Breast", grams: grams(400) },
      afternoonSnack: { food: "Multi-Grain Bread", grams: grams(120) },
      dinner: { food: "Salmon", grams: grams(400) },
    },
    Wednesday: {
      breakfast: { food: "Yoplait Mixed Berry", grams: grams(100) },
      morningSnack: { food: "Smoothie", grams: grams(300) },
      lunch: { food: "Chicken Breast", grams: grams(400) },
      afternoonSnack: { food: "Multi-Grain Bread", grams: grams(120) },
      dinner: { food: "Salmon", grams: grams(400) },
    },
    Thursday: {
      breakfast: { food: "Yoplait Mixed Berry", grams: grams(100) },
      morningSnack: { food: "Smoothie", grams: grams(300) },
      lunch: { food: "Chicken Breast", grams: grams(400) },
      afternoonSnack: { food: "Multi-Grain Bread", grams: grams(120) },
      dinner: { food: "Salmon", grams: grams(400) },
    },
    Friday: {
      breakfast: { food: "Yoplait Mixed Berry", grams: grams(100) },
      morningSnack: { food: "Smoothie", grams: grams(300) },
      lunch: { food: "Chicken Breast", grams: grams(400) },
      afternoonSnack: { food: "Multi-Grain Bread", grams: grams(120) },
      dinner: { food: "Salmon", grams: grams(400) },
    },
    Saturday: {
      breakfast: { food: "Yoplait Mixed Berry", grams: grams(100) },
      morningSnack: { food: "Smoothie", grams: grams(300) },
      lunch: { food: "Chicken Breast", grams: grams(400) },
      afternoonSnack: { food: "Multi-Grain Bread", grams: grams(120) },
      dinner: { food: "Salmon", grams: grams(400) },
    },
    Sunday: {
      breakfast: { food: "Yoplait Mixed Berry", grams: grams(100) },
      morningSnack: { food: "Smoothie", grams: grams(300) },
      lunch: { food: "Chicken Breast", grams: grams(400) },
      afternoonSnack: { food: "Multi-Grain Bread", grams: grams(120) },
      dinner: { food: "Salmon", grams: grams(400) },
    },
  });

  const [availableFoods, setAvailableFoods] = useState([]);

  useEffect(() => {
    loadFoods();
  }, []);

  const authToken = localStorage.getItem("authToken");

  const loadFoods = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/foods", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const foods = response.data;
      console.log(foods);
      setFoodData(foods);
      setAvailableFoods(foods.map((food) => food.foodItem));
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  const calculateCaloriesForDay = (meals) => {
    return Object.values(meals).reduce((total, { food, grams }) => {
      const foodInfo = foodData.find((f) => f.foodItem === food);
      if (foodInfo) {
        const calsPer100gRaw = foodInfo.calsPer100grams.replace(
          /\s*\w{3}$/,
          ""
        );
        const calsPer100g = parseInt(calsPer100gRaw, 10);

        const calsForGrams = (calsPer100g / 100) * grams;
        return Math.floor(total + calsForGrams);
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
      window.location.reload();
    } catch (error) {
      console.error("Si è verificato un errore:", error.response);
      setResponse(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <div className="p-3 mt-4 mb-4 rounded bg-dark text-white">
        <h6 className="text-center">
          Total Kcal suggested per day: {totalKcal()}
        </h6>
      </div>

      {Object.entries(dayDiets).map(([day, meals]) => (
        <div key={day} className="card mb-4 bg-dark text-white">
          <div className="card-header text-center">{`${day} - Total Calories: ${calculateCaloriesForDay(
            meals
          )} kcal`}</div>
          <div className="card-body">
            {Object.entries(meals).map(([meal, details]) => (
              <div key={meal} className="row mb-2 align-items-center">
                <div className="col-12 col-md-2 text-center">
                  {mealArr(meal)}
                </div>
                <div className="col-12 col-md-5 mt-2 mt-md-0">
                  <ReactSelect
                    className="text-black"
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    name="food"
                    options={availableFoods.map((food) => ({
                      label: food,
                      value: food,
                    }))}
                    value={{ label: details.food, value: details.food }}
                    onChange={(option) =>
                      handleInputChange(
                        day,
                        meal,
                        "food",
                        option ? option.value : ""
                      )
                    }
                  />
                </div>
                <div className="col-12 col-md-5 mt-2 mt-md-0">
                  <input
                    type="number"
                    className="form-control bg-secondary text-white"
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

      <div className="text-center my-4">
        <button
          onClick={postData}
          className="btn btn-lg btn-dark mb-4"
          style={{
            borderColor: "orange",
            borderWidth: "2px",
            borderStyle: "solid",
          }}
        >
          Save Meal Plan
        </button>
      </div>
    </div>
  );
};

export default WeeklyMealPlan;
