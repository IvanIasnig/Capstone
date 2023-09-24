import React from "react";
import workoutPlans from "../data/workoutPlans";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import NavBar from "../component/Navbar";
import gym1 from "../images/gym1.jpg";
import gym2 from "../images/gym2.jpg";
import gym3 from "../images/gym3.jpg";
import gym4 from "../images/gym4.jpg";
import gym5 from "../images/gym5.jpg";
import gym6 from "../images/gym6.jpg";

function Workout() {
  const backgrounds = [
    `url(${gym6})`,
    `url(${gym3})`,
    `url(${gym2})`,
    `url(${gym4})`,
    `url(${gym5})`,
    `url(${gym1})`,
  ];

  const userActivity = JSON.parse(localStorage.getItem("restOfData")).activity;
  const userWorkoutPlan = workoutPlans[userActivity];

  return (
    <div style={{ background: "black" }}>
      <NavBar />
      <Container sx={{ padding: "8px", background: "black" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: "2rem",
            textAlign: "center",
            mb: 4,
            fontWeight: 600,
            color: "white",
          }}
        >
          Weekly Training
        </Typography>
        {Object.entries(userWorkoutPlan.week).map(([day, exercises], idx) => (
          <Card
            key={day}
            sx={{
              mb: 4,
              borderRadius: 15,
              backgroundImage: backgrounds[idx % backgrounds.length],
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "common.white",
              boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.1)",
                zIndex: 1,
              },
            }}
          >
            <CardHeader
              title={day}
              sx={{
                fontSize: "1.5rem",
                fontWeight: 500,
                textAlign: "center",
              }}
              titleTypographyProps={{ variant: "h5" }}
            />
            <CardContent>
              <List>
                {exercises.map((exercise, index) => (
                  <ListItem key={index}>
                    <Typography sx={{ fontSize: "1.1rem" }}>
                      <strong>{exercise.exercise}</strong> - {exercise.sets}{" "}
                      sets of {exercise.reps} reps
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        ))}
      </Container>
    </div>
  );
}

export default Workout;
