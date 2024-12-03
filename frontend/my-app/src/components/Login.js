
/*
import { useState } from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'
import { useAuth } from '../context/AuthContext'
export default function Login() {
    const navigate = useNavigate()
    // const { handleLogin } = useAuth() // useContext(AuthContext) -> { user, handleLogin, handleLogout}
    const { dispatch } = useAuth() 

    const [form, setForm] = useState({
        email: '',
        password: '',
        serverErrors: null, 
        clientErrors: {}
    })

    const errors = {}

    const runValidations = () => {
        if(form.email.trim().length == 0) {
            errors.email = 'email is required'
        } else if(!validator.isEmail(form.email)) {
            errors.email = 'invalid email format'
        }

        if(form.password.trim().length == 0) {
            errors.password = 'password is required'
        } else if(form.password.trim().length < 8 || form.password.trim().length > 128) {
            errors.password = 'invalid password length'
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault() 
        const formData = _.pick(form, ['email', 'password'])

        runValidations()

        if(Object.keys(errors).length == 0 ) {
            try { 
                const response = await axios.post('http://localhost:4000/users/login', formData) 
                localStorage.setItem('token', response.data.token)
                const userResponse = await axios.get('http://localhost:4000/users/account', { 
                    headers : {
                        Authorization: localStorage.getItem('token')
                    }
                })
                console.log(userResponse.data)
                dispatch({ type: "LOGIN", payload: { account: userResponse.data } })
                // let url 
                // if(userResponse.data.role == 'candidate') {
                //     url = 'http://localhost:3333/api/candidates/profile'
                // } else {
                //     url = 'http://localhost:3333/api/recruiter/profile'
                // }
                // const profileResponse = await axios.get(url, { 
                //     headers: {
                //         Authorization: localStorage.getItem('token')
                //     }
                // })
                // // console.log(profileResponse.data)
                // dispatch({ type: "LOGIN", payload: { account: userResponse.data, profile: profileResponse.data } })
                navigate('/')
            } catch(err) {
                setForm({...form, serverErrors: err.response.data.errors, clientErrors: {} })
            }
        } else {
            setForm({...form, clientErrors: errors})
        }
    }

    const handleChange = (e) => {
        const { value, name } = e.target 
        setForm({...form, [name]: value })
    }

    const displayErrors = () => {
        let result 
        if(typeof form.serverErrors == 'string') {
            result = <p> { form.serverErrors } </p>
        } else {
            result = (
                <div>
                    <h3>Theses errors prohibitted the form from being saved: </h3>
                    <ul>
                        { form.serverErrors.map((ele, i) => {
                            return <li key={i}> { ele.msg } </li>
                        })}
                    </ul>
                </div>
            )
        }
        return result 
    }
    
    return (
        <div>
            <h2>Login</h2>
            { form.serverErrors && displayErrors() } 
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Enter email</label><br />
                <input 
                    type="text" 
                    value={form.email} 
                    onChange={handleChange}
                    name="email" 
                    id="email"
                />
                { form.clientErrors.email && <span> { form.clientErrors.email } </span>}
                 <br />

                <label htmlFor="password">Enter password</label><br />
                <input 
                    type="password" 
                    value={form.password} 
                    onChange={handleChange} 
                    name="password"
                    id="password"
                /> 
                { form.clientErrors.password && <span> { form.clientErrors.password } </span> }
                <br />

                <input type="submit" /> 
            </form>

            <Link to="/register">Create an account</Link>
        </div>
    )
}
*/
import axios from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import API_BASE_URL from '../config/axios';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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

                handleLogin(userResponse.data);
                resetForm();
                toast.success('Login Success', {
                    autoClose: 1000,
                    onClose: () => {
                        navigate('/loan-list');
                    },
                });
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
        <section className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#007bff' }}>
            <div className="container py-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-6">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-4 text-center">
                                <div className="mb-4 pb-4">
                                    <h2 className="fw-bold mb-3 text-uppercase">Login</h2>
                                    <p className="text-white-50 mb-3">Please enter your login and password!</p>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                id="identifier"
                                                name="identifier"
                                                onChange={formik.handleChange}
                                                value={formik.values.identifier}
                                                className="form-control form-control-lg"
                                                placeholder="Email, Username, or Phone"
                                            />
                                            {formik.touched.identifier && formik.errors.identifier && (
                                                <p className="text-danger mt-1 mb-0">{formik.errors.identifier}</p>
                                            )}
                                            {serverError.includes('Email, Username, or Phone is required') && (
                                                <p className="text-danger mt-1 mb-0">Email, Username, or Phone is required</p>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                onChange={formik.handleChange}
                                                value={formik.values.password}
                                                className="form-control form-control-lg"
                                                placeholder="Password"
                                            />
                                            {formik.touched.password && formik.errors.password && (
                                                <p className="text-danger mt-1 mb-0">{formik.errors.password}</p>
                                            )}
                                            {serverError.includes('Password is required') && (
                                                <p className="text-danger mt-1 mb-0">Password is required</p>
                                            )}
                                        </div>
                                        {serverError.length > 0 && (
                                            <p className="text-danger mt-2 mb-0">{serverError.join(', ')}</p>
                                        )}
                                        <button className="btn btn-outline-light btn-lg px-4 mt-3" type="submit" disabled={formik.isSubmitting}>
                                            Login
                                        </button>
                                    </form>
                                    <p className="small mt-3 mb-0">
                                        <Link className="text-white-50" onClick={toggle}>Forgot password?</Link>
                                    </p>
                                </div>
                                <div>
                                    <p className="mb-0">Don't have an account? <Link to="/register" className="text-white-50 fw-bold">Sign Up</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Forgot Password</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmitForgotPassword}>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Email to reset Password"
                            value={forgotEmail}
                            onChange={handleInputChange}
                        />
                        {forgotEmailError && (
                            <p className="text-danger mt-2 mb-0">{forgotEmailError}</p>
                        )}
                        {error && (
                            <p className="text-danger mt-2 mb-0">{error}</p>
                        )}
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="primary" onClick={handleSubmitForgotPassword} className="mt-2">
                        Submit
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </section>
    );
}