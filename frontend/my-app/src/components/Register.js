/*
import axios from 'axios';
import { useState, useEffect } from 'react';
import API_BASE_URL from '../config/axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [checkUsername, setCheckUsername] = useState('');
    const [checkEmail, setCheckEmail] = useState('');
    const [checkPhone, setCheckPhone] = useState('');
    const [adminExists, setAdminExists] = useState(false);

    useEffect(() => {
        handleAdminExists();
    }, []);

    const handleAdminExists = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/check-admin`);
            console.log('Admin exists:', response.data.adminExists);
            setAdminExists(response.data.adminExists);
        } catch (err) {
            console.error('Error checking admin existence:', err);
        }
    };

    const checkUsernameExists = async (username) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/checkusername?username=${username}`);
            setCheckUsername(response.data.exists ? 'Username already exists' : '');
        } catch (error) {
            console.error('Error checking username:', error);
        }
    };

    const checkEmailExists = async (email) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/checkemail?email=${email}`);
            setCheckEmail(response.data.exists ? 'Email already exists' : '');
        } catch (error) {
            console.error('Error checking email:', error);
        }
    };

    const checkPhoneExists = async (phone) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/checkphone?phone=${phone}`);
            setCheckPhone(response.data.exists ? 'Phone number already exists' : '');
        } catch (error) {
            console.error('Error checking phone:', error);
        }
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        phone: Yup.string().required('Phone number is required').min(10, 'Phone number must be 10 digits'),
        role: Yup.string().required('Role is required'),
        profilePic: Yup.mixed()
        .required('Profile picture is required')
        .test('fileSize', 'File size too large, must be less than 2MB', (value) =>
            value ? value.size <= 2 * 1024 * 1024 : true
        ),
    
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            phone: '',
            role: adminExists ? 'admin' : 'user', // Set default role based on admin existence
            profilePic: null,
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                Object.keys(values).forEach((key) => {
                    if (key === 'profilePic') {
                        formData.append(key, values[key]); // Append the profile picture file
                    } else {
                        formData.append(key, values[key]);
                    }
                });

                await axios.post(`${API_BASE_URL}/users/register`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                toast.success('Registration Successful', {
                    autoClose: 1000,
                    onClose: () => {
                        navigate('/login');
                    },
                });
                formik.resetForm();
            } catch (err) {
                if (err.response && err.response.data.errors) {
                    const serverErrors = {};
                    err.response.data.errors.forEach(error => {
                        serverErrors[error.param] = error.msg;
                    });
                    formik.setErrors(serverErrors);
                } else {
                    console.error('Unexpected error:', err);
                }
            }
        },
    });

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label><br/>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={() => checkUsernameExists(formik.values.username)}
                    />
                    {checkUsername && <div>{checkUsername}</div>}
                    {formik.errors.username && formik.touched.username && (
                        <div>{formik.errors.username}</div>
                    )}
                </div>
                <br/>

                <div>
                    <label htmlFor="email">Email:</label><br/>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={() => checkEmailExists(formik.values.email)}
                    />
                    {checkEmail && <div>{checkEmail}</div>}
                    {formik.errors.email && formik.touched.email && (
                        <div>{formik.errors.email}</div>
                    )}
                </div>
                <br/>

                <div>
                    <label htmlFor="password">Password:</label><br/>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password && formik.touched.password && (
                        <div>{formik.errors.password}</div>
                    )}
                </div>
                <br/>

                <div>
                    <label htmlFor="phone">Phone:</label><br/>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={() => checkPhoneExists(formik.values.phone)}
                    />
                    {checkPhone && <div>{checkPhone}</div>}
                    {formik.errors.phone && formik.touched.phone && (
                        <div>{formik.errors.phone}</div>
                    )}
                </div>
                <br/>

                <div>
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        name="role"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        disabled={!adminExists && formik.values.role === 'admin'}
                    >
                        <option value="">Select Role</option>
                        <option value="user">User</option>
                        <option value="operator">Operator</option>
                        {!adminExists && <option value="admin">Admin</option>}
                    </select>
                    {formik.errors.role && formik.touched.role && (
                        <div>{formik.errors.role}</div>
                    )}
                </div>
                <br/>
                <div>
                    <label htmlFor="profilePic">Profile Picture:</label><br />
                    <input
                        type="file"
                        id="profilePic"
                        name="profilePic"
                        accept="image/*"
                        onChange={(event) => {
                            formik.setFieldValue('profilePic', event.target.files[0]);
                        }}
                    />
                    {formik.errors.profilePic && formik.touched.profilePic && (
                        <div>{formik.errors.profilePic}</div>
                    )}
                </div>
                <br />

                <div>
                    <button type="submit" disabled={formik.isSubmitting}>
                        Register
                    </button>
                </div>
            </form>
            <p>
                <Link to="/login">Already have an account?</Link>
            </p>
        </div>
    );
};

export default Register;

*/

