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
    Breakfast: {
      food: "Plain Yogurt",
      grams: "170",
    },
    MorningSnack: {
      food: "Applesauce",
      grams: "100",
    },
    Lunch: {
      food: "Applesauce",
      grams: "100",
    },
    AfternoonSnack: {
      food: "Applesauce",
      grams: "100",
    },
    Dinner: {
      food: "Applesauce",
      grams: "100",
    },
  },
  Tuesday: {
    Breakfast: {
      food: "Applesauce",
      grams: "100",
    },
    MorningSnack: {
      food: "Applesauce",
      grams: "100",
    },
    Lunch: {
      food: "Applesauce",
      grams: "100",
    },
    AfternoonSnack: {
      food: "Applesauce",
      grams: "100",
    },
    Dinner: {
      food: "Applesauce",
      grams: "100",
    },
  },
  Wednesday: {
    Breakfast: {
      food: "Applesauce",
      grams: "100",
    },
    MorningSnack: {
      food: "Applesauce",
      grams: "100",
    },
    Lunch: {
      food: "Applesauce",
      grams: "100",
    },
    AfternoonSnack: {
      food: "Applesauce",
      grams: "100",
    },
    Dinner: {
      food: "Applesauce",
      grams: "100",
    },
  },
  Thursday: {
    Breakfast: {
      food: "Applesauce",
      grams: "100",
    },
    MorningSnack: {
      food: "Applesauce",
      grams: "100",
    },
    Lunch: {
      food: "Applesauce",
      grams: "100",
    },
    AfternoonSnack: {
      food: "Applesauce",
      grams: "100",
    },
    Dinner: {
      food: "Applesauce",
      grams: "100",
    },
  },
  Friday: {
    Breakfast: {
      food: "Applesauce",
      grams: "100",
    },
    MorningSnack: {
      food: "Applesauce",
      grams: "100",
    },
    Lunch: {
      food: "Applesauce",
      grams: "100",
    },
    AfternoonSnack: {
      food: "Applesauce",
      grams: "100",
    },
    Dinner: {
      food: "Applesauce",
      grams: "100",
    },
  },
  Saturday: {
    Breakfast: {
      food: "Applesauce",
      grams: "100",
    },
    MorningSnack: {
      food: "Applesauce",
      grams: "100",
    },
    Lunch: {
      food: "Applesauce",
      grams: "100",
    },
    AfternoonSnack: {
      food: "Applesauce",
      grams: "100",
    },
    Dinner: {
      food: "Applesauce",
      grams: "100",
    },
  },
  Sunday: {
    Breakfast: {
      food: "Applesauce",
      grams: "100",
    },
    MorningSnack: {
      food: "Applesauce",
      grams: "100",
    },
    Lunch: {
      food: "Applesauce",
      grams: "100",
    },
    AfternoonSnack: {
      food: "Applesauce",
      grams: "100",
    },
    Dinner: {
      food: "Applesauce",
      grams: "100",
    },
  },
};

function getSuggestions(query, foodData) {
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

  const handleChange = (day, meal, field, value) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: {
          ...prev[day][meal],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setKcal(0);

    let promises = [];
    let mealPlanData = {};

    for (let day in mealPlan) {
      for (let meal in mealPlan[day]) {
        let query = mealPlan[day][meal];
        promises.push(fetchNutritionInfo(query));
      }
    }

    const results = await Promise.all(promises);
    results.forEach((result) => {
      console.log(result);
      // aggiungi il risultato a mealPlanData se necessario
    });

    await postMealPlanData(mealPlanData);
  };

  async function fetchNutritionInfo(query) {
    const foodItem = query.food;

    const matchedItem = foodData.find(
      (item) =>
        item &&
        item.FoodItem &&
        item.FoodItem.toLowerCase() === foodItem.toLowerCase()
    );

    if (matchedItem) {
      const data = {
        calories:
          parseFloat(matchedItem.Cals_per100grams.split(" ")[0]) *
          (query.grams / 100),
      };
      totKcal(data);
      return data;
    } else {
      console.error("Item not found in CSV data:", foodItem);
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

  const postMealPlanData = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:3001/user/diet/registerDiet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      {daysOfWeek.map((day) => (
        <div key={day} className="mb-4">
          <h3 className="mb-2">{day}</h3>
          {meals.map((meal) => (
            <div key={meal} className="d-flex mb-2">
              <label className="me-2">{meal}: </label>
              <input
                type="text"
                className="form-control d-inline-block w-50 me-2"
                value={mealPlan[day][meal].food}
                onChange={(e) =>
                  handleChange(day, meal, "food", e.target.value)
                }
                list={`food-suggestions-${day}-${meal}`}
              />
              <input
                type="number"
                className="form-control d-inline-block w-20"
                value={mealPlan[day][meal].grams}
                onChange={(e) =>
                  handleChange(day, meal, "grams", e.target.value)
                }
                placeholder="Grams"
              />
              <datalist id={`food-suggestions-${day}-${meal}`}>
                {mealPlan[day][meal].food &&
                  getSuggestions(mealPlan[day][meal].food, foodData).map(
                    (suggestion) => (
                      <option key={suggestion} value={suggestion} />
                    )
                  )}
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
