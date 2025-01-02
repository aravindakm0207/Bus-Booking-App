import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [sessionUrl, setSessionUrl] = useState('');
    const bookingData = location.state; // Booking data passed from SeatSelection

    useEffect(() => {
        console.log('Booking Data received:', bookingData); // Debugging booking data

        const createPaymentSession = async () => {
            if (!bookingData || !bookingData._id || !bookingData.totalAmount || !bookingData.seatsBooked) {
                console.error('Invalid booking data:', bookingData);
                alert('Invalid booking details. Redirecting to home.');
                navigate('/');
                return;
            }

            const token = localStorage.getItem('token');
            if (!token) {
                alert('You are not logged in. Redirecting to login.');
                navigate('/login');
                return;
            }

            try {
                const response = await axios.post(
                    'http://localhost:4000/payments/online',
                    {
                        bookingId: bookingData._id,
                        amount: bookingData.totalAmount, // Use the backend logic for totalAmount
                    },
                    {
                        headers: {
                            Authorization:token,
                        },
                    }
                );

                console.log('Payment session created successfully:', response.data);
                setSessionUrl(response.data.url);

                // Open the payment URL in a new tab
                //window.open(response.data.url, '_blank');
                window.location.href = response.data.url;

            } catch (error) {
                console.error('Error creating payment session:', error);
                alert('Failed to create payment session. Please try again.');
            }
        };

        if (bookingData) {
            createPaymentSession();
        } else {
            alert('No booking data found. Redirecting to home.');
            navigate('/');
        }
    }, [bookingData, navigate]);

    return (
        <div>
            <h2>Payment</h2>
            {sessionUrl ? (
                <div>
                    <p>Click the button below to complete your payment:</p>
                    <a href={sessionUrl} target="_blank" rel="noopener noreferrer">
                        Pay Now
                    </a>
                </div>
            ) : (
                <p>Loading payment session...</p>
            )}
        </div>
    );
};

export default Payment;
