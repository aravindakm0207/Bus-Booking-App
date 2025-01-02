
/*
import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import API_BASE_URL from '../config/axios';

export default function AdminDashboard() {
  const [unverifiedOperators, setUnverifiedOperators] = useState([]);
  const [verifiedOperators, setVerifiedOperators] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch both unverified and verified operators on component load
  useEffect(() => {
    const fetchOperators = async () => {
      try {
        setLoading(true);
        console.log('Fetching operators...');

        // Fetch unverified operators
        console.log('Fetching unverified operators...');
        const unverifiedResponse = await axios.get(`${API_BASE_URL}/unverified-operators`, {
          headers: {
            Authorization: localStorage.getItem('token'), // Use token directly
          },
        });
        console.log('Unverified operators:', unverifiedResponse.data);

        // Fetch verified operators
        console.log('Fetching verified operators...');
        const verifiedResponse = await axios.get(`${API_BASE_URL}/verifiedOperators`, {
          headers: {
            Authorization: localStorage.getItem('token'), // Use token directly
          },
        });
        console.log('Verified operators:', verifiedResponse.data);

        setUnverifiedOperators(unverifiedResponse.data);
        setVerifiedOperators(verifiedResponse.data);
      } catch (error) {
        console.error('Error fetching operators:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOperators();
  }, []);

  // Function to verify an operator
  const verifyOperator = async (userId) => {
    try {
      console.log('Verifying operator with ID:', userId);
      const response = await axios.post(
        `${API_BASE_URL}/verify-operator`,
        { userId },
        {
          headers: {
            Authorization: localStorage.getItem('token'), // Use token directly
          },
        }
      );

      console.log('Verification response:', response.data);
      alert(response.data.message);

      const operatorToVerify = unverifiedOperators.find((op) => op._id === userId);
      setUnverifiedOperators(unverifiedOperators.filter((op) => op._id !== userId));
      setVerifiedOperators([...verifiedOperators, operatorToVerify]);
    } catch (error) {
      console.error('Error verifying operator:', error.response?.data || error.message);
      alert('Failed to verify operator');
    }
  };

  // Function to reject an operator
  const rejectOperator = async (userId) => {
    try {
      console.log('Rejecting operator with ID:', userId);
      const response = await axios.post(
        `${API_BASE_URL}/reject-operator`,
        { userId },
        {
          headers: {
            Authorization: localStorage.getItem('token'), // Use token directly
          },
        }
      );

      console.log('Rejection response:', response.data);
      alert(response.data.message);

      // Update the list after rejection
      setUnverifiedOperators(unverifiedOperators.filter((op) => op._id !== userId));
    } catch (error) {
      console.error('Error rejecting operator:', error.response?.data || error.message);
      alert('Failed to reject operator');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2>Admin Dashboard</h2>
          <hr />
        </Col>
      </Row>

    
      <Row className="mt-4">
        <Col>
          <h3>Unverified Operators</h3>
          {unverifiedOperators.length > 0 ? (
            <Table bordered striped responsive style={{ border: '1px solid black' }}>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {unverifiedOperators.map((operator) => (
                  <tr key={operator._id}>
                    <td>{operator.username}</td>
                    <td>{operator.email}</td>
                    <td>{operator.phone}</td>
                    <td>
                      <Button
                        color="success"
                        size="sm"
                        onClick={() => verifyOperator(operator._id)}
                      >
                        Verify
                      </Button>{' '}
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => rejectOperator(operator._id)}
                      >
                        Reject
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No unverified operators.</p>
          )}
        </Col>
      </Row>

    
      <Row className="mt-4">
        <Col>
          <h3>Verified Operators</h3>
          {verifiedOperators.length > 0 ? (
            <Table bordered striped responsive style={{ border: '1px solid black' }}>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {verifiedOperators.map((operator) => (
                  <tr key={operator._id}>
                    <td>{operator.username}</td>
                    <td>{operator.email}</td>
                    <td>{operator.phone}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No verified operators.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}
*/


import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import API_BASE_URL from "../config/axios";

export default function AdminDashboard() {
  const [unverifiedOperators, setUnverifiedOperators] = useState([]);
  const [verifiedOperators, setVerifiedOperators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        setLoading(true);
        // Fetch unverified operators
        const unverifiedResponse = await axios.get(`${API_BASE_URL}/unverified-operators`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        // Fetch verified operators
        const verifiedResponse = await axios.get(`${API_BASE_URL}/verifiedOperators`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        setUnverifiedOperators(unverifiedResponse.data);
        setVerifiedOperators(verifiedResponse.data);
      } catch (error) {
        console.error("Error fetching operators:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOperators();
  }, []);

  const verifyOperator = async (userId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/verify-operator`,
        { userId },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      alert(response.data.message);

      const operatorToVerify = unverifiedOperators.find((op) => op._id === userId);
      setUnverifiedOperators(unverifiedOperators.filter((op) => op._id !== userId));
      setVerifiedOperators([...verifiedOperators, operatorToVerify]);
    } catch (error) {
      console.error("Error verifying operator:", error.response?.data || error.message);
      alert("Failed to verify operator");
    }
  };

  const rejectOperator = async (userId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/reject-operator`,
        { userId },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      alert(response.data.message);
      setUnverifiedOperators(unverifiedOperators.filter((op) => op._id !== userId));
    } catch (error) {
      console.error("Error rejecting operator:", error.response?.data || error.message);
      alert("Failed to reject operator");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      <Box mt={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          Unverified Operators
        </Typography>
        {unverifiedOperators.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {unverifiedOperators.map((operator) => (
                  <TableRow key={operator._id}>
                    <TableCell>{operator.username}</TableCell>
                    <TableCell>{operator.email}</TableCell>
                    <TableCell>{operator.phone}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => verifyOperator(operator._id)}
                        sx={{ mr: 1 }}
                      >
                        Verify
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => rejectOperator(operator._id)}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>No unverified operators.</Typography>
        )}
      </Box>

      <Box mt={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          Verified Operators
        </Typography>
        {verifiedOperators.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {verifiedOperators.map((operator) => (
                  <TableRow key={operator._id}>
                    <TableCell>{operator.username}</TableCell>
                    <TableCell>{operator.email}</TableCell>
                    <TableCell>{operator.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>No verified operators.</Typography>
        )}
      </Box>
    </Container>
  );
}
