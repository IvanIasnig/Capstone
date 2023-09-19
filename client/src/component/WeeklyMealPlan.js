import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Papa from "papaparse";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
} from "@mui/material";

const mealArr = function (meal) {
  if (meal === "breakfast") return "Breakfast";
  if (meal === "morningSnack") return "Morning Snack";
  if (meal === "lunch") return "Lunch";
  if (meal === "afternoonSnack") return "Afternoon Snack";
  if (meal === "dinner") return "Dinner";
};

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

  const backgroundImages = [
    "https://c1.wallpaperflare.com/preview/112/406/444/food-diet-keto-ketodieta.jpg",
    "https://e0.pxfuel.com/wallpapers/461/215/desktop-wallpaper-diet-diet-motivation-healthy-food.jpg",
    "https://parade.com/.image/t_share/MTkwNTc1OTc4ODE4Nzc0MTQx/mediterranean-diet-ftr.jpg",
    "https://c1.wallpaperflare.com/preview/112/406/444/food-diet-keto-ketodieta.jpg",
    "https://e0.pxfuel.com/wallpapers/461/215/desktop-wallpaper-diet-diet-motivation-healthy-food.jpg",
    "https://c1.wallpaperflare.com/preview/112/406/444/food-diet-keto-ketodieta.jpg",
    "https://parade.com/.image/t_share/MTkwNTc1OTc4ODE4Nzc0MTQx/mediterranean-diet-ftr.jpg",
  ];

  return (
    <Container
      sx={{
        mt: 4,
        backgroundImage:
          "https://img.wallpapic.it/i5921-731-915/medium/frutta-e-verdura-frutti-di-bosco-rossi-sfondo.jpg",
      }}
    >
      <Box
        sx={{
          padding: "1rem",
          mt: 4,
          mb: 4,
          borderRadius: "30px !important",
          backgroundColor: "rgba(0,0,0,0.5)",
          border: "1px solid #fff",
        }}
      >
        <Typography variant="h6" className="text-white">
          Total Kcal per day : {totalKcal()}
        </Typography>
      </Box>
      {Object.entries(dayDiets).map(([day, meals], dayIndex) => (
        <Card
          key={day}
          sx={{ mb: 4, backgroundImage: `url(${backgroundImages[dayIndex]})` }}
          className="text-white"
        >
          <CardHeader
            title={`${day} - Total Calories: ${calculateCaloriesForDay(
              meals
            )} kcal`}
          />
          <CardContent>
            <Grid container spacing={2}>
              {Object.entries(meals).map(([meal, details]) => (
                <Grid
                  container
                  key={meal}
                  spacing={2}
                  alignItems="center"
                  className="text-white textShd"
                >
                  <Grid item xs={2}>
                    <InputLabel className="text-white fs-5 ms-3">
                      {mealArr(meal)}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <Select
                      fullWidth
                      className="text-white mb-2"
                      value={details.food}
                      onChange={(e) =>
                        handleInputChange(day, meal, "food", e.target.value)
                      }
                      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
                    >
                      <MenuItem value="" className="text-white">
                        <em>Seleziona un cibo...</em>
                      </MenuItem>
                      {availableFoods.map((food, index) => (
                        <MenuItem key={`${food}-${index}`} value={food}>
                          {food}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      type="number"
                      placeholder="Grammi"
                      value={details.grams}
                      onChange={(e) =>
                        handleInputChange(day, meal, "grams", e.target.value)
                      }
                      InputProps={{ className: "text-white" }}
                      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ))}
      <div className="text-center my-4">
        <Button
          variant="contained"
          onClick={postData}
          className="btn-lg mb-4"
          style={{
            background: "black",
            borderColor: "white",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
            fontSize: "1.2rem",
          }}
        >
          Invia Piano Alimentare
        </Button>
      </div>

      {response && (
        <Typography
          variant="body1"
          sx={{ mt: 4, p: 2, border: "1px solid", borderColor: "divider" }}
          className="text-white"
        >
          Risposta del server: {JSON.stringify(response)}
        </Typography>
      )}
    </Container>
  );
};

export default WeeklyMealPlan;
