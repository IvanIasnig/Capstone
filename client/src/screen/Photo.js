import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

function ImageUploader() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
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

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const fetchAndSetImage = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/user/${userId}/images`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // console.log("GET");
      setImages(response.data);
      // console.log(images);
    } catch (error) {
      console.error("Errore durante il recupero dell'immagine:", error);
    }
  };

  const onUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const userId = getUserIdFromToken();
    if (!userId) {
      console.error("Impossibile recuperare l'ID dell'utente dal token.");
      return;
    }
    formData.append("id", userId);

    try {
      await axios.post("http://localhost:3001/user/images", formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      //console.log("POST");
      fetchAndSetImage(userId);
      //console.log(images);
    } catch (error) {
      console.error("Errore durante l'upload dell'immagine:", error);
    }
  };

  console.log(images[0].data);
  console.log(images[1].data);
  return (
    <div>
      <input type="file" onChange={onFileChange} />
      <button onClick={onUpload} className="btn btn-primary mb-3">
        Carica
      </button>

      <Grid container spacing={3}>
        {images &&
          images.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={3}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`data:image/png;base64,${image.data}`}
                  alt={`Uploaded ${index}`}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Immagine {index + 1}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Questa è l'immagine numero {index + 1} caricata.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default ImageUploader;
