import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid, Input, Button, Dialog } from "@mui/material";
import NavBar from "../component/Navbar";

function ImageUploader() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const authToken = localStorage.getItem("authToken");
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);

  // console.log(file);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const deleteImage = async (tableId) => {
    try {
      const del = await axios.delete(
        `http://localhost:3001/user/images/${tableId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // console.log(del.data);
    } catch (error) {
      console.error("Img not found: ", error);
    }
  };

  const handleDelete = async (tableId) => {
    try {
      console.log(tableId);
      await deleteImage(tableId);
      const updatedImages = images.filter((image) => image.tableId !== tableId);
      setImages(updatedImages);
    } catch (error) {
      console.error("Errore durante l'eliminazione dell'immagine:", error);
    }
  };

  useEffect(() => {
    const userId = getUserIdFromToken();
    fetchAndSetImage(userId);
  }, []);

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

  // console.log(images);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "black",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <NavBar />
      <div style={{ padding: "2em", backgroundColor: "black" }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ textAlign: "center", marginBottom: "1em", color: "white" }}
        >
          MyPhotos
        </Typography>

        <div
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1em",
          }}
          className="mb-5"
        >
          <Input
            type="file"
            onChange={onFileChange}
            sx={{ display: "none" }}
            id="file-input"
          />
          <label htmlFor="file-input">
            <Button
              component="span"
              variant="contained"
              sx={{
                color: "common.white",
                backgroundColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              Seleziona
            </Button>
          </label>

          <Button
            onClick={onUpload}
            variant="outlined"
            sx={{
              color: "primary.main",
              marginLeft: "1em",
              borderColor: "primary.main",
            }}
          >
            Carica
          </Button>
          {file && (
            <Typography
              sx={{
                color: "white",
                marginTop: "20px",
                padding: "0.2em 0.5em",
                backgroundColor: "rgba(30, 30, 30, 0.7)",
                borderRadius: "5px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {file.name} loaded correctly!
            </Typography>
          )}
        </div>

        <Grid container spacing={1}>
          {images &&
            images.map((image, index) => {
              console.log(image);
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={index}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Card
                    elevation={10}
                    sx={{
                      marginTop: "1rem",
                      maxWidth: "90%",
                      width: "100%",
                      borderRadius: "0.5em",
                      overflow: "hidden",
                      boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0px 5px 20px orange",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: "100%",
                        height: "auto",
                        transition: "0.3s",
                        "&:hover": {
                          transform: "scale(1.03)",
                        },
                      }}
                      image={`data:image/png;base64,${image.data}`}
                      alt={`Uploaded ${index}`}
                      onClick={() => handleImageClick(image)}
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        sx={{
                          fontWeight: "bold",
                          marginTop: "1em",
                          textAlign: "center",
                        }}
                      >
                        {image.name.replace(/\..+$/, "")}
                      </Typography>
                    </CardContent>
                    <Button
                      onClick={() => handleDelete(image.id)}
                      className="btn btn-danger"
                    >
                      Elimina
                    </Button>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <img
            src={`data:image/png;base64,${
              selectedImage ? selectedImage.data : ""
            }`}
            alt="Selected"
            style={{ width: "100%", height: "100%" }}
          />
        </Dialog>
      </div>
    </div>
  );
}

export default ImageUploader;
