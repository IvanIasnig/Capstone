import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Box } from "@mui/material";

function UserProfile() {
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
              transition: "0.3s ease-in-out",
              scale: "1.1",
            },
          }}
        >
          <Button
            variant="contained"
            sx={{
              scale: "1.2",
              backgroundColor: "black ",
              borderColor: "white",
              border: "1px solid white",
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                backgroundColor: "blue",
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
