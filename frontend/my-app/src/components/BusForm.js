
/*
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBus } from '../actions/busActions';
import { useAuth } from '../context/AuthContext';  // Assuming user authentication is managed in the context
import { useNavigate } from 'react-router-dom'; 
const BusForm = () => {
    const { user } = useAuth(); // Get the logged-in operator details
    const [busData, setBusData] = useState({
        busName: '',
        busNumber: '',
        busCapacity: '',
        amenities: '',  // Comma-separated amenities
        rows: '',  // Number of rows in the bus
        seatsPerRow: '',  // Number of seats per row
        operator: user?.account?._id || '', // Operator ID from the user context
        images: null,  // Added to store image files
    });
    const [imagePreviews, setImagePreviews] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'amenities') {
            // Convert comma-separated string into an array
            const amenitiesArray = value.split(',').map(amenity => amenity.trim());
            setBusData({
                ...busData,
                [name]: amenitiesArray
            });
        } else if (name === 'busCapacity' || name === 'rows' || name === 'seatsPerRow') {
            setBusData({
                ...busData,
                [name]: parseInt(value, 10)  // Convert to integer where applicable
            });
        } else {
            setBusData({
                ...busData,
                [name]: value
            });
        }
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        setBusData({
            ...busData,
            images: files,  // Store the selected files
        });
    
        // Generate file previews or show filenames
        const previews = Array.from(files).map(file => file.name); // Get filenames or use FileReader for image previews
        setImagePreviews(previews);
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Append all the other fields
        Object.entries(busData).forEach(([key, value]) => {
            if (key === 'images' && value) {
                // Append multiple images
                Array.from(value).forEach((file, index) => {
                    formData.append('images', file);  // Ensure the field name is 'images'
                });
            } else {
                formData.append(key, Array.isArray(value) ? JSON.stringify(value) : value);
            }
        });

        try {
            // Dispatch action or make API call
            dispatch(addBus(formData));
            navigate('/bus-list')
            // Reset the form
            setBusData({
                busName: '',
                busNumber: '',
                busCapacity: '',
                amenities: '',
                rows: '',
                seatsPerRow: '',
                operator: user?.account?._id || '',
                images: null,
            });
            setImagePreviews([]); 
        } catch (err) {
            console.error('Error submitting form:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
           <label htmlFor="busName">Bus Name</label><br />
  <input type="text" name="busName" value={busData.busName} onChange={handleChange} required />
  <br />
  
  <label htmlFor="busNumber">Bus Number</label><br />
  <input type="text" name="busNumber" value={busData.busNumber} onChange={handleChange} required />
  <br />
  
  <label htmlFor="busCapacity">Bus Capacity</label><br />
  <input type="number" name="busCapacity" value={busData.busCapacity} onChange={handleChange} required />
  <br />
  
  <label htmlFor="amenities">Amenities</label><br />
  <input type="text" name="amenities" value={busData.amenities} onChange={handleChange} />
  <br />
  
  <label htmlFor="rows">Number of Rows</label><br />
  <input type="number" name="rows" value={busData.rows} onChange={handleChange} required />
  <br />
  
  <label htmlFor="seatsPerRow">Seats per Row</label><br />
  <input type="number" name="seatsPerRow" value={busData.seatsPerRow} onChange={handleChange} required />
  <br />
  
  <label htmlFor="images">Upload Images</label><br />
  <input
    type="file"
    id="images"
    name="images"  // Ensure this matches the backend field name
    onChange={handleFileChange}
    multiple // Allows multiple file selection
  />
  <br />

     
      {imagePreviews.length > 0 && (
                <div>
                    
                    <ul>
                        {imagePreviews.map((preview, index) => (
                            <li key={index}>{preview}</li> // You can replace this with image previews if you want
                        ))}
                    </ul>
                </div>
            )}
            <button type="submit">Add Bus</button>
        </form>
    );
};

export default BusForm;
*/

import React, { useState } from "react";
import {
  TextField,
  Typography,
  Box,
  Button,
  Grid,
  IconButton,
  Card,
  CardContent,
  FormHelperText,
  List,
  ListItem,
  ListItemText,
  InputLabel,
} from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addBus } from "../actions/busActions";
import { useAuth } from "../context/AuthContext"; // Assuming user authentication is managed in the context
import { useNavigate } from "react-router-dom";

const BusForm = () => {
  const { user } = useAuth(); // Get the logged-in operator details
  const [busData, setBusData] = useState({
    busName: "",
    busNumber: "",
    busCapacity: "",
    amenities: "", // Comma-separated amenities
    rows: "", // Number of rows in the bus
    seatsPerRow: "", // Number of seats per row
    operator: user?.account?._id || "", // Operator ID from the user context
    images: null, // Added to store image files
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amenities") {
        if (value.trim() === "") {
            setBusData({
                ...busData,
                [name]: [],
            });
        } else {
            // Remove any additional quotes or spaces
            const amenitiesArray = value.split(",").map((amenity) =>
                amenity.trim().replace(/^['"]+|['"]+$/g, "") // Remove leading/trailing quotes
            );
            setBusData({
                ...busData,
                [name]: amenitiesArray,
            });
        }
    } else if (name === "busCapacity" || name === "rows" || name === "seatsPerRow") {
        setBusData({
            ...busData,
            [name]: parseInt(value, 10),
        });
    } else {
        setBusData({
            ...busData,
            [name]: value,
        });
    }
};

  

  const handleFileChange = (e) => {
    const files = e.target.files;
    setBusData({
      ...busData,
      images: files, // Store the selected files
    });

    // Generate file previews or show filenames
    const previews = Array.from(files).map((file) => file.name); // Get filenames or use FileReader for image previews
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append all the other fields
    Object.entries(busData).forEach(([key, value]) => {
      if (key === "images" && value) {
        // Append multiple images
        Array.from(value).forEach((file) => {
          formData.append("images", file); // Ensure the field name is 'images'
        });
      } else {
        formData.append(key, Array.isArray(value) ? JSON.stringify(value) : value);
      }
    });

    try {
      // Dispatch action or make API call
      dispatch(addBus(formData));
      navigate("/bus-list");
      // Reset the form
      setBusData({
        busName: "",
        busNumber: "",
        busCapacity: "",
        amenities: "",
        rows: "",
        seatsPerRow: "",
        operator: user?.account?._id || "",
        images: null,
      });
      setImagePreviews([]);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <Box
      sx={{
        mt: 6,
        px: 3,
        maxWidth: 600,
        mx: "auto",
      }}
    >
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Add New Bus
          </Typography>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bus Name"
                  name="busName"
                  value={busData.busName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bus Number"
                  name="busNumber"
                  value={busData.busNumber}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bus Capacity"
                  name="busCapacity"
                  type="number"
                  value={busData.busCapacity}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Amenities"
                  name="amenities"
                  helperText="Enter amenities separated by commas"
                  value={busData.amenities}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Number of Rows"
                  name="rows"
                  type="number"
                  value={busData.rows}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Seats per Row"
                  name="seatsPerRow"
                  type="number"
                  value={busData.seatsPerRow}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Upload Images</InputLabel>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<AddPhotoAlternate />}
                  fullWidth
                >
                  Select Files
                  <input
                    type="file"
                    id="images"
                    name="images"
                    onChange={handleFileChange}
                    multiple
                    hidden
                  />
                </Button>
                {imagePreviews.length > 0 && (
                  <List>
                    {imagePreviews.map((preview, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={preview} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Add Bus
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BusForm;
