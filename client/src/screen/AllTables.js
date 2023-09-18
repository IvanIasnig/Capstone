import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Bar } from "react-chartjs-2";
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
    <div>
      <h2>Create a new table</h2>
      <div>
        <label>
          Table Name:
          <input
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
          />
        </label>
        {entries.map((entry, idx) => (
          <div key={idx}>
            <label>
              Entry Name:
              <input
                value={entry.entryName}
                onChange={(e) =>
                  handleEntryChange(idx, "entryName", e.target.value)
                }
              />
            </label>
            <label>
              Entry Value:
              <input
                value={entry.entryValue}
                onChange={(e) =>
                  handleEntryChange(idx, "entryValue", e.target.value)
                }
              />
            </label>
          </div>
        ))}
        <button onClick={addEntry}>Add another entry</button>
        <button onClick={submitTable}>Submit Table</button>
      </div>
      <div>
        <p>{responseMessage}</p>
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
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                borderWidth: 1,
              },
            ],
          };

          return (
            <div key={idx} style={{ marginBottom: "20px" }}>
              <h3>{table.tableName}</h3>
              <Bar data={chartData} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllTables;