/*
import axios from 'axios';
import { useState, useEffect } from 'react';
import API_BASE_URL from '../config/axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import {
    Box,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    Alert,
    Stack,
} from '@mui/material';

const Register = () => {
    const navigate = useNavigate();
    const [checkUsername, setCheckUsername] = useState('');
    const [checkEmail, setCheckEmail] = useState('');
    const [checkPhone, setCheckPhone] = useState('');
    const [adminExists, setAdminExists] = useState(false);

    useEffect(() => {
        handleAdminExists();
    }, []);

    const handleAdminExists = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/check-admin`);
            setAdminExists(response.data.adminExists);
        } catch (err) {
            console.error('Error checking admin existence:', err);
        }
    };

    const checkUsernameExists = async (username) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/checkusername?username=${username}`);
            setCheckUsername(response.data.exists ? 'Username already exists' : '');
        } catch (error) {
            console.error('Error checking username:', error);
        }
    };

    const checkEmailExists = async (email) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/checkemail?email=${email}`);
            setCheckEmail(response.data.exists ? 'Email already exists' : '');
        } catch (error) {
            console.error('Error checking email:', error);
        }
    };

    const checkPhoneExists = async (phone) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/checkphone?phone=${phone}`);
            setCheckPhone(response.data.exists ? 'Phone number already exists' : '');
        } catch (error) {
            console.error('Error checking phone:', error);
        }
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        phone: Yup.string().required('Phone number is required').min(10, 'Phone number must be 10 digits'),
        role: Yup.string().required('Role is required'),
        profilePic: Yup.mixed()
            .required('Profile picture is required')
            .test('fileSize', 'File size too large, must be less than 2MB', (value) =>
                value ? value.size <= 2 * 1024 * 1024 : true
            ),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            phone: '',
            role: adminExists ? 'admin' : 'user',
            profilePic: null,
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                Object.keys(values).forEach((key) => {
                    formData.append(key, values[key]);
                });

                await axios.post(`${API_BASE_URL}/users/register`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                toast.success('Registration Successful', {
                    autoClose: 1000,
                    onClose: () => {
                        navigate('/login');
                    },
                });
                formik.resetForm();
            } catch (err) {
                if (err.response && err.response.data.errors) {
                    const serverErrors = {};
                    err.response.data.errors.forEach(error => {
                        serverErrors[error.param] = error.msg;
                    });
                    formik.setErrors(serverErrors);
                } else {
                    console.error('Unexpected error:', err);
                }
            }
        },
    });

    return (
        <Box sx={{ maxWidth: 500, margin: '0 auto', padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        label="Username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={() => checkUsernameExists(formik.values.username)}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                    {checkUsername && <Alert severity="error">{checkUsername}</Alert>}

                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={() => checkEmailExists(formik.values.email)}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    {checkEmail && <Alert severity="error">{checkEmail}</Alert>}

                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />

                    <TextField
                        label="Phone"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={() => checkPhoneExists(formik.values.phone)}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                    />
                    {checkPhone && <Alert severity="error">{checkPhone}</Alert>}

                    <FormControl fullWidth variant="outlined">
    <InputLabel id="role-label">Role</InputLabel>
    <Select
        labelId="role-label"
        id="role"
        name="role"
        value={formik.values.role}
        onChange={formik.handleChange}
        error={formik.touched.role && Boolean(formik.errors.role)}
        label="Role" // Ensure the label prop is passed here
    >
        <MenuItem value="">Select Role</MenuItem>
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="operator">Operator</MenuItem>
        {!adminExists && <MenuItem value="admin">Admin</MenuItem>}
    </Select>
    {formik.touched.role && formik.errors.role && (
        <Typography variant="caption" color="error">
            {formik.errors.role}
        </Typography>
    )}
</FormControl>


                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                    >
                        Upload Profile Picture
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(event) => formik.setFieldValue('profilePic', event.target.files[0])}
                        />
                    </Button>
                    {formik.touched.profilePic && formik.errors.profilePic && (
                        <Typography variant="caption" color="error">
                            {formik.errors.profilePic}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={formik.isSubmitting}
                    >
                        Register
                    </Button>

                    <Typography variant="body2" align="center">
                        Already have an account? <Link to="/login">Login</Link>
                    </Typography>
                </Stack>
            </form>
        </Box>
    );
};

export default Register;

*/

