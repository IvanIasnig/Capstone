import React from "react";

import { TextField, Button, Paper, Grid } from "@mui/material";

function TableForm({
  tableName,
  setTableName,
  entries,
  handleEntryChange,
  addEntry,
  submitTable,
}) {
  return (
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
  );
}

export default TableForm;
