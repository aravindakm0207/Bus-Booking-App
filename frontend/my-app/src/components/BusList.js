/*

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuses, deleteBus, updateBus } from '../actions/busActions';
import { useAuth } from '../context/AuthContext';

const BusList = () => {
    const { user } = useAuth(); // Get logged-in operator details
    const dispatch = useDispatch();
    const buses = useSelector(state => state.buses.buses || []);
    const [editBusId, setEditBusId] = useState(null); // Track which bus is being edited
    const [busData, setBusData] = useState({
        busName: '',
        busNumber: '',
        busCapacity: '',
        amenities: '',
        operator: user?.account?._id || ''
    });

    useEffect(() => {
        dispatch(fetchBuses());
    }, [dispatch]);

    const handleEdit = (bus) => {
        setEditBusId(bus._id); // Set the bus ID to edit
        setBusData({
            busName: bus.busName,
            busNumber: bus.busNumber,
            busCapacity: bus.busCapacity,
            amenities: bus.amenities.join(', '), // Convert amenities array to comma-separated string
            operator: user?.account?._id || ''
        });
    };

    const handleRemove = (busId) => {
        dispatch(deleteBus(busId));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'amenities') {
            // Convert comma-separated string into an array
            const amenitiesArray = value.split(',').map(amenity => amenity.trim());
            setBusData({
                ...busData,
                [name]: amenitiesArray
            });
        } else if (name === 'busCapacity') {
            setBusData({
                ...busData,
                [name]: parseInt(value, 10) // Convert to integer
            });
        } else {
            setBusData({
                ...busData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateBus(editBusId, busData)); // Dispatch action to update bus
        console.log('Updated bus data:', busData);
        setEditBusId(null); // Reset editing state
    };

    return (
        <div>
            <h2>Bus List</h2>
            <ul>
                {buses.map(bus => (
                    <li key={bus._id}>
                        {editBusId === bus._id ? (
                            <form onSubmit={handleSubmit}>
                                <label>Bus Name:</label>
                                <input
                                    type="text"
                                    name="busName"
                                    placeholder="Bus Name"
                                    value={busData.busName}
                                    onChange={handleChange}
                                    required
                                />
                                <br />
                                <label>Bus Number:</label>
                                <input
                                    type="text"
                                    name="busNumber"
                                    placeholder="Bus Number"
                                    value={busData.busNumber}
                                    onChange={handleChange}
                                    required
                                />
                                <br />
                                <label>Bus Capacity:</label>
                                <input
                                    type="number"
                                    name="busCapacity"
                                    placeholder="Bus Capacity"
                                    value={busData.busCapacity}
                                    onChange={handleChange}
                                    required
                                />
                                <br />
                                <label>Amenities (comma-separated):</label>
                                <input
                                    type="text"
                                    name="amenities"
                                    placeholder="Amenities"
                                    value={busData.amenities}
                                    onChange={handleChange}
                                />
                                <br />
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setEditBusId(null)}>Cancel</button>
                            </form>
                        ) : (
                            <>
                                <div>
                                    <strong>Bus Name: </strong>{bus.busName} | <strong>Bus Number: </strong>{bus.busNumber} | 
                                    <strong>Amenities: </strong>
                                    {bus.amenities && Array.isArray(bus.amenities) 
                                        ? bus.amenities.join(', ') 
                                        : 'No amenities listed'}
                                    <br />
                                    <div>
                                        {bus.images && bus.images.length > 0 ? (
                                            bus.images.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image}
                                                    alt={`Bus Image ${index + 1}`}
                                                    style={{ width: '150px', height: 'auto', marginRight: '10px' }}
                                                />
                                            ))
                                        ) : (
                                            <p>No images available</p>
                                        )}
                                    </div>
                                    <button onClick={() => handleEdit(bus)}>Edit</button>
                                    <button onClick={() => handleRemove(bus._id)}>Remove</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BusList;
*/


import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuses, deleteBus, updateBus } from "../actions/busActions";
import { useAuth } from "../context/AuthContext";

const BusList = () => {
  const { user } = useAuth(); // Get logged-in operator details
  const dispatch = useDispatch();
  const buses = useSelector((state) => state.buses.buses || []);
  const [editBusId, setEditBusId] = useState(null); // Track which bus is being edited
  const [busData, setBusData] = useState({
    busName: "",
    busNumber: "",
    busCapacity: "",
    amenities: "",
    operator: user?.account?._id || "",
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBuses());
  }, [dispatch]);

  const handleEdit = (bus) => {
    setEditBusId(bus._id); // Set the bus ID to edit
    setBusData({
      busName: bus.busName,
      busNumber: bus.busNumber,
      busCapacity: bus.busCapacity,
      amenities: bus.amenities.join(", "), // Convert amenities array to comma-separated string
      operator: user?.account?._id || "",
    });
    setDialogOpen(true);
  };

  const handleRemove = (busId) => {
    dispatch(deleteBus(busId));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amenities") {
      const amenitiesArray = value.split(",").map((amenity) => amenity.trim());
      setBusData({
        ...busData,
        [name]: amenitiesArray,
      });
    } else if (name === "busCapacity") {
      setBusData({
        ...busData,
        [name]: parseInt(value, 10), // Convert to integer
      });
    } else {
      setBusData({
        ...busData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBus(editBusId, busData)); // Dispatch action to update bus
    setDialogOpen(false);
    setEditBusId(null); // Reset editing state
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditBusId(null);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bus List
      </Typography>
      <Grid container spacing={3}>
        {buses.map((bus) => (
          <Grid item xs={12} md={6} lg={4} key={bus._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{bus.busName}</Typography>
                <Typography variant="body2">
                  <strong>Bus Number:</strong> {bus.busNumber}
                </Typography>
                <Typography variant="body2">
                  <strong>Capacity:</strong> {bus.busCapacity}
                </Typography>
                <Typography variant="body2">
                  <strong>Amenities:</strong>{" "}
                  {bus.amenities && Array.isArray(bus.amenities)
                    ? bus.amenities.join(", ")
                    : "No amenities listed"}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {bus.images && bus.images.length > 0 ? (
                    bus.images.map((image, index) => (
                        <img
                        key={index}
                        src={image}
                        alt={`Bus Image ${index + 1}`}
                        style={{
                          width: "100%", // Full width of the container
                          height: "150px", // Set a fixed height
                          objectFit: "cover", // Ensures the image covers the area
                          objectPosition: "center", // Centers the image to reduce awkward cropping
                          marginBottom: "8px",
                          borderRadius: "4px",
                        }}
                      />
                      
                    ))
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No images available
                    </Typography>
                  )}
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  startIcon={<Edit />}
                  onClick={() => handleEdit(bus)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleRemove(bus._id)}
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Editing */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth>
        <DialogTitle>Edit Bus</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Bus Name"
              name="busName"
              value={busData.busName}
              onChange={handleChange}
              margin="dense"
              required
            />
            <TextField
              fullWidth
              label="Bus Number"
              name="busNumber"
              value={busData.busNumber}
              onChange={handleChange}
              margin="dense"
              required
            />
            <TextField
              fullWidth
              label="Bus Capacity"
              name="busCapacity"
              type="number"
              value={busData.busCapacity}
              onChange={handleChange}
              margin="dense"
              required
            />
            <TextField
              fullWidth
              label="Amenities"
              name="amenities"
              value={busData.amenities}
              onChange={handleChange}
              margin="dense"
              helperText="Enter amenities separated by commas"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BusList;

