/*

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TicketDetails = () => {
    const [ticket, setTicket] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTicket = async () => {
            setLoading(true);
            setError('');
            try {
                // Make GET request to /api/ticket endpoint
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
                const response = await axios.get('http://localhost:4000/api/ticket', {
                    headers: {
                        Authorization: token
                    },
                });

                // Set the ticket data
                setTicket(response.data.ticket);
            } catch (err) {
                console.error("Error fetching ticket:", err);
                setError(err.response?.data?.error || 'An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchTicket(); // Automatically fetch the ticket on component load
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}><strong>Error:</strong> {error}</div>;

    return (
        <div>
            
            {ticket ? (
                <div>
                    <h2>Ticket Details</h2>
                    
                    <p><strong>Ticket Number:</strong> {ticket.ticketNumber}</p>
                    <p><strong>Bus Name:</strong> {ticket.bus?.busName}</p>
                    <p><strong>Bus Number:</strong> {ticket.bus?.busNumber}</p>
                    <p><strong>Seat Number:</strong> {ticket.seats.join(', ')}</p>
                    <p><strong>From:</strong> {ticket.route?.from}</p>
                    <p><strong>To:</strong> {ticket.route?.to}</p>
                    <p><strong>Journey Date:</strong> {new Date(ticket.journeyDate).toLocaleDateString()}</p>
                    <p><strong>Total Amount:</strong> ₹{ticket.totalAmount}</p>
                    
                    
                    
                    
                    <p><strong>Departure Time:</strong> {ticket.trip?.departure}</p>
                </div>
            ) : (
                <div>No ticket details available.</div>
            )}
        </div>
    );
};

export default TicketDetails;
*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Box, 
    Typography, 
    Paper, 
    CircularProgress, 
    Alert, 
    Grid, 
    Divider 
} from '@mui/material';

const TicketDetails = () => {
    const [ticket, setTicket] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTicket = async () => {
            setLoading(true);
            setError('');
            try {
                const token = localStorage.getItem('token'); // Retrieve token from localStorage
                const response = await axios.get('http://localhost:4000/api/ticket', {
                    headers: {
                        Authorization: token,
                    },
                });

                setTicket(response.data.ticket);
            } catch (err) {
                console.error('Error fetching ticket:', err);
                setError(err.response?.data?.error || 'An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchTicket(); // Automatically fetch the ticket on component load
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundColor: '#f5f5f5',
                }}
            >
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    textAlign: 'center',
                    padding: 2,
                    backgroundColor: '#f5f5f5',
                }}
            >
                <Alert severity="error" variant="filled">
                    <strong>Error:</strong> {error}
                </Alert>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
                backgroundColor: '#f5f5f5',
                minHeight: '100vh',
            }}
        >
            {ticket ? (
                <Paper
                    elevation={4}
                    sx={{
                        padding: 4,
                        maxWidth: 600,
                        width: '100%',
                        borderRadius: 4,
                        backgroundColor: '#ffffff',
                    }}
                >
                    <Typography
                        variant="h4"
                        gutterBottom
                        align="center"
                        sx={{
                            fontWeight: 'bold',
                            color: 'primary.main',
                            marginBottom: 2,
                        }}
                    >
                        🎫 Ticket Details
                    </Typography>
                    <Divider sx={{ marginBottom: 3 }} />

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="body1" color="textSecondary">
                                <strong>Ticket Number:</strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{ticket.ticketNumber}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="body1" color="textSecondary">
                                <strong>Bus Name:</strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{ticket.bus?.busName}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="body1" color="textSecondary">
                                <strong>Bus Number:</strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{ticket.bus?.busNumber}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="body1" color="textSecondary">
                                <strong>Seat Numbers:</strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{ticket.seats.join(', ')}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="body1" color="textSecondary">
                                <strong>From:</strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{ticket.route?.from}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="body1" color="textSecondary">
                                <strong>To:</strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{ticket.route?.to}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="body1" color="textSecondary">
                                <strong>Journey Date:</strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                {new Date(ticket.journeyDate).toLocaleDateString()}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="body1" color="textSecondary">
                                <strong>Total Amount:</strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">₹{ticket.totalAmount}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="body1" color="textSecondary">
                                <strong>Departure Time:</strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{ticket.trip?.departure}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            ) : (
                <Typography variant="h6" color="textSecondary">
                    No ticket details available.
                </Typography>
            )}
        </Box>
    );
};

export default TicketDetails;
