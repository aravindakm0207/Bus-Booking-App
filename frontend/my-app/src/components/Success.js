/*
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SuccessPage = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const navigate = useNavigate();
    const [paymentStatus, setPaymentStatus] = useState('processing');

    useEffect(() => {
        const verifyPayment = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                alert('You are not logged in. Redirecting to login.');
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:4000/payments/success?sessionId=${sessionId}`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );

                if (response.data.payment.paymentStatus === 'successful') {
                    setPaymentStatus('success');
                    const paymentId = response.data.payment._id;
                    console.log('Payment ID to navigate with:', paymentId);
                    localStorage.setItem('paymentId', paymentId);
                    // Navigate to TicketDetails page with paymentId as part of URL path
                    
                   

                } else {
                    setPaymentStatus('failed');
                    alert('Payment verification failed. Redirecting to home.');
                    navigate('/');
                }
            } catch (error) {
                console.error('Error verifying payment:', error);
                setPaymentStatus('failed');
                alert('Error verifying payment. Redirecting to home.');
                navigate('/');
            }
        };

        if (sessionId) {
            verifyPayment();
        } else {
            alert('Invalid payment session. Redirecting to home.');
            navigate('/');
        }
    }, [sessionId, navigate]);

    return (
        <div className="success-container">
            {paymentStatus === 'success' ? (
                <>
                    <h1>Payment Successful 🎉</h1>
                    <p>Thank you for your payment! Your booking has been confirmed.</p>
                </>
            ) : paymentStatus === 'failed' ? (
                <>
                    <h1>Payment Failed</h1>
                    <p>Unfortunately, your payment could not be processed. Please try again.</p>
                </>
            ) : (
                <p>Processing payment...</p>
            )}
        </div>
    );
};

export default SuccessPage;
*/

import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, CircularProgress, Button, Container } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const SuccessPage = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const navigate = useNavigate();
    const [paymentStatus, setPaymentStatus] = useState('processing');

    useEffect(() => {
        const verifyPayment = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                alert('You are not logged in. Redirecting to login.');
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:4000/payments/success?sessionId=${sessionId}`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );

                if (response.data.payment.paymentStatus === 'successful') {
                    setPaymentStatus('success');
                    const paymentId = response.data.payment._id;
                    localStorage.setItem('paymentId', paymentId);
                } else {
                    setPaymentStatus('failed');
                    alert('Payment verification failed. Redirecting to home.');
                    navigate('/');
                }
            } catch (error) {
                console.error('Error verifying payment:', error);
                setPaymentStatus('failed');
                alert('Error verifying payment. Redirecting to home.');
                navigate('/');
            }
        };

        if (sessionId) {
            verifyPayment();
        } else {
            alert('Invalid payment session. Redirecting to home.');
            navigate('/');
        }
    }, [sessionId, navigate]);

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
            {paymentStatus === 'processing' && (
                <Box>
                    <CircularProgress size={50} sx={{ color: 'primary.main' }} />
                    <Typography variant="h5" sx={{ mt: 3 }}>
                        Processing payment...
                    </Typography>
                </Box>
            )}

            {paymentStatus === 'success' && (
                <Box>
                    <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'success.main' }} />
                    <Typography variant="h4" sx={{ mt: 3, fontWeight: 'bold' }}>
                        Payment Successful 🎉
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Thank you for your payment! Your booking has been confirmed.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 4 }}
                        onClick={() => navigate('/tickets')}
                    >
                        View Ticket Details
                    </Button>
                </Box>
            )}

            {paymentStatus === 'failed' && (
                <Box>
                    <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main' }} />
                    <Typography variant="h4" sx={{ mt: 3, fontWeight: 'bold' }}>
                        Payment Failed
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Unfortunately, your payment could not be processed. Please try again.
                    </Typography>
                    <Button variant="contained" color="secondary" sx={{ mt: 4 }} onClick={handleGoHome}>
                        Go to Home
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default SuccessPage;