import axios from 'axios';
import { useState, useEffect } from 'react';
import API_BASE_URL from '../config/axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import {
    Box,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    Alert,
    Stack,
} from '@mui/material';

const Register = () => {
    const navigate = useNavigate();
    const [checkUsername, setCheckUsername] = useState('');
    const [checkEmail, setCheckEmail] = useState('');
    const [checkPhone, setCheckPhone] = useState('');
    const [adminExists, setAdminExists] = useState(false);

    useEffect(() => {
        handleAdminExists();
    }, []);

    const handleAdminExists = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/check-admin`);
            setAdminExists(response.data.adminExists);
        } catch (err) {
            console.error('Error checking admin existence:', err);
        }
    };

    const checkUsernameExists = async (username) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/checkusername?username=${username}`);
            setCheckUsername(response.data.exists ? 'Username already exists' : '');
        } catch (error) {
            console.error('Error checking username:', error);
        }
    };

    const checkEmailExists = async (email) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/checkemail?email=${email}`);
            setCheckEmail(response.data.exists ? 'Email already exists' : '');
        } catch (error) {
            console.error('Error checking email:', error);
        }
    };

    const checkPhoneExists = async (phone) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/checkphone?phone=${phone}`);
            setCheckPhone(response.data.exists ? 'Phone number already exists' : '');
        } catch (error) {
            console.error('Error checking phone:', error);
        }
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        phone: Yup.string().required('Phone number is required').min(10, 'Phone number must be 10 digits'),
        role: Yup.string().required('Role is required'),
        profilePic: Yup.mixed()
            .required('Profile picture is required')
            .test('fileSize', 'File size too large, must be less than 2MB', (value) =>
                value ? value.size <= 2 * 1024 * 1024 : true
            ),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            phone: '',
            role: adminExists ? 'admin' : 'user',
            profilePic: null,
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                Object.keys(values).forEach((key) => {
                    formData.append(key, values[key]);
                });

                await axios.post(`${API_BASE_URL}/users/register`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                toast.success('Registration Successful', {
                    autoClose: 1000,
                    onClose: () => {
                        navigate('/login');
                    },
                });
                formik.resetForm();
            } catch (err) {
                if (err.response && err.response.data.errors) {
                    const serverErrors = {};
                    err.response.data.errors.forEach(error => {
                        serverErrors[error.param] = error.msg;
                    });
                    formik.setErrors(serverErrors);
                } else {
                    console.error('Unexpected error:', err);
                }
            }
        },
    });

    return (
        <Box sx={{ maxWidth: 500, margin: '0 auto', padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        label="Username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={() => checkUsernameExists(formik.values.username)}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                    {checkUsername && <Alert severity="error">{checkUsername}</Alert>}

                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={() => checkEmailExists(formik.values.email)}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    {checkEmail && <Alert severity="error">{checkEmail}</Alert>}

                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />

                    <TextField
                        label="Phone"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={() => checkPhoneExists(formik.values.phone)}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                    />
                    {checkPhone && <Alert severity="error">{checkPhone}</Alert>}

                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            id="role"
                            name="role"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            error={formik.touched.role && Boolean(formik.errors.role)}
                            label="Role"
                        >
                            <MenuItem value="">Select Role</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="operator">Operator</MenuItem>
                            {!adminExists && <MenuItem value="admin">Admin</MenuItem>}
                        </Select>
                        {formik.touched.role && formik.errors.role && (
                            <Typography variant="caption" color="error">
                                {formik.errors.role}
                            </Typography>
                        )}
                    </FormControl>

                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                    >
                        Upload Profile Picture
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(event) => {
                                formik.setFieldValue('profilePic', event.target.files[0]);
                            }}
                        />
                    </Button>
                    {formik.values.profilePic && (
                        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                            {formik.values.profilePic.name}
                        </Typography>
                    )}
                    {formik.touched.profilePic && formik.errors.profilePic && (
                        <Typography variant="caption" color="error">
                            {formik.errors.profilePic}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={formik.isSubmitting}
                    >
                        Register
                    </Button>

                    <Typography variant="body2" align="center">
                        Already have an account? <Link to="/login">Login</Link>
                    </Typography>
                </Stack>
            </form>
        </Box>
    );
};

export default Register;
