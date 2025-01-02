import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OperatorBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOperatorBookings = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please log in to view bookings.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:4000/bookings/operator', {
                    headers: {
                        Authorization: token,
                    },
                });
                setBookings(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch operator bookings.');
                setLoading(false);
            }
        };

        fetchOperatorBookings();
    }, []);

    if (loading) return <p>Loading operator bookings...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Bookings for Your Buses</h2>
            {bookings.length === 0 ? (
                <p>No bookings found for your buses.</p>
            ) : (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking._id}>
                            <p><strong>Bus Name:</strong> {booking.bus.busName}</p>
                            <p><strong>Trip Name:</strong> {booking.trip.tripName}</p>
                            <p><strong>Seats:</strong> {booking.seatsBooked.join(', ')}</p>
                            <p><strong>Total Amount:</strong> ₹{booking.totalAmount}</p>
                            <p><strong>Passenger:</strong> {booking.name} ({booking.email}, {booking.phone})</p>
                            <p><strong>Status:</strong> {booking.status}</p>
                            <p><strong>Journey Date:</strong> {new Date(booking.journeyDate).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OperatorBookings;
