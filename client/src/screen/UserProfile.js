import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Box } from "@mui/material";
import dietImage from "../images/diet4.jpg";
import workoutImage from "../images/workout.jpg";
import statsImage from "../images/stats.jpg";
import photocameraImage from "../images/photocamera.jpg";

function UserProfile() {
  const sections = [
    {
      label: "Diet",
      link: "/userProfile/diet",
      backgroundImage: dietImage,
    },
    {
      label: "Workout",
      link: "/userProfile/workout",
      backgroundImage: workoutImage,
    },
    {
      label: "Tables",
      link: "/userProfile/tables",
      backgroundImage: statsImage,
    },
    {
      label: "Photos",
      link: "/userProfile/photos",
      backgroundImage: photocameraImage,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "auto",
        overflow: "hidden",
      }}
    >
      {sections.map((section) => (
        <Box
          key={section.label}
          sx={{
            height: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `url(${section.backgroundImage}) no-repeat center center`,
            backgroundSize: "cover",
            transition: "0.3s ease-in-out",
            "&:hover": {
              transition: "0.3s ease-in-out",
              scale: "1.1",
            },
          }}
        >
          <Button
            variant="contained"
            sx={{
              scale: "1.2",
              backgroundColor: "black",
              borderColor: "white",
              border: "1px solid white",
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                backgroundColor: "orange",
                borderColor: "black",
              },
            }}
            component={RouterLink}
            to={section.link}
            size="large"
          >
            {section.label}
          </Button>
        </Box>
      ))}
    </Box>
  );
}

export default UserProfile;
