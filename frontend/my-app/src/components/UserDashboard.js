/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { searchTrips } from '../actions/tripActions';

export default function BusDashboard() {
    const [form, setForm] = useState({
        from: '',
        to: '',
        date: '',
    });

    const [errors, setErrors] = useState({}); // State to track form validation errors
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        if (!form.from.trim()) {
            newErrors.from = 'From location is required';
        }
        if (!form.to.trim()) {
            newErrors.to = 'To location is required';
        }
        if (!form.date) {
            newErrors.date = 'Travel date is required';
        } else {
            const today = new Date();
            const selectedDate = new Date(form.date);
            if (selectedDate < today) {
                newErrors.date = 'Travel date cannot be in the past';
            }
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors); // Set errors if validation fails
        } else {
            setErrors({}); // Clear errors if validation succeeds
            dispatch(searchTrips(form)); // Dispatch the search action with form data
            navigate('/buses'); // Navigate to the buses page
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // Clear specific error on input change
        setErrors({ ...errors, [name]: '' });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="from">From </label>
                    <input
                        type="text"
                        id="from"
                        name="from"
                        value={form.from}
                        onChange={handleChange}
                    />
                    {errors.from && <p style={{ color: 'red' }}>{errors.from}</p>}
                </div>
                <br />
                <div>
                    <label htmlFor="to">To </label>
                    <input
                        type="text"
                        id="to"
                        name="to"
                        value={form.to}
                        onChange={handleChange}
                    />
                    {errors.to && <p style={{ color: 'red' }}>{errors.to}</p>}
                </div>
                <br />
                <div>
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                    />
                    {errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}
                </div>
                <br />
                <input type="submit" value="Search Buses" />
            </form>
        </div>
    );
}

*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchTrips } from '../actions/tripActions';

import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  InputAdornment,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export default function BusDashboard() {
  const [form, setForm] = useState({
    from: '',
    to: '',
    date: '',
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!form.from.trim()) newErrors.from = 'Enter departure location';
    if (!form.to.trim()) newErrors.to = 'Enter destination location';
    if (!form.date) newErrors.date = 'Select a travel date';
    else if (new Date(form.date) < new Date())
      newErrors.date = 'Travel date cannot be in the past';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      dispatch(searchTrips(form));
      navigate('/buses');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ boxShadow: 4, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Book Your Bus Tickets
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} alignItems="center">
              
              <Grid item xs={12} sm={4}>
                <TextField
                  label="From"
                  name="from"
                  value={form.from}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.from}
                  helperText={errors.from}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="To"
                  name="to"
                  value={form.to}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.to}
                  helperText={errors.to}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon color="secondary" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>

            
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Date"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.date}
                  helperText={errors.date}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>

           
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ px: 6 }}
              >
                Search Buses
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}


