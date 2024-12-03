import React from 'react';
import { Button, Container, Row, Col } from 'reactstrap';

export default function VerificationProgress() {
  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        <Row className="justify-content-center">
          <Col xs="10" md="8" lg="6" className="text-center">
            <h1 className="display-4 text-danger mt-5">Account Under Verification</h1>
            <h2 className="mb-4">Please wait !!</h2>
            <p className="lead">Your account is currently under verification. Please wait until the admin verifies it. Thank you for your patience!</p>
            <div className="mt-4">
              <Button color="primary" href="/" className="btn-lg">Go back home</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}