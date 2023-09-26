import { useState } from "react";
import { Line } from "react-chartjs-2";
import { TextField, Button, Typography, Paper, Grid } from "@mui/material";

function TableDisplay({ table, addEntryToTable, deleteTable }) {
  const [inputEntryName, setInputEntryName] = useState("");
  const [inputEntryValue, setInputEntryValue] = useState("");

  const labels = table.entries.map((entry) => entry.entryName);
  const data = table.entries.map((entry) => entry.entryValue);
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: table.tableName,
        data: data,
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  console.log("entry value -> " + inputEntryValue);
  console.log("entry name -> " + inputEntryName);

  return (
    <Grid item xs={12} sm={6}>
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
          <Line data={chartData} options={{ maintainAspectRatio: false }} />
        </div>

        <form noValidate autoComplete="off" style={{ marginTop: "16px" }}>
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
            onClick={() =>
              addEntryToTable(inputEntryName, inputEntryValue, table.id)
            }
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
}
export default TableDisplay;
