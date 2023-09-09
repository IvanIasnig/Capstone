import React, { useState } from "react";

const daysOfWeek = [
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato",
  "Domenica",
];
const meals = [
  "Colazione",
  "Spuntino mattina",
  "Pranzo",
  "Spuntino pomeriggio",
  "Cena",
];

function WeeklyMealPlan() {
  const initialMealPlan = daysOfWeek.reduce((acc, day) => {
    acc[day] = {};
    meals.forEach((meal) => {
      acc[day][meal] = "";
    });
    return acc;
  }, {});

  const [mealPlan, setMealPlan] = useState(initialMealPlan);

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
    console.log(mealPlan);
  };

  return (
    <form onSubmit={handleSubmit}>
      {daysOfWeek.map((day) => (
        <div key={day}>
          <h3>{day}</h3>
          {meals.map((meal) => (
            <div key={meal}>
              <label>{meal}: </label>
              <input
                type="text"
                value={mealPlan[day][meal]}
                onChange={(e) => handleChange(day, meal, e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}
      <button type="submit">Salva piano settimanale</button>
    </form>
  );
}

export default WeeklyMealPlan;
