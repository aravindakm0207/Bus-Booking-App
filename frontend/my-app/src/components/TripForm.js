
/*
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTrip, fetchTrips } from '../actions/tripActions';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TripForm = ({ onTripAdded }) => {
    const [busOptions, setBusOptions] = useState([]);
    const [tripData, setTripData] = useState({
        busId: '',
        tripDate: '',
        price: '',
        departureTime: '',
        arrivalTime: '',
        from: '',
        to: '',
        duration: '',
        distance: '',
        repeatTrip: false,
        repeatInterval: 2
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: token } };
                const busResponse = await axios.get('http://localhost:4000/api/buses', config);
                setBusOptions(busResponse.data);
            } catch (error) {
                console.error('Error fetching buses:', error);
            }
        };
        fetchBuses();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTripData({
            ...tripData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(addTrip(tripData));
            const fullTrip = {
                ...result.data,
                routeID: { from: tripData.from, to: tripData.to },
                bus: {
                    busNumber: busOptions.find(bus => bus._id === tripData.busId)?.busNumber || 'N/A',
                    busName: busOptions.find(bus => bus._id === tripData.busId)?.busName || 'N/A'
                },
                date: tripData.tripDate
            };
            if (onTripAdded) onTripAdded(fullTrip);
            setTripData({
                busId: '',
                tripDate: '',
                price: '',
                departureTime: '',
                arrivalTime: '',
                from: '',
                to: '',
                duration: '',
                distance: '',
                repeatTrip: false,
                repeatInterval: 2
            });
            dispatch(fetchTrips());
            navigate('/trip-list');
        } catch (error) {
            console.error('Error adding trip:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Trip</h2>

            <label htmlFor="busId">Bus</label>
            <br />
            <select name="busId" id="busId" value={tripData.busId} onChange={handleChange} required>
                <option value="">Select Bus</option>
                {busOptions.map(bus => (
                    <option key={bus._id} value={bus._id}>{bus.busName} ({bus.busNumber})</option>
                ))}
            </select>
            <br />

            <label htmlFor="tripDate">Trip Date</label>
            <br />
            <input type="date" name="tripDate" id="tripDate" value={tripData.tripDate} onChange={handleChange} required />
            <br />

            <label htmlFor="price">Price</label>
            <br />
            <input type="number" name="price" id="price" value={tripData.price} onChange={handleChange} required />
            <br />

            <label htmlFor="from">From</label>
            <br />
            <input type="text" name="from" id="from" value={tripData.from} onChange={handleChange} required />
            <br />

            <label htmlFor="to">To</label>
            <br />
            <input type="text" name="to" id="to" value={tripData.to} onChange={handleChange} required />
            <br />

          
            <label htmlFor="departureTime">Departure Time</label>
            <br />
            <input type="time" name="departureTime" id="departureTime" value={tripData.departureTime} onChange={handleChange} required />
            <br />

            <label htmlFor="arrivalTime">Arrival Time</label>
            <br />
            <input type="time" name="arrivalTime" id="arrivalTime" value={tripData.arrivalTime} onChange={handleChange} required />
            <br />

            
            <label htmlFor="duration">Duration</label>
            <br />
            <input type="text" name="duration" id="duration" value={tripData.duration} onChange={handleChange} required />
            <br />

            <label htmlFor="distance">Distance (km)</label>
            <br />
            <input type="number" name="distance" id="distance" value={tripData.distance} onChange={handleChange} required />
            <br />

           
            <label htmlFor="repeatTrip">Repeat on alternate days</label>
            <br />
            <input type="checkbox" name="repeatTrip" id="repeatTrip" checked={tripData.repeatTrip} onChange={handleChange} />
            <br />

            {tripData.repeatTrip && (
                <>
                    <label htmlFor="repeatInterval">Repeat Interval (days)</label>
                    <br />
                    <input type="number" name="repeatInterval" id="repeatInterval" value={tripData.repeatInterval} onChange={handleChange} />
                    <br />
                </>
            )}

            <button type="submit">Add Trip</button>
        </form>
    );
};

export default TripForm;
*/

import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addTrip, fetchTrips } from "../actions/tripActions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TripForm = ({ onTripAdded }) => {
  const [busOptions, setBusOptions] = useState([]);
  const [tripData, setTripData] = useState({
    busId: "",
    tripDate: "",
    price: "",
    departureTime: "",
    arrivalTime: "",
    from: "",
    to: "",
    duration: "",
    distance: "",
    repeatTrip: false,
    repeatInterval: 2,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: token } };
        const busResponse = await axios.get("http://localhost:4000/api/buses", config);
        setBusOptions(busResponse.data);
      } catch (error) {
        console.error("Error fetching buses:", error);
      }
    };
    fetchBuses();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTripData({
      ...tripData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(addTrip(tripData));
      const fullTrip = {
        ...result.data,
        routeID: { from: tripData.from, to: tripData.to },
        bus: {
          busNumber: busOptions.find((bus) => bus._id === tripData.busId)?.busNumber || "N/A",
          busName: busOptions.find((bus) => bus._id === tripData.busId)?.busName || "N/A",
        },
        date: tripData.tripDate,
      };
      if (onTripAdded) onTripAdded(fullTrip);
      setTripData({
        busId: "",
        tripDate: "",
        price: "",
        departureTime: "",
        arrivalTime: "",
        from: "",
        to: "",
        duration: "",
        distance: "",
        repeatTrip: false,
        repeatInterval: 2,
      });
      dispatch(fetchTrips());
      navigate("/trip-list");
    } catch (error) {
      console.error("Error adding trip:", error);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Add New Trip
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          fullWidth
          label="Bus"
          name="busId"
          value={tripData.busId}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="">Select Bus</MenuItem>
          {busOptions.map((bus) => (
            <MenuItem key={bus._id} value={bus._id}>
              {bus.busName} ({bus.busNumber})
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Trip Date"
          name="tripDate"
          type="date"
          value={tripData.tripDate}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />

        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={tripData.price}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="From"
          name="from"
          value={tripData.from}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="To"
          name="to"
          value={tripData.to}
          onChange={handleChange}
          margin="normal"
          required
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Departure Time"
              name="departureTime"
              type="time"
              value={tripData.departureTime}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Arrival Time"
              name="arrivalTime"
              type="time"
              value={tripData.arrivalTime}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              margin="normal"
              required
            />
          </Grid>
        </Grid>

        <TextField
          fullWidth
          label="Duration"
          name="duration"
          value={tripData.duration}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Distance (km)"
          name="distance"
          type="number"
          value={tripData.distance}
          onChange={handleChange}
          margin="normal"
          required
        />

        <FormControlLabel
          control={
            <Checkbox
              name="repeatTrip"
              checked={tripData.repeatTrip}
              onChange={handleChange}
            />
          }
          label="Repeat on alternate days"
        />

        {tripData.repeatTrip && (
          <TextField
            fullWidth
            label="Repeat Interval (days)"
            name="repeatInterval"
            type="number"
            value={tripData.repeatInterval}
            onChange={handleChange}
            margin="normal"
          />
        )}

        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ px: 4 }}
          >
            Add Trip
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default TripForm;

