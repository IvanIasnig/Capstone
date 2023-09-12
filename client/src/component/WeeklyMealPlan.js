import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Papa from "papaparse";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const meals = [
  "Breakfast",
  "MorningSnack",
  "Lunch",
  "AfternoonSnack",
  "Dinner",
];

const defaultMealPlan = {
  Monday: {
    Breakfast: "Applesauce",
    MorningSnack: "Applesauce",
    Lunch: "Applesauce",
    AfternoonSnack: "Applesauce",
    Dinner: "Applesauce",
  },
  Tuesday: {
    Breakfast: "Applesauce",
    MorningSnack: "Applesauce",
    Lunch: "Applesauce",
    AfternoonSnack: "Applesauce",
    Dinner: "Applesauce",
  },
  Wednesday: {
    Breakfast: "Applesauce",
    MorningSnack: "Applesauce",
    Lunch: "Applesauce",
    AfternoonSnack: "Applesauce",
    Dinner: "Applesauce",
  },
  Thursday: {
    Breakfast: "Applesauce",
    MorningSnack: "Applesauce",
    Lunch: "Applesauce",
    AfternoonSnack: "Applesauce",
    Dinner: "Applesauce",
  },
  Friday: {
    Breakfast: "Applesauce",
    MorningSnack: "Applesauce",
    Lunch: "Applesauce",
    AfternoonSnack: "Applesauce",
    Dinner: "Applesauce",
  },
  Saturday: {
    Breakfast: "Applesauce",
    MorningSnack: "Applesauce",
    Lunch: "Applesauce",
    AfternoonSnack: "Applesauce",
    Dinner: "Applesauce",
  },
  Sunday: {
    Breakfast: "Applesauce",
    MorningSnack: "Applesauce",
    Lunch: "Applesauce",
    AfternoonSnack: "Applesauce",
    Dinner: "Applesauce",
  },
};

let foodData = [];

function getSuggestions(query) {
  return foodData
    .filter(
      (item) =>
        item &&
        item.FoodItem &&
        item.FoodItem.toLowerCase().includes(query.toLowerCase())
    )
    .map((item) => item.FoodItem);
}

function WeeklyMealPlan() {
  const [mealPlan, setMealPlan] = useState(defaultMealPlan);
  const [error, setError] = useState(null);
  const [kcal, setKcal] = useState(0);
  const [foodData, setFoodData] = useState([]);

  const handleChange = (day, meal, value) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let promises = [];

    for (let day in mealPlan) {
      for (let meal in mealPlan[day]) {
        let query = mealPlan[day][meal];
        promises.push(fetchNutritionInfo(query));
      }
    }

    Promise.all(promises).then((results) => {
      results.forEach((result) => {
        console.log(result);
      });
    });
  };

  async function fetchNutritionInfo(query) {
    const matchedItem = foodData.find(
      (item) =>
        item &&
        item.FoodItem &&
        item.FoodItem.toLowerCase() === query.toLowerCase()
    );

    if (matchedItem) {
      const data = {
        calories: parseFloat(matchedItem.Cals_per100grams.split(" ")[0]),
      };
      totKcal(data);
      return data;
    } else {
      console.error("Item not found in CSV data:", query);
      setError(new Error("Item not found"));
    }
  }

  function totKcal(data) {
    if (data && data.calories) {
      setKcal((prevKcal) => prevKcal + data.calories);
    }
  }

  useEffect(() => {
    Papa.parse("/calories.csv", {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: function (results) {
        setFoodData(results.data);
        console.log("Loaded CSV:", results.data);
      },
      error: function (error) {
        console.error("Error reading CSV:", error);
        setError(error);
      },
    });
  }, []);

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      {daysOfWeek.map((day) => (
        <div key={day} className="mb-4">
          <h3 className="mb-2">{day}</h3>
          {meals.map((meal) => (
            <div key={meal} className="mb-2">
              <label className="me-2">{meal}: </label>
              <input
                type="text"
                className="form-control d-inline-block w-50"
                value={mealPlan[day][meal]}
                onChange={(e) => handleChange(day, meal, e.target.value)}
                list="food-suggestions"
              />
              <datalist id="food-suggestions">
                {mealPlan[day][meal] &&
                  getSuggestions(mealPlan[day][meal]).map((suggestion) => (
                    <option key={suggestion} value={suggestion} />
                  ))}
              </datalist>
            </div>
          ))}
        </div>
      ))}
      <button type="submit" className="btn btn-primary">
        Salva piano settimanale
      </button>
      <div> Total weekly Kcal: {kcal}</div>
    </form>
  );
}

export default WeeklyMealPlan;
