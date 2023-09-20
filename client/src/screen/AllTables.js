import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Line } from "react-chartjs-2";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Snackbar,
  Container,
} from "@mui/material";
import Tables from "../component/Tables";

function AllTables() {
  const [tables, setTables] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [tableName, setTableName] = useState("");
  const [entries, setEntries] = useState([{ entryName: "", entryValue: "" }]);
  const authToken = localStorage.getItem("authToken");

  function getUserIdFromToken() {
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      return decoded.sub;
    } catch (err) {
      return null;
    }
  }

  const handleEntryChange = (index, key, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index][key] = value;
    setEntries(updatedEntries);
  };

  const addEntry = () => {
    setEntries([...entries, { entryName: "", entryValue: "" }]);
  };

  const submitTable = async () => {
    const userId = getUserIdFromToken();
    const data = { tableName, entries };

    try {
      await axios.post(
        `http://localhost:3001/user/customtables?userId=${userId}`,
        data,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setResponseMessage("Table created successfully");
      setTableName("");
      setEntries([{ entryName: "", entryValue: "" }]);
    } catch (error) {
      setResponseMessage("Error creating the table");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userId = getUserIdFromToken();

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      try {
        const response = await axios.get(
          `http://localhost:3001/user/${userId}/tables`,
          config
        );
        setTables(response.data);
        setResponseMessage("Data fetched successfully");
      } catch (error) {
        setResponseMessage("Error fetching the data");
      }
    };

    fetchData();
  }, [authToken]);

  return (
    <div
      style={{
        backgroundImage: "url(https://wallpapercave.com/wp/wp7578886.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Container style={{ backgroundColor: "rgba(0, 0, 0, 0)", color: "#FFF" }}>
        <Typography variant="h4" gutterBottom style={{ color: "#FFF" }}>
          Create a new table
        </Typography>

        <Paper
          style={{
            padding: "16px",
            marginBottom: "24px",
            backgroundColor: "#333",
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Table Name"
                variant="outlined"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "rgba(255, 255, 255, 0.7)",
                    borderColor: "rgba(255, 255, 255, 0.8)",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.8)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.8)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.8)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.8)",
                  },
                }}
              />
            </Grid>

            {entries.map((entry, idx) => (
              <React.Fragment key={idx}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Entry Name"
                    variant="outlined"
                    value={entry.entryName}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "rgba(255, 255, 255, 0.8)",
                        borderColor: "rgba(255, 255, 255, 0.8)",
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.8)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.8)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.8)",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.8)",
                      },
                    }}
                    onChange={(e) =>
                      handleEntryChange(idx, "entryName", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Entry Value"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "rgba(255, 255, 255, 0.8)",
                        borderColor: "rgba(255, 255, 255, 0.8)",
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.8)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.8)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.8)",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.8)",
                      },
                    }}
                    variant="outlined"
                    value={entry.entryValue}
                    onChange={(e) =>
                      handleEntryChange(idx, "entryValue", e.target.value)
                    }
                  />
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={addEntry}>
                Add another entry
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginLeft: "16px" }}
                onClick={submitTable}
              >
                Submit Table
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={responseMessage !== ""}
          autoHideDuration={6000}
          message={responseMessage}
          onClose={() => setResponseMessage("")}
        />

        <Grid container spacing={3}>
          {tables.map((table, idx) => {
            const labels = table.entries.map((entry) => entry.entryName);
            const data = table.entries.map((entry) => entry.entryValue);
            const chartData = {
              labels: labels,
              datasets: [
                {
                  label: table.tableName,
                  data: data,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            };

            return (
              <Grid item xs={12} sm={4} key={idx}>
                <Paper
                  style={{
                    padding: "16px",
                    marginBottom: "24px",
                    backgroundColor: "#333",
                    color: "#FFF",
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    {table.tableName}
                  </Typography>
                  <div style={{ height: "400px" }}>
                    {" "}
                    {/* Definisci qui l'altezza */}
                    <Line
                      data={chartData}
                      options={{ maintainAspectRatio: false }}
                    />
                  </div>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AllTables;
