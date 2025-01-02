/*
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips, updateTrip, deleteTrip } from '../actions/tripActions';

const TripList = () => {
    const dispatch = useDispatch();
    const [editingTripId, setEditingTripId] = useState(null);
    const [tripEditData, setTripEditData] = useState({
        busId: '',
        tripDate: '',
        departureTime: '',
        arrivalTime: '',
        from: '',
        to: '',
        duration: '',
        distance: '',
    });

    const { trips, loading, error } = useSelector((state) => ({
        trips: state.trips.trips || [],
        loading: state.trips.loading,
        error: state.trips.error,
    }));

    useEffect(() => {
        dispatch(fetchTrips());
    }, [dispatch]);

    const formatDateForInput = (dateString) => {
        if (!dateString) return ''; // Handle empty date
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Extract 'YYYY-MM-DD' from ISO string
    };

    const handleEdit = (trip) => {
        setEditingTripId(trip._id);
        setTripEditData({
            busId: trip.bus?._id || '',
            tripDate: formatDateForInput(trip.date),
            departureTime: trip.departure || '',
            arrivalTime: trip.arrival || '',
            from: trip.routeID?.from || '',
            to: trip.routeID?.to || '',
            duration: trip.routeID?.duration || '',
            distance: trip.routeID?.distance || '',
        });
    };

    const handleSaveEdit = (tripId) => {
        dispatch(updateTrip(tripId, tripEditData));
        setEditingTripId(null); // Exit edit mode
    };

    const handleRemove = (tripId) => {
        dispatch(deleteTrip(tripId));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTripEditData({
            ...tripEditData,
            [name]: value,
        });
    };

    if (loading) return <p>Loading trips...</p>;
    if (error && (!trips || trips.length === 0)) return <p>No trips are available.</p>;
    if (!trips || trips.length === 0) return <p>No trips are available.</p>;

    return (
        <div>
            <ul>
                {trips.map((trip) => (
                    <li key={trip._id}>
                        {editingTripId === trip._id ? (
                            <div>
                                <label htmlFor="from">From:</label>
                                <input
                                    type="text"
                                    id="from"
                                    name="from"
                                    value={tripEditData.from}
                                    onChange={handleChange}
                                />
                                <br />

                                <label htmlFor="to">To:</label>
                                <input
                                    type="text"
                                    id="to"
                                    name="to"
                                    value={tripEditData.to}
                                    onChange={handleChange}
                                />
                                <br />

                                <label htmlFor="tripDate">Trip Date:</label>
                                <input
                                    type="date"
                                    id="tripDate"
                                    name="tripDate"
                                    value={tripEditData.tripDate}
                                    onChange={handleChange}
                                />
                                <br />

                                <label htmlFor="departureTime">Departure Time:</label>
                                <input
                                    type="time"
                                    id="departureTime"
                                    name="departureTime"
                                    value={tripEditData.departureTime}
                                    onChange={handleChange}
                                />
                                <br />

                                <label htmlFor="arrivalTime">Arrival Time:</label>
                                <input
                                    type="time"
                                    id="arrivalTime"
                                    name="arrivalTime"
                                    value={tripEditData.arrivalTime}
                                    onChange={handleChange}
                                />
                                <br />
                                <button onClick={() => handleSaveEdit(trip._id)}>Save</button>
                                <button onClick={() => setEditingTripId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <p>
                                    Route: {trip.routeID?.from || 'N/A'} - {trip.routeID?.to || 'N/A'} <br />
                                    Date: {trip.date ? new Date(trip.date).toLocaleDateString() : 'Invalid Date'} <br />
                                    Departure: {trip.departure || 'N/A'} - Arrival: {trip.arrival || 'N/A'} <br />
                                    Bus: {trip.bus?.busNumber || 'N/A'} ({trip.bus?.busName || 'N/A'}) <br />
                                    Price: Rs{trip.price || 'N/A'} 
                                </p>
                                <button onClick={() => handleEdit(trip)}>Edit</button>
                                <button onClick={() => handleRemove(trip._id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TripList;
*/

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrips, updateTrip, deleteTrip } from "../actions/tripActions";

const TripList = () => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTripId, setEditingTripId] = useState(null);
  const [tripEditData, setTripEditData] = useState({
    busId: "",
    tripDate: "",
    departureTime: "",
    arrivalTime: "",
    from: "",
    to: "",
    duration: "",
    distance: "",
  });

  const { trips, loading, error } = useSelector((state) => ({
    trips: state.trips.trips || [],
    loading: state.trips.loading,
    error: state.trips.error,
  }));

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

  const formatDateForInput = (dateString) => {
    if (!dateString) return ""; // Handle empty date
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Extract 'YYYY-MM-DD' from ISO string
  };

  const handleEdit = (trip) => {
    setEditingTripId(trip._id);
    setTripEditData({
      busId: trip.bus?._id || "",
      tripDate: formatDateForInput(trip.date),
      departureTime: trip.departure || "",
      arrivalTime: trip.arrival || "",
      from: trip.routeID?.from || "",
      to: trip.routeID?.to || "",
      duration: trip.routeID?.duration || "",
      distance: trip.routeID?.distance || "",
    });
    setOpenDialog(true); // Open the popup dialog
  };

  const handleSaveEdit = () => {
    dispatch(updateTrip(editingTripId, tripEditData));
    setOpenDialog(false); // Close the dialog after saving
    setEditingTripId(null);
  };

  const handleRemove = (tripId) => {
    dispatch(deleteTrip(tripId));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripEditData({
      ...tripEditData,
      [name]: value,
    });
  };

  if (loading) return <Typography>Loading trips...</Typography>;
  if (error && (!trips || trips.length === 0))
    return <Typography>No trips are available.</Typography>;
  if (!trips || trips.length === 0)
    return <Typography>No trips are available.</Typography>;

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Trip List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Departure</TableCell>
              <TableCell>Arrival</TableCell>
              <TableCell>Bus</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trips.map((trip) => (
              <TableRow key={trip._id}>
                <TableCell>{trip.routeID?.from || "N/A"}</TableCell>
                <TableCell>{trip.routeID?.to || "N/A"}</TableCell>
                <TableCell>
                  {trip.date
                    ? new Date(trip.date).toLocaleDateString()
                    : "Invalid Date"}
                </TableCell>
                <TableCell>{trip.departure || "N/A"}</TableCell>
                <TableCell>{trip.arrival || "N/A"}</TableCell>
                <TableCell>
                  {trip.bus?.busNumber || "N/A"} ({trip.bus?.busName || "N/A"})
                </TableCell>
                <TableCell>{trip.price || "N/A"}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(trip)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemove(trip._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Editing Trip */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Trip</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="From"
            name="from"
            value={tripEditData.from}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="To"
            name="to"
            value={tripEditData.to}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Trip Date"
            name="tripDate"
            type="date"
            value={tripEditData.tripDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Departure Time"
            name="departureTime"
            type="time"
            value={tripEditData.departureTime}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Arrival Time"
            name="arrivalTime"
            type="time"
            value={tripEditData.arrivalTime}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Duration"
            name="duration"
            value={tripEditData.duration}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Distance (km)"
            name="distance"
            type="number"
            value={tripEditData.distance}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TripList;
