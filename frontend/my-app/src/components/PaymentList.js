/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentList = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true); // For showing loading state
    const [error, setError] = useState(null); // For capturing errors

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found in localStorage!');
                    alert('User not authenticated. Please log in.');
                    return;
                }

                console.log('Token retrieved from localStorage:', token);

                // Call the API to fetch payments
                const response = await axios.get('http://localhost:4000/payments', {
                    headers: {
                        Authorization: token, // Token without "Bearer" prefix
                    },
                });

                console.log('Payments fetched successfully:', response.data);

                // Check if payments data exists
                if (response.data && response.data.payments) {
                    setPayments(response.data.payments);
                } else {
                    console.warn('No payments data found in the API response.');
                    setError('No payments found.');
                }
            } catch (error) {
                console.error('Error fetching payments:', error);

                // Handle different error scenarios for better debugging
                if (error.response) {
                    console.error('Error response data:', error.response.data);
                    setError(error.response.data.message || 'Error fetching payments. Please try again later.');
                } else if (error.request) {
                    console.error('No response received:', error.request);
                    setError('No response from server. Please check your network connection.');
                } else {
                    console.error('Error during request setup:', error.message);
                    setError('Error setting up the request.');
                }
            } finally {
                setLoading(false); // Set loading to false once the request finishes
            }
        };

        fetchPayments();
    }, []); // Empty dependency array means this will run once when the component mounts

    // Filter to get unique payments based on bookingId
    const uniquePayments = payments.reduce((acc, payment) => {
        const existingPayment = acc.find(item => item.bookingId === payment.bookingId);
        if (!existingPayment) {
            acc.push(payment); // Add if no existing entry
        } else {
            // Replace if the current payment is more recent
            if (new Date(payment.updatedAt) > new Date(existingPayment.updatedAt)) {
                acc = acc.map(item =>
                    item.bookingId === payment.bookingId ? payment : item
                );
            }
        }
        return acc;
    }, []);

    console.log('Filtered unique payments:', uniquePayments);

    // Group unique payments by month and calculate total amounts
    const calculateMonthlyTotals = (payments) => {
        const monthlyTotals = payments.reduce((acc, payment) => {
            const date = new Date(payment.paymentDate); // Use `paymentDate` for grouping
            const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // Format: YYYY-MM

            if (!acc[monthYear]) {
                acc[monthYear] = 0;
            }
            acc[monthYear] += payment.amount; // Sum up the amount
            return acc;
        }, {});

        return Object.entries(monthlyTotals).map(([monthYear, totalAmount]) => ({
            monthYear,
            totalAmount,
        }));
    };

    const monthlyTotals = calculateMonthlyTotals(uniquePayments);

    return (
        <div>
            <h2>Payments List</h2>

            {loading && <p>Loading payments...</p>} 

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && !error && uniquePayments.length > 0 ? (
                <>
                    <h3>Monthly Totals</h3>
                    <ul>
                        {monthlyTotals.map(({ monthYear, totalAmount }) => (
                            <li key={monthYear}>
                                <p>
                                    <strong>{monthYear}:</strong> Rs{totalAmount.toFixed(2)}
                                </p>
                            </li>
                        ))}
                    </ul>

                    <h3>Payments Details</h3>
                    <ul>
                        {uniquePayments.map(payment => (
                            <li key={payment._id}>
                                <p><strong>Booking ID:</strong> {payment.bookingId}</p>
                                <p><strong>Amount:</strong> Rs{payment.amount}</p>
                                <p><strong>Status:</strong> {payment.paymentStatus}</p>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                !loading && !error && <p>No payments found.</p>
            )}
        </div>
    );
};

export default PaymentList;
*/


import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  CircularProgress,
  Alert,
} from '@mui/material';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true); // For showing loading state
  const [error, setError] = useState(null); // For capturing errors

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage!');
          alert('User not authenticated. Please log in.');
          return;
        }

        // Call the API to fetch payments
        const response = await axios.get('http://localhost:4000/payments', {
          headers: {
            Authorization: token, // Token without "Bearer" prefix
          },
        });

        // Check if payments data exists
        if (response.data && response.data.payments) {
          setPayments(response.data.payments);
        } else {
          setError('No payments found.');
        }
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message || 'Error fetching payments. Please try again later.');
        } else if (error.request) {
          setError('No response from server. Please check your network connection.');
        } else {
          setError('Error setting up the request.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Filter to get unique payments based on bookingId
  const uniquePayments = payments.reduce((acc, payment) => {
    const existingPayment = acc.find(item => item.bookingId === payment.bookingId);
    if (!existingPayment) {
      acc.push(payment);
    } else {
      // Replace if the current payment is more recent
      if (new Date(payment.updatedAt) > new Date(existingPayment.updatedAt)) {
        acc = acc.map(item => (item.bookingId === payment.bookingId ? payment : item));
      }
    }
    return acc;
  }, []);

  // Group unique payments by month and calculate total amounts
  const calculateMonthlyTotals = payments => {
    const monthlyTotals = payments.reduce((acc, payment) => {
      const date = new Date(payment.paymentDate); // Use `paymentDate` for grouping
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // Format: YYYY-MM

      if (!acc[monthYear]) {
        acc[monthYear] = 0;
      }
      acc[monthYear] += payment.amount; // Sum up the amount
      return acc;
    }, {});

    return Object.entries(monthlyTotals).map(([monthYear, totalAmount]) => ({
      monthYear,
      totalAmount,
    }));
  };

  const monthlyTotals = calculateMonthlyTotals(uniquePayments);

  const formatDate = dateString => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format: MM/DD/YYYY
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Payments List
      </Typography>

      {loading && <CircularProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && uniquePayments.length > 0 ? (
        <>
          <Typography variant="h5" gutterBottom>
            Monthly Totals
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Month</strong></TableCell>
                  <TableCell><strong>Total Amount (Rs)</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {monthlyTotals.map(({ monthYear, totalAmount }) => (
                  <TableRow key={monthYear}>
                    <TableCell>{monthYear}</TableCell>
                    <TableCell>{totalAmount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h5" gutterBottom>
            Payment Details
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Booking ID</strong></TableCell>
                  <TableCell><strong>Payment Date</strong></TableCell>
                  <TableCell><strong>Amount (Rs)</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {uniquePayments.map(payment => (
                  <TableRow key={payment._id}>
                    <TableCell>{payment.bookingId}</TableCell>
                    <TableCell>{formatDate(payment.paymentDate)}</TableCell>
                    <TableCell>{payment.amount.toFixed(2)}</TableCell>
                    <TableCell>{payment.paymentStatus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        !loading && !error && <Typography>No payments found.</Typography>
      )}
    </Box>
  );
};

export default PaymentList;
