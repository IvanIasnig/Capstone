import React from "react";
import { useAuth } from "../provider/AuthProvider";
import { Link as RouterLink } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

function UserProfile() {
  const { name } = useAuth();

  const sections = [
    {
      label: "Diet",
      link: "/userProfile/diet",
      backgroundImage:
        "https://wallpapers.com/images/hd/food-4k-1pf6px6ryqfjtnyr.jpg",
    },
    {
      label: "Workout",
      link: "/userProfile/workout",
      backgroundImage:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3ltfGVufDB8fDB8fHww&w=1000&q=80",
    },
    {
      label: "Tables",
      link: "/userProfile/tables",
      backgroundImage:
        "https://e0.pxfuel.com/wallpapers/210/603/desktop-wallpaper-blonde-girl-fitness-dumbbell-athletic-young-woman-sport-girls.jpg",
    },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Typography
        variant="h4"
        position="absolute"
        top="5%"
        left="50%"
        transform="translateX(-50%)"
        zIndex="2"
      >
        Benvenuto, {name}!
      </Typography>

      {sections.map((section) => (
        <Box
          key={section.label}
          sx={{
            flex: "1 1 0%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `url(${section.backgroundImage}) no-repeat center center`,
            backgroundSize: "cover",
            transition: "0.3s ease-in-out",
            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          <Button
            variant="contained"
            color="secondary"
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
