import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Grid, Input, Button, Dialog } from "@mui/material";
import NavBar from "../component/Navbar";
import useToken from "../customHooks/useToken";
import UseDecodeToken from "../customHooks/UseDecodeToken";

function ImageUploader() {
  const [orderByDate, setOrderByDate] = useState(false);
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const token = useToken();
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const fetchAndSetImage = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/user/${userId}/images`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setImages(response.data);
    } catch (error) {
      console.error("Errore durante il recupero dell'immagine:", error);
    }
  };

  const deleteImage = async (tableId) => {
    const userId = UseDecodeToken(token);
    try {
      const del = await axios.delete(
        `http://localhost:3001/user/images/${tableId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchAndSetImage(userId);
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
    const userId = UseDecodeToken(token);
    fetchAndSetImage(userId);
  }, []);

  const onUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("date", date);

    const userId = UseDecodeToken(token);
    if (!userId) {
      console.error("Impossibile recuperare l'ID dell'utente dal token.");
      return;
    }
    formData.append("id", userId);

    try {
      await axios.post("http://localhost:3001/user/images", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAndSetImage(userId);
    } catch (error) {
      console.error("Errore durante l'upload dell'immagine:", error);
    }
  };

  function sortImagesByDate(images) {
    return [...images].sort((a, b) => new Date(a.date) - new Date(b.date));
  }

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
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "1em",
            padding: "0.5em",
            marginBottom: "2em",
          }}
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
              Select
            </Button>
          </label>

          <Input
            type="text"
            placeholder="Descrizione"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ backgroundColor: "white" }}
          />

          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ backgroundColor: "white" }}
          />

          <Button
            onClick={onUpload}
            variant="outlined"
            sx={{
              color: "primary.main",
              marginLeft: "1em",
              borderColor: "primary.main",
            }}
          >
            Load
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

        <button
          onClick={() => setOrderByDate(!orderByDate)}
          className="btn btn-success ms-4 mb-3"
        >
          {orderByDate ? "Sort normally" : "Sort by date"}
        </button>

        <Grid container spacing={1}>
          {images &&
            (orderByDate ? sortImagesByDate(images) : [...images]).map(
              (image, index) => {
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
                          variant="h6"
                          color="textPrimary"
                          component="p"
                          sx={{
                            fontWeight: "bold",
                            marginBottom: "1em",
                            textAlign: "center",
                          }}
                        >
                          {image.name.replace(/\..+$/, "")}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          sx={{
                            textAlign: "center",
                            fontStyle: "italic",
                            fontWeight: "medium",
                          }}
                        >
                          "{image.description}"
                        </Typography>

                        <div
                          style={{
                            marginTop: "1em",
                          }}
                        >
                          <CalendarTodayIcon
                            color="action"
                            sx={{ marginRight: "0.5em" }}
                          />
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {image.date}
                          </Typography>
                        </div>
                      </CardContent>

                      <Button
                        onClick={() => handleDelete(image.id)}
                        sx={{
                          // marginBottom: "500 px !important",
                          // marginLeft: "500 px !important",
                          "&:hover": {
                            backgroundColor: "red",
                            color: "white",
                          },
                        }}
                      >
                        Delete
                      </Button>
                    </Card>
                  </Grid>
                );
              }
            )}
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
