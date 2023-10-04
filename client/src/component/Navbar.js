import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { Drawer } from "@mui/material";
import { useAuth } from "../provider/AuthProvider";
import Logo from "../images/icon.png";

const NavBar = () => {
  const { rof } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "rgba(30, 30, 30)",
          color: "white",
          zIndex: 2,
        }}
      >
        <Toolbar>
          <img
            src={Logo}
            alt="Company Logo"
            style={{ height: "40px", marginRight: "20px" }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {rof.username}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            className="d-block d-lg-none"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          <div className="d-none d-lg-flex">
            <Link
              to="/userProfile/diet"
              className="text-white fw-bold text-decoration-none me-5 linkStyle"
            >
              Diet
            </Link>
            <Link
              to="/userProfile/workout"
              className="text-white fw-bold text-decoration-none me-5 linkStyle"
            >
              Workout
            </Link>
            <Link
              to="/userProfile/tables"
              className="text-white fw-bold text-decoration-none me-5 linkStyle"
            >
              Progress
            </Link>
            <Link
              to="/userProfile/photos"
              className="text-white fw-bold text-decoration-none me-5 linkStyle"
            >
              My Photos
            </Link>
            <Link
              to="/userProfile/exercises"
              className="text-white fw-bold text-decoration-none me-5 linkStyle"
            >
              Exercises
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <Link
          to="/userProfile/diet"
          className="text-black fw-bold text-decoration-none m-3 linkStyle"
        >
          Diet
        </Link>
        <Link
          to="/userProfile/workout"
          className="text-black fw-bold text-decoration-none m-3 linkStyle"
        >
          Workout
        </Link>
        <Link
          to="/userProfile/tables"
          className="text-black fw-bold text-decoration-none m-3 linkStyle"
        >
          Progress
        </Link>
        <Link
          to="/userProfile/exercises"
          className="text-black fw-bold text-decoration-none m-3 linkStyle"
        >
          Exercises
        </Link>
      </Drawer>
    </div>
  );
};

export default NavBar;
