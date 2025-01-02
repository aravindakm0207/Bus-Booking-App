
/*


import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeatLayout } from '../actions/seatActions';
import './SeatSelection.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SeatSelection = ({ tripId, journeyDate }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate
    const { seatLayout, loading, error } = useSelector(state => state.seatLayout);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [userDetails, setUserDetails] = useState({ name: '', email: '', phone: '' });

    // Fetch seat layout when tripId changes
    useEffect(() => {
        console.log("Fetching seat layout for tripId:", tripId); // Debug
        if (tripId) {
            dispatch(fetchSeatLayout(tripId));
        }
    }, [dispatch, tripId]);

    // Handle seat selection
    const handleSeatClick = (seatNumber) => {
        console.log("Seat clicked:", seatNumber); // Debug
        setSelectedSeats(prev => {
            const updatedSeats = prev.includes(seatNumber)
                ? prev.filter(s => s !== seatNumber)
                : [...prev, seatNumber];
            console.log("Updated selectedSeats:", updatedSeats); // Debug
            return updatedSeats;
        });
    };

    // Handle user input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`Input changed - ${name}:`, value); // Debug
        setUserDetails({ ...userDetails, [name]: value });
    };

    // Handle booking submission
    const handleBooking = async () => {
        console.log('Booking initiated. Selected seats:', selectedSeats); // Debug
        console.log('User details:', userDetails); // Debug

        const token = localStorage.getItem('token');
        console.log('Retrieved token:', token); // Debug

        if (!token) {
            console.error('Token is missing. User is not authenticated.'); // Debug
            alert('You need to be logged in to book a ticket.');
            return;
        }

        try {
            const bookingPayload = {
                tripId,
                seatsBooked: selectedSeats,
                journeyDate,
                name: userDetails.name,
                email: userDetails.email,
                phone: userDetails.phone,
            };
            console.log('Booking request payload:', bookingPayload); // Debug

            const response = await axios.post(
                'http://localhost:4000/api/buses/booking',
                bookingPayload,
                {
                    headers: {
                        Authorization: token,
                    },
                }
                
            );
            console.log('Booking API response:', response.data); // Debug
            console.log('Navigating to Payment with state:', response.data); // Debug

            // Navigate to payment, including routeID in the state
            navigate('/payment', { state: { ...response.data, routeID: response.data.routeID } });

            
            
        } catch (error) {
            console.error('Error booking ticket:', error); // Debug
            console.error('Error response from booking API:', error.response ? error.response.data : error.message);
        }
    };

    // Loading state
    if (loading) {
        console.log("Loading seat layout..."); // Debug
        return <div>Loading seat layout...</div>;
    }

    // Error state
    if (error) {
        console.error("Error loading seat layout:", error); // Debug
        return <div>Error loading seat layout: {error}</div>;
    }

    console.log("Seat layout loaded:", seatLayout); // Debug

    return (
        <div>
            <div className="seat-layout">
                {seatLayout.map((row, rowIndex) => (
                    <div key={rowIndex} className="seat-row">
                        {row.map(seat => (
                            <div
                                key={seat.seatNumber}
                                className={`seat 
                                    ${seat.isBooked ? 'booked-seat' : 'available-seat'} 
                                    ${selectedSeats.includes(seat.seatNumber) ? 'selected-seat' : ''}`}
                                onClick={() => !seat.isBooked && handleSeatClick(seat.seatNumber)}
                            >
                                {seat.seatNumber}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {selectedSeats.length > 0 && (
                <div className="booking-form">
                    <h3>Enter your details to book:</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={userDetails.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={userDetails.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={userDetails.phone}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleBooking}>Book Ticket</button>
                </div>
            )}
        </div>
    );
};

export default SeatSelection;

*/
/*
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeatLayout } from '../actions/seatActions';
import './SeatSelection.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { TextField, Button } from '@mui/material'; // Import Material-UI components

const SeatSelection = ({ tripId, journeyDate }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate
    const { seatLayout, loading, error } = useSelector(state => state.seatLayout);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [userDetails, setUserDetails] = useState({ name: '', email: '', phone: '' });

    // Fetch seat layout when tripId changes
    useEffect(() => {
        console.log("Fetching seat layout for tripId:", tripId); // Debug
        if (tripId) {
            dispatch(fetchSeatLayout(tripId));
        }
    }, [dispatch, tripId]);

    // Handle seat selection
    const handleSeatClick = (seatNumber) => {
        console.log("Seat clicked:", seatNumber); // Debug
        setSelectedSeats(prev => {
            const updatedSeats = prev.includes(seatNumber)
                ? prev.filter(s => s !== seatNumber)
                : [...prev, seatNumber];
            console.log("Updated selectedSeats:", updatedSeats); // Debug
            return updatedSeats;
        });
    };

    // Handle user input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`Input changed - ${name}:`, value); // Debug
        setUserDetails({ ...userDetails, [name]: value });
    };

    // Handle booking submission
    const handleBooking = async () => {
        console.log('Booking initiated. Selected seats:', selectedSeats); // Debug
        console.log('User details:', userDetails); // Debug

        const token = localStorage.getItem('token');
        console.log('Retrieved token:', token); // Debug

        if (!token) {
            console.error('Token is missing. User is not authenticated.'); // Debug
            alert('You need to be logged in to book a ticket.');
            return;
        }

        try {
            const bookingPayload = {
                tripId,
                seatsBooked: selectedSeats,
                journeyDate,
                name: userDetails.name,
                email: userDetails.email,
                phone: userDetails.phone,
            };
            console.log('Booking request payload:', bookingPayload); // Debug

            const response = await axios.post(
                'http://localhost:4000/api/buses/booking',
                bookingPayload,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            console.log('Booking API response:', response.data); // Debug
            console.log('Navigating to Payment with state:', response.data); // Debug

            // Navigate to payment, including routeID in the state
            navigate('/payment', { state: { ...response.data, routeID: response.data.routeID } });

        } catch (error) {
            console.error('Error booking ticket:', error); // Debug
            console.error('Error response from booking API:', error.response ? error.response.data : error.message);
        }
    };

    // Loading state
    if (loading) {
        console.log("Loading seat layout..."); // Debug
        return <div>Loading seat layout...</div>;
    }

    // Error state
    if (error) {
        console.error("Error loading seat layout:", error); // Debug
        return <div>Error loading seat layout: {error}</div>;
    }

    console.log("Seat layout loaded:", seatLayout); // Debug

    return (
        <div>
            <div className="seat-layout">
                {seatLayout.map((row, rowIndex) => (
                    <div key={rowIndex} className="seat-row">
                        {row.map(seat => (
                            <div
                                key={seat.seatNumber}
                                className={`seat 
                                    ${seat.isBooked ? 'booked-seat' : 'available-seat'} 
                                    ${selectedSeats.includes(seat.seatNumber) ? 'selected-seat' : ''}`}
                                onClick={() => !seat.isBooked && handleSeatClick(seat.seatNumber)}
                            >
                                {seat.seatNumber}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {selectedSeats.length > 0 && (
                <div className="booking-form">
                    <h3>Enter your details to book:</h3>
                    <TextField
                        label="Name"
                        name="name"
                        variant="outlined"
                        fullWidth
                        value={userDetails.name}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        variant="outlined"
                        fullWidth
                        type="email"
                        value={userDetails.email}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        label="Phone Number"
                        name="phone"
                        variant="outlined"
                        fullWidth
                        type="tel"
                        value={userDetails.phone}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleBooking}
                        sx={{ marginTop: '16px' }}
                    >
                        Book Ticket
                    </Button>
                </div>
            )} 
        </div>
    );
};

export default SeatSelection;
*/
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeatLayout } from '../actions/seatActions';
import './SeatSelection.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { TextField, Button } from '@mui/material'; // Import Material-UI components

