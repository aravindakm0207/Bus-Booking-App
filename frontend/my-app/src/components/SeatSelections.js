//import React, { useState,useEffect } from 'react';
//import { useDispatch, useSelector } from 'react-redux';
//import { fetchSeatLayout, bookSeats } from '../actions/seatActions';
//import {  bookSeats } from '../action/seatActions';
//import  { fetchSeatLayout} from '../actions/tripActions'
/*
const SeatSelection = ({ busId, journeyDate }) => {
    const dispatch = useDispatch();
    const { seatLayout, loading, error } = useSelector(state => state.seatLayout);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [userDetails, setUserDetails] = useState({ name: '', email: '', phone: '' });

    useEffect(() => {
        dispatch(fetchSeatLayout(busId));
    }, [dispatch, busId]);

    const handleSeatClick = (seatNumber) => {
        setSelectedSeats(prev => 
            prev.includes(seatNumber) 
            ? prev.filter(s => s !== seatNumber) 
            : [...prev, seatNumber]
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleBooking = () => {
        dispatch(bookSeats(busId, selectedSeats, journeyDate, userDetails));
    };

    if (loading) return <div>Loading seat layout...</div>;
    if (error) return <div>Error loading seat layout: {error}</div>;

    return (
        <div>
            <div className="seat-layout">
                {seatLayout.map((row, rowIndex) => (
                    <div key={rowIndex} className="seat-row">
                        {row.map(seat => (
                            <div
                                key={seat.seatNumber}
                                className={`seat ${seat.isBooked ? 'booked' : ''} ${selectedSeats.includes(seat.seatNumber) ? 'selected' : ''}`}
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



import './SeatSelection.css';


const SeatSelection = ({ tripId, journeyDate }) => { // Changed busId to tripId
    const dispatch = useDispatch();
    const { seatLayout, loading, error } = useSelector(state => state.seatLayout);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [userDetails, setUserDetails] = useState({ name: '', email: '', phone: '' });

    useEffect(() => {
        if (tripId) { // Ensure tripId is valid
            dispatch(fetchSeatLayout(tripId));
        }
    }, [dispatch, tripId]);

    const handleSeatClick = (seatNumber) => {
        setSelectedSeats(prev =>
            prev.includes(seatNumber)
                ? prev.filter(s => s !== seatNumber)
                : [...prev, seatNumber]
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleBooking = () => {
        dispatch(bookSeats(tripId, selectedSeats, journeyDate, userDetails)); // Use tripId for booking as well
    };

    if (loading) return <div>Loading seat layout...</div>;
    if (error) return <div>Error loading seat layout: {error}</div>;

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

import  { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeatLayout, bookSeats } from '../actions/seatActions';
import './SeatSelection.css';

const SeatSelection = ({ tripId, journeyDate }) => {
    const dispatch = useDispatch();
    const { seatLayout, loading, error } = useSelector(state => state.seatLayout);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [userDetails, setUserDetails] = useState({ name: '', email: '', phone: '' });

    useEffect(() => {
        if (tripId) { // Ensure tripId is valid
            dispatch(fetchSeatLayout(tripId));
        }
    }, [dispatch, tripId]);

    const handleSeatClick = (seatNumber) => {
        setSelectedSeats(prev =>
            prev.includes(seatNumber)
                ? prev.filter(s => s !== seatNumber)
                : [...prev, seatNumber]
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleBooking = () => {
        dispatch(bookSeats(tripId, selectedSeats, journeyDate, userDetails));
    };

    if (loading) return <div>Loading seat layout...</div>;
    if (error) return <div>Error loading seat layout: {error}</div>;

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
