import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Grid, Snackbar, Container } from "@mui/material";
import "chart.js/auto";
import NavBar from "../component/Navbar";
import TableDisplay from "../component/AllTables/TableDisplay";
import TableForm from "../component/AllTables/TableForm";
import useToken from "../customHooks/useToken";
import UseDecodeToken from "../customHooks/UseDecodeToken";
import Loading from "../component/Loading";

function AllTables() {
  const [tables, setTables] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [tableName, setTableName] = useState("");
  const [entries, setEntries] = useState([{ entryName: "", entryValue: "" }]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useToken();

  const handleEntryChange = (index, key, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index][key] = value;
    setEntries(updatedEntries);
  };

  const addEntry = () => {
    setEntries([...entries, { entryName: "", entryValue: "" }]);
  };

  const submitTable = async () => {
    const userId = UseDecodeToken(token);
    const data = { tableName, entries };

    try {
      await axios.post(
        `http://localhost:3001/user/customtables?userId=${userId}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
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
    const userId = UseDecodeToken(token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        `http://localhost:3001/user/${userId}/tables`,
        config
      );
      setTables(response.data);
      setResponseMessage("Data fetched successfully");
      setIsLoading(false);
    } catch (error) {
      setResponseMessage("Error fetching the data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const addEntryToTable = async (tableId, entryName, entryValue) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/user/customtables/${tableId}/entries`,
        {
          entryName,
          entryValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      await fetchData();
    } catch (error) {
      console.error("Errore nell'eliminare la tabella: ", error);
    }
  };

  if (isLoading === true) {
    return <Loading />;
  }

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

        <TableForm
          tableName={tableName}
          setTableName={setTableName}
          entries={entries}
          setEntries={setEntries}
          handleEntryChange={handleEntryChange}
          addEntry={addEntry}
          submitTable={submitTable}
        />

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={responseMessage !== ""}
          autoHideDuration={6000}
          message={responseMessage}
          onClose={() => setResponseMessage("")}
        />
        <Grid container spacing={3}>
          {tables.map((table, idx) => (
            <TableDisplay
              key={idx}
              table={table}
              addEntryToTable={(entryValue, entryName) =>
                addEntryToTable(table.id, entryValue, entryName)
              }
              deleteTable={deleteTable}
            />
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default AllTables;
