import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";

const HomeScreen = () => {
  return (
    <>
      <Card elevation={3}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Already have an account?
          </Typography>

          <Box m={1}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
          </Box>

          <Typography variant="subtitle1" gutterBottom>
            or
          </Typography>

          <Box m={1}>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to="/registration"
            >
              Register
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default HomeScreen;
