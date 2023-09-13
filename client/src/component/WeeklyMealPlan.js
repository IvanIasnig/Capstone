import React, { useState } from "react";
import axios from "axios";

const WeeklyMealPlan = () => {
  const [response, setResponse] = useState(null);

  // Recupera il token dal localStorage
  const authToken = localStorage.getItem("authToken");

  const postData = async () => {
    const url =
      "http://localhost:3001/user/diet/registerDiet?userId=85a5a9e4-8185-44be-ac5b-254a987a33a3";

    const data = {
      dayDiets: [
        {
          dayName: "Monday",
          breakfast: {
            food: "Pane e marmellata",
            grams: 300,
          },
          morningSnack: {
            food: "Mela",
            grams: 100,
          },
          lunch: {
            food: "Spaghetti al pomodoro",
            grams: 500,
          },
          afternoonSnack: {
            food: "Yogurt",
            grams: 150,
          },
          dinner: {
            food: "Insalata mista",
            grams: 250,
          },
        },
        {
          dayName: "Tuesday",
          breakfast: {
            food: "Pane e marmellata",
            grams: 300,
          },
          morningSnack: {
            food: "Mela",
            grams: 100,
          },
          lunch: {
            food: "Spaghetti al pomodoro",
            grams: 500,
          },
          afternoonSnack: {
            food: "Yogurt",
            grams: 150,
          },
          dinner: {
            food: "Insalata mista",
            grams: 250,
          },
        },
        {
          dayName: "Wednesday",
          breakfast: {
            food: "Pane e marmellata",
            grams: 300,
          },
          morningSnack: {
            food: "Mela",
            grams: 100,
          },
          lunch: {
            food: "Spaghetti al pomodoro",
            grams: 500,
          },
          afternoonSnack: {
            food: "Yogurt",
            grams: 150,
          },
          dinner: {
            food: "Insalata mista",
            grams: 250,
          },
        },
        {
          dayName: "Thursday",
          breakfast: {
            food: "Pane e marmellata",
            grams: 300,
          },
          morningSnack: {
            food: "Mela",
            grams: 100,
          },
          lunch: {
            food: "Spaghetti al pomodoro",
            grams: 500,
          },
          afternoonSnack: {
            food: "Yogurt",
            grams: 150,
          },
          dinner: {
            food: "Insalata mista",
            grams: 250,
          },
        },
        {
          dayName: "Friday",
          breakfast: {
            food: "Pane e marmellata",
            grams: 300,
          },
          morningSnack: {
            food: "Mela",
            grams: 100,
          },
          lunch: {
            food: "Spaghetti al pomodoro",
            grams: 500,
          },
          afternoonSnack: {
            food: "Yogurt",
            grams: 150,
          },
          dinner: {
            food: "Insalata mista",
            grams: 250,
          },
        },
        {
          dayName: "Saturday",
          breakfast: {
            food: "Pane e marmellata",
            grams: 300,
          },
          morningSnack: {
            food: "Mela",
            grams: 100,
          },
          lunch: {
            food: "Spaghetti al pomodoro",
            grams: 500,
          },
          afternoonSnack: {
            food: "Yogurt",
            grams: 150,
          },
          dinner: {
            food: "Insalata mista",
            grams: 250,
          },
        },
        {
          dayName: "Sunday",
          breakfast: {
            food: "Pane e marmellata",
            grams: 300,
          },
          morningSnack: {
            food: "Mela",
            grams: 100,
          },
          lunch: {
            food: "Spaghetti al pomodoro",
            grams: 500,
          },
          afternoonSnack: {
            food: "Yogurt",
            grams: 150,
          },
          dinner: {
            food: "Insalata mista",
            grams: 250,
          },
        },
      ],
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
    <div>
      <button onClick={postData}>Invia Piano Alimentare</button>
      {response && <div>Risposta del server: {JSON.stringify(response)}</div>}
    </div>
  );
};

export default WeeklyMealPlan;
