/*
import axios from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import API_BASE_URL from '../config/axios';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startForgotPassword } from '../actions/forgot-action';

export default function Login() {
    const navigate = useNavigate();
    const { handleLogin } = useAuth();
    const [serverError, setServerError] = useState([]);
    const [modal, setModal] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotEmailError, setForgotEmailError] = useState('');

    const toggle = () => {
        formik.resetForm();
        setForgotEmail('');
        setForgotEmailError('');
        setServerError([]);
        setModal(!modal);
    };

    const handleInputChange = (e) => {
        setForgotEmail(e.target.value);
    };

    const dispatch = useDispatch();
    const error = useSelector(state => state.forgot.error);

    const validationSchema = Yup.object().shape({
        identifier: Yup.string().required('Email, Username, or Phone is required'),
        password: Yup.string().required('Password is required'),
    });

    const forgotPasswordSchema = Yup.object({
        forgotEmail: Yup.string().email('Invalid email format').required('Email is required'),
    });

    const formik = useFormik({
        initialValues: {
            identifier: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                let loginData = { password: values.password };

                if (values.identifier.includes('@')) {
                    loginData.email = values.identifier;
                } else if (/^\d+$/.test(values.identifier)) {
                    loginData.phone = values.identifier;
                } else {
                    loginData.username = values.identifier;
                }

                const response = await axios.post(`${API_BASE_URL}/users/login`, loginData);
                localStorage.setItem('token', response.data.token);

                const userResponse = await axios.get(`${API_BASE_URL}/users/account`, {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });
                const user = userResponse.data; 
                handleLogin(user);
                resetForm();
                
                // Navigate immediately after successful login
                if (user.role === 'user') {
                    navigate('/search');
                } else if (user.role === 'operator') {
                    navigate('/');
                } else {
                    navigate('/'); // Default fallback
                }

                // Show toast notification for success
                toast.success('Login Success', { autoClose: 1000 });
            } catch (err) {
                if (err.response) {
                    if (err.response.status === 403) {
                        navigate('/verification-progress');
                    } else if (err.response.status === 400 && err.response.data.errors) {
                        setServerError(err.response.data.errors.map(error => error.msg));
                    } else {
                        console.error('Error:', err.message);
                        setServerError(['Something went wrong. Please try again.']);
                    }
                }
            }
        },
    });

    const handleSubmitForgotPassword = async (e) => {
        e.preventDefault();
        try {
            await forgotPasswordSchema.validate({ forgotEmail });
            setForgotEmailError('');
            dispatch(startForgotPassword(forgotEmail, toggle, navigate));
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                setForgotEmailError(error.message);
            } else if (error.response && error.response.status === 404) {
                setForgotEmailError(error.response.data.message);
            } else {
                dispatch(startForgotPassword(error));
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <p>Please enter your login and password:</p>
            <form onSubmit={formik.handleSubmit}>
                <div>
                <label htmlFor="email">Email:</label><br/>
                    <input
                        type="text"
                        id="identifier"
                        name="identifier"
                        onChange={formik.handleChange}
                        value={formik.values.identifier}
                        
                    />
                    {formik.touched.identifier && formik.errors.identifier && (
                        <p>{formik.errors.identifier}</p>
                    )}
                </div>
                <div>
                <label htmlFor="password">Password:</label><br/>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p>{formik.errors.password}</p>
                    )}
                </div>
                {serverError.length > 0 && <p>{serverError.join(', ')}</p>}
                <button type="submit" disabled={formik.isSubmitting}>Login</button>
            </form>
            <p>
                <button onClick={toggle}>Forgot password?</button>
            </p>
            <p>
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>

            {modal && (
                <div>
                    <h3>Forgot Password</h3>
                    <form onSubmit={handleSubmitForgotPassword}>
                        <input
                            type="text"
                            placeholder="Enter Email to reset Password"
                            value={forgotEmail}
                            onChange={handleInputChange}
                        />
                        {forgotEmailError && <p>{forgotEmailError}</p>}
                        {error && <p>{error}</p>}
                        <br/>
                        <button type="submit">Submit</button>
                        <button onClick={toggle}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
}
*/

import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import API_BASE_URL from '../config/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startForgotPassword } from '../actions/forgot-action';

// Material-UI Components
import {
    TextField,
    Button,
    Typography,
    Modal,
    Box,
    Paper,
    Grid,
    Alert,
} from '@mui/material';

