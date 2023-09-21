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

function Workout() {
  const backgrounds = [
    "url('https://cdn.wallpapersafari.com/44/77/8b1JrK.jpg')",
    "url('https://e0.pxfuel.com/wallpapers/39/873/desktop-wallpaper-six-pack-abs-six-pack-abs-fitness-ab.jpg')",
    "url('https://i.pinimg.com/originals/bc/79/a4/bc79a4fe9aa1f6e56f5d00a01ad0dae2.jpg')",
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
