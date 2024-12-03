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

      // Update the list after verification
      setUnverifiedOperators(unverifiedOperators.filter((op) => op._id !== userId));
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

      {/* Unverified Operators */}
      <Row className="mt-4">
        <Col>
          <h3>Unverified Operators</h3>
          {unverifiedOperators.length > 0 ? (
            <Table bordered striped responsive>
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

      {/* Verified Operators */}
      <Row className="mt-4">
        <Col>
          <h3>Verified Operators</h3>
          {verifiedOperators.length > 0 ? (
            <Table bordered striped responsive>
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
