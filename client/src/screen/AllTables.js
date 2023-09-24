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
import NavBar from "../component/Navbar";

function AllTables() {
  const [inputEntryName, setInputEntryName] = useState("");
  const [inputEntryValue, setInputEntryValue] = useState("");

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
      await fetchData();
    } catch (error) {
      setResponseMessage("Error creating the table");
    }
  };

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

  useEffect(() => {
    fetchData();
  }, [authToken]);

  const addEntryToTable = async (tableId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/user/customtables/${tableId}/entries`,
        {
          entryName: inputEntryName,
          entryValue: inputEntryValue,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log(response.data);
      setInputEntryName("");
      setInputEntryValue("");
      await fetchData();
    } catch (error) {
      console.error("Errore nell'aggiungere l'entry:", error);
    }
  };

  const deleteTable = async (tableId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/user/customtables/${tableId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log(response.data);
      await fetchData();
    } catch (error) {
      console.error("Errore nell'eliminare la tabella: ", error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: "url(https://wallpapercave.com/wp/wp7578886.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <NavBar />
      <Container
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0)",
          color: "#FFF",
        }}
      >
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Table Name"
                variant="outlined"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "rgba(255, 255, 255, 0.7)",
                    borderColor: "rgba(255, 255, 255, 0.9)",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.9)",
                    },
                    "&:hover fieldset": {
                      borderColor: "orange",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "orange",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.9)",
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
                        color: "rgba(255, 255, 255, 0.9)",
                        borderColor: "rgba(255, 255, 255, 0.9)",
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.9)",
                        },
                        "&:hover fieldset": {
                          borderColor: "orange",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "orange",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.9)",
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
                        color: "rgba(255, 255, 255, 0.9)",
                        borderColor: "rgba(255, 255, 255, 0.9)",
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.9)",
                        },
                        "&:hover fieldset": {
                          borderColor: "orange",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "orange",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.9)",
                      },
                    }}
                    variant="outlined"
                    type="number"
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
            //console.log(table);
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
              <Grid item xs={12} sm={6} key={idx}>
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
                    <Line
                      data={chartData}
                      options={{ maintainAspectRatio: false }}
                    />
                  </div>

                  <form
                    noValidate
                    autoComplete="off"
                    style={{ marginTop: "16px" }}
                  >
                    <TextField
                      label="Entry Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={inputEntryName}
                      onChange={(e) => setInputEntryName(e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "rgba(255, 255, 255, 0.9)",
                          borderColor: "rgba(255, 255, 255, 0.9)",
                          "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.9)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgb(255, 231, 164)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "rgb(255, 231, 164)",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255, 255, 255, 0.9)",
                        },
                      }}
                    />
                    <TextField
                      label="Entry Value"
                      variant="outlined"
                      type="number"
                      fullWidth
                      margin="normal"
                      value={inputEntryValue}
                      onChange={(e) => setInputEntryValue(e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "rgba(255, 255, 255, 0.9)",
                          borderColor: "rgba(255, 255, 255, 0.9)",
                          "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.9)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgb(255, 231, 164)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "rgb(255, 231, 164)",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255, 255, 255, 0.9)",
                        },
                      }}
                    />
                    <Button
                      style={{ marginTop: "8px" }}
                      variant="contained"
                      color="primary"
                      onClick={() => addEntryToTable(table.id)}
                    >
                      Add Entry
                    </Button>
                    <Button
                      style={{ marginTop: "8px", backgroundColor: "red" }}
                      className="ms-2"
                      variant="contained"
                      onClick={() => deleteTable(table.id)}
                    >
                      Delete Table
                    </Button>
                  </form>
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
