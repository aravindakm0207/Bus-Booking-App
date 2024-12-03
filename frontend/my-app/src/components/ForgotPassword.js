
import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, ModalFooter } from 'reactstrap';
import API_BASE_URL from '../config/axios';// Import Axios for API calls
import { toast } from 'react-toastify'; // Import Toastify for notifications

const ForgotPassword = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/users/forgot-password`, { email });
      setSuccessMessage(response.data.message);
      toast.success('OTP sent to email', { autoClose: 2000 });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {  //Sets the error state to the error message returned from the API or a default error message.
        setError(error.response.data.message);
      } else {
        setError('Failed to send OTP');
      }
    }
  };

  return (
    <Form  className='col-md-8'onSubmit={handleFormSubmit}>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormGroup>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <ModalFooter>
        <Button color="primary" type="submit">
          Submit
        </Button>{' '}
        <Button color="secondary" onClick={closeModal}>
          Cancel 
        </Button> 
      </ModalFooter>
    </Form>
  );
};

export default ForgotPassword;


// The cancel button calls closeModal to close the modal (presumably passed down as a prop from a parent component).