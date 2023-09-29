import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Container, Grid } from "@mui/material";
import WeeklyMealPlan from "../component/WeeklyMealPlan";
import NavBar from "../component/Navbar";
import Bg from "../images/foodbg.jpg";
import Mon from "../images/foodmon.jpg";
import Tue from "../images/foodtue.jpg";
import Thu from "../images/foodthu.jpg";
import Wed from "../images/foodwed.jpg";
import Fri from "../images/foodfri.jpg";
import Sat from "../images/foodsat.jpg";
import Sun from "../images/foodsun.jpg";
import jwtDecode from "jwt-decode";
import axios from "axios";

function Diet() {
  const [weekDiet, setWeekDiet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authToken = localStorage.getItem("authToken");

  function getUserIdFromToken() {
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      return decoded.sub;
    } catch (err) {
      return null;
    }
  }

  useEffect(() => {
    fetchAndSetDiet(getUserIdFromToken(), authToken);
  }, []);

  const fetchAndSetDiet = async (userId, token) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/user/diet/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setWeekDiet(response.data);
    } catch (error) {
      console.error("Error :", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDiet = async (userId, token) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/user/diet/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setWeekDiet(response.data);
    } catch (error) {
      console.error("Error :", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  const dayBackgrounds = [Mon, Tue, Thu, Wed, Fri, Sat, Sun];

  return (
    <div
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        color: "white",
        textShadow: "2px 2px 4px black",
      }}
    >
      <NavBar />

      {weekDiet ? (
        <Container sx={{ paddingTop: "20px" }}>
          {weekDiet.dayDiets.map((day, index) => (
            <Card
              key={index}
              sx={{
                marginBottom: 2,
                ":hover": {
                  border: "solid orange",
                },
                borderRadius: "15px",
                backgroundImage: `url(${dayBackgrounds[index]})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              className="shadow-sm"
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    marginBottom: 2,
                    color: "white",
                    textShadow: "2px 2px 4px black",
                  }}
                >
                  {day.dayName}
                </Typography>
                <Grid container spacing={3}>
                  {[
                    "breakfast",
                    "morningSnack",
                    "lunch",
                    "afternoonSnack",
                    "dinner",
                  ].map((meal) => (
                    <Grid item xs={12} key={meal}>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ color: "white", textShadow: "2px 2px 4px black" }}
                      >
                        {meal.charAt(0).toUpperCase() + meal.slice(1)}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "white", textShadow: "2px 2px 4px black" }}
                      >
                        {day[meal].food} - {day[meal].grams} grams
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          ))}
          <button
            onClick={() => {
              deleteDiet(getUserIdFromToken(), authToken);
            }}
            className="btn btn-lg btn-danger mb-4"
            style={{
              borderColor: "orange",
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          >
            Delete Diet
          </button>
        </Container>
      ) : (
        <WeeklyMealPlan />
      )}
    </div>
  );
}

export default Diet;