export default function Login() {
    const navigate = useNavigate();
    const { handleLogin } = useAuth();
    const [serverError, setServerError] = useState([]);
    const [modal, setModal] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotEmailError, setForgotEmailError] = useState('');

    const toggle = () => {
        formik.resetForm();
        setForgotEmail('');
        setForgotEmailError('');
        setServerError([]);
        setModal(!modal);
    };

    const handleInputChange = (e) => {
        setForgotEmail(e.target.value);
    };

    const dispatch = useDispatch();
    const error = useSelector((state) => state.forgot.error);

    const validationSchema = Yup.object().shape({
        identifier: Yup.string().required('Email, Username, or Phone is required'),
        password: Yup.string().required('Password is required'),
    });

    const forgotPasswordSchema = Yup.object({
        forgotEmail: Yup.string().email('Invalid email format').required('Email is required'),
    });

    const formik = useFormik({
        initialValues: {
            identifier: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                let loginData = { password: values.password };

                if (values.identifier.includes('@')) {
                    loginData.email = values.identifier;
                } else if (/^\d+$/.test(values.identifier)) {
                    loginData.phone = values.identifier;
                } else {
                    loginData.username = values.identifier;
                }

                const response = await axios.post(`${API_BASE_URL}/users/login`, loginData);
                localStorage.setItem('token', response.data.token);

                const userResponse = await axios.get(`${API_BASE_URL}/users/account`, {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });
                const user = userResponse.data;
                handleLogin(user);
                resetForm();

                if (user.role === 'user') {
                    navigate('/search');
                } else if (user.role === 'operator') {
                    navigate('/');
                } else {
                    navigate('/');
                }

                toast.success('Login Success', { autoClose: 1000 });
            } catch (err) {
                if (err.response) {
                    if (err.response.status === 403) {
                        navigate('/verification-progress');
                    } else if (err.response.status === 400 && err.response.data.errors) {
                        setServerError(err.response.data.errors.map((error) => error.msg));
                    } else {
                        setServerError(['Something went wrong. Please try again.']);
                    }
                }
            }
        },
    });

    const handleSubmitForgotPassword = async (e) => {
        e.preventDefault();
        try {
            await forgotPasswordSchema.validate({ forgotEmail });
            setForgotEmailError('');
            dispatch(startForgotPassword(forgotEmail, toggle, navigate));
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                setForgotEmailError(error.message);
            } else if (error.response && error.response.status === 404) {
                setForgotEmailError(error.response.data.message);
            } else {
                dispatch(startForgotPassword(error));
            }
        }
    };

    return (
        <Grid container justifyContent="center" style={{ marginTop: '50px' }}>
            <Paper elevation={3} style={{ padding: '30px', maxWidth: '400px', width: '100%' }}>
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Please enter your login and password:
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email, Username, or Phone"
                        id="identifier"
                        name="identifier"
                        value={formik.values.identifier}
                        onChange={formik.handleChange}
                        error={formik.touched.identifier && Boolean(formik.errors.identifier)}
                        helperText={formik.touched.identifier && formik.errors.identifier}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        margin="normal"
                    />
                    {serverError.length > 0 && (
                        <Alert severity="error" style={{ marginBottom: '15px' }}>
                            {serverError.join(', ')}
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={formik.isSubmitting}
                        style={{ marginTop: '20px' }}
                    >
                        Login
                    </Button>
                </form>
                <Button
                    onClick={toggle}
                    color="secondary"
                    fullWidth
                    style={{ marginTop: '15px' }}
                >
                    Forgot password?
                </Button>
                <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </Typography>
            </Paper>

            <Modal open={modal} onClose={toggle}>
                <Box
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        backgroundColor: 'white',
                        border: '2px solid #000',
                        boxShadow: 24,
                        padding: 20,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Forgot Password
                    </Typography>
                    <form onSubmit={handleSubmitForgotPassword}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={forgotEmail}
                            onChange={handleInputChange}
                            error={Boolean(forgotEmailError)}
                            helperText={forgotEmailError}
                            margin="normal"
                        />
                        {error && (
                            <Alert severity="error" style={{ marginBottom: '15px' }}>
                                {error}
                            </Alert>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ marginRight: '10px' }}
                        >
                            Submit
                        </Button>
                        <Button onClick={toggle} variant="outlined" color="secondary">
                            Cancel
                        </Button>
                    </form>
                </Box>
            </Modal>
        </Grid>
    );
}