const SeatSelection = ({ tripId, journeyDate }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate
    const { seatLayout, loading, error } = useSelector(state => state.seatLayout);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [userDetails, setUserDetails] = useState({ name: '', email: '', phone: '' });
    const [formErrors, setFormErrors] = useState({ name: '', email: '', phone: '' });

    // Fetch seat layout when tripId changes
    useEffect(() => {
        console.log("Fetching seat layout for tripId:", tripId); // Debug
        if (tripId) {
            dispatch(fetchSeatLayout(tripId));
        }
    }, [dispatch, tripId]);

    // Handle seat selection
    const handleSeatClick = (seatNumber) => {
        console.log("Seat clicked:", seatNumber); // Debug
        setSelectedSeats(prev => {
            const updatedSeats = prev.includes(seatNumber)
                ? prev.filter(s => s !== seatNumber)
                : [...prev, seatNumber];
            console.log("Updated selectedSeats:", updatedSeats); // Debug
            return updatedSeats;
        });
    };

    // Handle user input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`Input changed - ${name}:`, value); // Debug
        setUserDetails({ ...userDetails, [name]: value });

        // Validate fields dynamically
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validateField(name, value),
        }));
    };

    // Validate individual fields
    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                return value.trim() === '' ? 'Name is required' : '';
            case 'email':
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                return !emailRegex.test(value) ? 'Enter a valid email address' : '';
            case 'phone':
                const phoneRegex = /^[0-9]{10}$/;
                return !phoneRegex.test(value) ? 'Phone number should be 10 digits' : '';
            default:
                return '';
        }
    };

    // Check if the form is valid
    const isFormValid = () => {
        return Object.values(formErrors).every(error => error === '') &&
               userDetails.name && userDetails.email && userDetails.phone && selectedSeats.length > 0;
    };

    // Handle booking submission
    const handleBooking = async () => {
        console.log('Booking initiated. Selected seats:', selectedSeats); // Debug
        console.log('User details:', userDetails); // Debug

        const token = localStorage.getItem('token');
        console.log('Retrieved token:', token); // Debug

        if (!token) {
            console.error('Token is missing. User is not authenticated.'); // Debug
            alert('You need to be logged in to book a ticket.');
            return;
        }

        try {
            const bookingPayload = {
                tripId,
                seatsBooked: selectedSeats,
                journeyDate,
                name: userDetails.name,
                email: userDetails.email,
                phone: userDetails.phone,
            };
            console.log('Booking request payload:', bookingPayload); // Debug

            const response = await axios.post(
                'http://localhost:4000/api/buses/booking',
                bookingPayload,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            console.log('Booking API response:', response.data); // Debug
            console.log('Navigating to Payment with state:', response.data); // Debug

            // Navigate to payment, including routeID in the state
            navigate('/payment', { state: { ...response.data, routeID: response.data.routeID } });

        } catch (error) {
            console.error('Error booking ticket:', error); // Debug
            console.error('Error response from booking API:', error.response ? error.response.data : error.message);
        }
    };

    // Loading state
    if (loading) {
        console.log("Loading seat layout..."); // Debug
        return <div>Loading seat layout...</div>;
    }

    // Error state
    if (error) {
        console.error("Error loading seat layout:", error); // Debug
        return <div>Error loading seat layout: {error}</div>;
    }

    console.log("Seat layout loaded:", seatLayout); // Debug

    return (
        <div>
            <div className="seat-layout">
                {seatLayout.map((row, rowIndex) => (
                    <div key={rowIndex} className="seat-row">
                        {row.map(seat => (
                            <div
                                key={seat.seatNumber}
                                className={`seat 
                                    ${seat.isBooked ? 'booked-seat' : 'available-seat'} 
                                    ${selectedSeats.includes(seat.seatNumber) ? 'selected-seat' : ''}`}
                                onClick={() => !seat.isBooked && handleSeatClick(seat.seatNumber)}
                            >
                                {seat.seatNumber}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {selectedSeats.length > 0 && (
                <div className="booking-form">
                    <h3>Enter your details to book:</h3>
                    <TextField
                        label="Name"
                        name="name"
                        variant="outlined"
                        fullWidth
                        value={userDetails.name}
                        onChange={handleInputChange}
                        margin="normal"
                        error={!!formErrors.name}
                        helperText={formErrors.name}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        variant="outlined"
                        fullWidth
                        type="email"
                        value={userDetails.email}
                        onChange={handleInputChange}
                        margin="normal"
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                    />
                    <TextField
                        label="Phone Number"
                        name="phone"
                        variant="outlined"
                        fullWidth
                        type="tel"
                        value={userDetails.phone}
                        onChange={handleInputChange}
                        margin="normal"
                        error={!!formErrors.phone}
                        helperText={formErrors.phone}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleBooking}
                        sx={{ marginTop: '16px' }}
                        disabled={!isFormValid()}
                    >
                        Book Ticket
                    </Button>
                </div>
            )}
        </div>
    );
};

export default SeatSelection;
