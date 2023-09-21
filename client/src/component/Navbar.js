import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { Button, Drawer } from "@mui/material";
import { useAuth } from "../provider/AuthProvider";

const NavBar = () => {
  const { rof } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{ backgroundColor: "rgba(32, 24, 70)", color: "white" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            className="d-block d-sm-none"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {rof.username}
          </Typography>
          <div className="d-none d-sm-flex">
            {" "}
            <Button>
              <Link
                to="/userProfile/diet"
                className="text-white fw-bold text-decoration-none"
              >
                Diet
              </Link>
            </Button>
            <Button color="inherit" to="/link2">
              <Link
                to="/userProfile/workout"
                className="text-white fw-bold text-decoration-none"
              >
                Workout
              </Link>
            </Button>
            <Button color="inherit" to="/link3">
              <Link
                to="/userProfile/tables"
                className="text-white fw-bold text-decoration-none"
              >
                Progress
              </Link>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <Button>
          <Link
            to="/userProfile/diet"
            className="text-white fw-bold text-decoration-none"
          >
            Diet
          </Link>
        </Button>
        <Button color="inherit" to="/link2">
          <Link
            to="/userProfile/workout"
            className="text-white fw-bold text-decoration-none"
          >
            Workout
          </Link>
        </Button>
        <Button color="inherit" to="/link3">
          <Link
            to="/userProfile/tables"
            className="text-white fw-bold text-decoration-none"
          >
            Progress
          </Link>
        </Button>
      </Drawer>
    </div>
  );
};

export default NavBar;
