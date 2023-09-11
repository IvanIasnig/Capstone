import axios from "axios";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
    Breakfast: "Oatmeal with fruits",
    MorningSnack: "Yogurt",
    Lunch: "Rice and grilled chicken",
    AfternoonSnack: "Nuts",
    Dinner: "Spaghetti with tomato sauce",
  },
  Tuesday: {
    Breakfast: "Pancakes with syrup",
    MorningSnack: "Fruit salad",
    Lunch: "Turkey and cheese sandwich",
    AfternoonSnack: "Granola bar",
    Dinner: "Chicken curry with rice",
  },
  Wednesday: {
    Breakfast: "Cereal with milk",
    MorningSnack: "Smoothie with berries",
    Lunch: "Salad with tuna",
    AfternoonSnack: "Carrots with hummus",
    Dinner: "Steak with mashed potatoes",
  },
  Thursday: {
    Breakfast: "French toast",
    MorningSnack: "Sliced apples",
    Lunch: "Burger with fries",
    AfternoonSnack: "Cookies",
    Dinner: "Fish with green beans",
  },
  Friday: {
    Breakfast: "Eggs with toast",
    MorningSnack: "Protein shake",
    Lunch: "Chicken Caesar salad",
    AfternoonSnack: "Sliced cucumbers",
    Dinner: "Pizza",
  },
  Saturday: {
    Breakfast: "Waffles with berries",
    MorningSnack: "Muffin",
    Lunch: "Spaghetti carbonara",
    AfternoonSnack: "Ice cream",
    Dinner: "BBQ ribs with coleslaw",
  },
  Sunday: {
    Breakfast: "Muesli with yogurt",
    MorningSnack: "Banana",
    Lunch: "Roast beef with vegetables",
    AfternoonSnack: "Chocolate",
    Dinner: "Soup with bread",
  },
};

function WeeklyMealPlan({ fetchNutritionInfo }) {
  const [mealPlan, setMealPlan] = useState(defaultMealPlan);
  const [error, setError] = useState(null);
  let [kcal, setKcal] = useState(0);

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
        promises.push(fetchNutritionInfo(query)); // pass the query to the function
      }
    }

    Promise.all(promises).then((results) => {
      results.forEach((result) => {
        console.log(result);
      });
    });
  };

  async function fetchNutritionInfo(query) {
    const KEY = "d802a615ff134b103d4b0a29cdf27e04";
    const ID = "43f50be8";
    const BASE_URL = `https://api.edamam.com/api/nutrition-data?app_id=${ID}&app_key=${KEY}&nutrition-type=cooking&ingr=${query}`;

    try {
      const response = await axios.get(BASE_URL);
      console.log(response.data);
      totKcal(response.data);
      return response.data;
    } catch (error) {
      console.error("Errore durante la chiamata API:", error);
      setError(error);
    }
  }

  function totKcal(data) {
    if (data && data.calories) {
      setKcal((prevKcal) => prevKcal + data.calories);
    }
  }

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
              />
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
