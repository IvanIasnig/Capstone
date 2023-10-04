import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MenuItem,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Collapse,
  CardActions,
  Select,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavBar from "../component/Navbar";
import exeBg from "../images/exercisesBg.jpg";
import Loading from "../component/Loading";

function Exercises() {
  const [help, setHelp] = useState(null);
  const [muscle, setMuscle] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const muscles = [
    "abdominals",
    "abductors",
    "adductors",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "lower_back",
    "middle_back",
    "neck",
    "quadriceps",
    "traps",
    "triceps",
  ];

  const exe = async () => {
    const key = "O8Wud7XdQacxnNvNgPTVhA==JLgBvWH7PqMR9mM1";
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`,
        {
          headers: { "X-Api-Key": key },
        }
      );

      const exer = response.data;
      setHelp(exer);
    } catch (error) {
      console.error("Error" + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    exe();
  }, []);

  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (isLoading) {
    return <Loading />;
  }

  console.log(help);

  return (
    <div
      style={{
        backgroundImage: `url(${exeBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        color: "white",
      }}
    >
      <NavBar />
      <Container maxWidth="md" style={{ marginTop: "40px" }}>
        <Select
          value={muscle}
          onChange={(e) => setMuscle(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: "white",
          }}
          endAdornment={
            <Button
              onClick={exe}
              variant="contained"
              color="primary"
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          }
        >
          {muscles.map((muscleOption) => (
            <MenuItem key={muscleOption} value={muscleOption}>
              {muscleOption.charAt(0).toUpperCase() + muscleOption.slice(1)}
            </MenuItem>
          ))}
        </Select>
        <div style={{ marginTop: "20px" }}>
          {help &&
            help.map((x, index) => (
              <Card key={index} style={{ marginBottom: "20px" }}>
                <CardContent>
                  <Typography variant="h5" className="mb-2">
                    {x.name}
                  </Typography>
                  <Typography color="textSecondary" className="mb-2">
                    <span style={{ color: "rgb(0, 100, 100)" }}>
                      Difficulty:{" "}
                    </span>{" "}
                    {x.difficulty}
                  </Typography>
                  <Typography color="textSecondary" className="mb-2">
                    <span style={{ color: "rgb(0, 100, 100)" }}>Muscle: </span>{" "}
                    {x.muscle}
                  </Typography>
                  <Typography color="textSecondary" className="mb-2">
                    <span style={{ color: "rgb(0, 100, 100)" }}>
                      Equipment:{" "}
                    </span>
                    {x.equipment}
                  </Typography>
                  <Collapse
                    in={expandedId === index}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Typography color="textSecondary" className="mb-2">
                      <span style={{ color: "rgb(0, 100, 100)" }}>
                        Instructions:{" "}
                      </span>{" "}
                      "{x.instructions}"
                    </Typography>
                  </Collapse>
                </CardContent>
                <CardActions>
                  <Button
                    startIcon={<ExpandMoreIcon />}
                    onClick={() => handleExpandClick(index)}
                  >
                    {expandedId === index
                      ? (console.log("Expanded ID:", x.index), "Close")
                      : "Read all"}
                  </Button>
                </CardActions>
              </Card>
            ))}
        </div>
      </Container>
    </div>
  );
}

export default Exercises;
