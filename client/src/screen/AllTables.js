import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Typography, Grid, Snackbar, Container } from "@mui/material";
import Tables from "../component/Tables";
import NavBar from "../component/Navbar";
import TableDisplay from "../component/AllTables/TableDisplay";
import TableForm from "../component/AllTables/TableForm";

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
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // console.log(
      //   "entry name -> " + entryName,
      //   " entry value -> " + entryValue
      // );
      console.log(authToken);
      console.log(response.data);
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

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import jwtDecode from "jwt-decode";
// import { Typography, Grid, Snackbar, Container } from "@mui/material";
// import Tables from "../component/Tables";
// import NavBar from "../component/Navbar";
// import TableDisplay from "../component/AllTables/TableDisplay";
// import TableForm from "../component/AllTables/TableForm";

// function AllTables() {
//   const [tables, setTables] = useState([]);
//   const [responseMessage, setResponseMessage] = useState("");
//   const [tableName, setTableName] = useState("");
//   const [entries, setEntries] = useState([{ entryName: "", entryValue: "" }]);
//   const authToken = localStorage.getItem("authToken");

//   function getUserIdFromToken() {
//     const token = localStorage.getItem("authToken");
//     if (!token) return null;

//     try {
//       const decoded = jwtDecode(token);
//       return decoded.sub;
//     } catch (err) {
//       return null;
//     }
//   }

//   const handleEntryChange = (index, key, value) => {
//     const updatedEntries = [...entries];
//     updatedEntries[index][key] = value;
//     setEntries(updatedEntries);
//   };

//   const addEntry = () => {
//     setEntries([...entries, { entryName: "", entryValue: "" }]);
//   };

//   const submitTable = async () => {
//     const userId = getUserIdFromToken();
//     const data = { tableName, entries };

//     try {
//       await axios.post(
//         `http://localhost:3001/user/customtables?userId=${userId}`,
//         data,
//         {
//           headers: { Authorization: `Bearer ${authToken}` },
//         }
//       );
//       setResponseMessage("Table created successfully");
//       setTableName("");
//       setEntries([{ entryName: "", entryValue: "" }]);
//       await fetchData();
//     } catch (error) {
//       setResponseMessage("Error creating the table");
//     }
//   };

//   const fetchData = async () => {
//     const userId = getUserIdFromToken();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//       },
//     };

//     try {
//       const response = await axios.get(
//         `http://localhost:3001/user/${userId}/tables`,
//         config
//       );
//       setTables(response.data);
//       setResponseMessage("Data fetched successfully");
//     } catch (error) {
//       setResponseMessage("Error fetching the data");
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [authToken]);

//   const addEntryToTable = async (tableId, entryName, entryValue) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:3001/user/customtables/${tableId}/entries`,
//         {
//           entryName,
//           entryValue,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );
//       console.log(authToken);
//       console.log(response.data);
//       await fetchData();
//     } catch (error) {
//       console.error("Errore nell'aggiungere l'entry:", error);
//     }
//   };

//   const deleteTable = async (tableId) => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:3001/user/customtables/${tableId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );

//       console.log(response.data);
//       await fetchData();
//     } catch (error) {
//       console.error("Errore nell'eliminare la tabella: ", error);
//     }
//   };

//   return (
//     <div
//       style={{
//         width: "100%",
//         minHeight: "100vh",
//         backgroundImage: "url(https://wallpapercave.com/wp/wp7578886.jpg)",
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//       }}
//     >
//       <NavBar />
//       <Container
//         sx={{
//           backgroundColor: "rgba(0, 0, 0, 0)",
//           color: "#FFF",
//         }}
//       >
//         <Typography variant="h4" gutterBottom style={{ color: "#FFF" }}>
//           Create a new table
//         </Typography>

//         <TableForm
//           tableName={tableName}
//           setTableName={setTableName}
//           entries={entries}
//           setEntries={setEntries}
//           handleEntryChange={handleEntryChange}
//           addEntry={addEntry}
//           submitTable={submitTable}
//         />

//         <Snackbar
//           anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//           open={responseMessage !== ""}
//           autoHideDuration={6000}
//           message={responseMessage}
//           onClose={() => setResponseMessage("")}
//         />
//         <Grid container spacing={3}>
//           {tables.map((table, idx) => (
//             <TableDisplay
//               key={idx}
//               table={table}
//               addEntryToTable={(entryName, entryValue) =>
//                 addEntryToTable(table.id, entryName, entryValue)
//               }
//               deleteTable={deleteTable}
//             />
//           ))}
//         </Grid>
//       </Container>
//     </div>
//   );
// }

// export default AllTables;
