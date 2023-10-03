import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Collapse,
  CardActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Exercises() {
  const [help, setHelp] = useState(null);
  const [muscle, setMuscle] = useState("");
  const [expandedId, setExpandedId] = useState(null);

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
    }
  };

  useEffect(() => {
    exe();
  }, []);

  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  console.log(help);

  return (
    <Container maxWidth="md" style={{ marginTop: "40px" }}>
      <TextField
        variant="outlined"
        fullWidth
        label="Muscle"
        value={muscle}
        onChange={(e) => setMuscle(e.target.value)}
        InputProps={{
          endAdornment: (
            <Button
              onClick={exe}
              variant="contained"
              color="primary"
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          ),
        }}
      />
      <div style={{ marginTop: "20px" }}>
        {help &&
          help.map((x, index) => (
            <Card key={index} style={{ marginBottom: "20px" }}>
              <CardContent>
                <Typography variant="h5">{x.name}</Typography>
                <Typography color="textSecondary">
                  Difficulty: {x.difficulty}
                </Typography>
                <Typography color="textSecondary">
                  Muscle: {x.muscle}
                </Typography>
                <Typography color="textSecondary">
                  Equipment: {x.equipment}
                </Typography>
                <Collapse
                  in={expandedId === index}
                  timeout="auto"
                  unmountOnExit
                >
                  <Typography color="textSecondary">
                    Instruction: "{x.instructions}"
                  </Typography>
                </Collapse>
              </CardContent>
              <CardActions>
                <Button
                  startIcon={<ExpandMoreIcon />}
                  onClick={() => handleExpandClick(index)}
                >
                  {expandedId === index
                    ? (console.log("Expanded ID:", x.index), "Leggi meno")
                    : "Leggi tutto"}
                </Button>
              </CardActions>
            </Card>
          ))}
      </div>
    </Container>
  );
}

export default Exercises;
