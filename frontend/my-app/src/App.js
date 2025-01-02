/*
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import axios from 'axios';
import { useAuth } from './context/AuthContext';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toast styles
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Account from './components/Account';
import BusForm from './components/BusForm'; // Import BusForm
import BusList from './components/BusList'; // Import BusList
import BusDashboard from './components/UserDashboard'; // Search form
import UserBusList from './components/UserBusList'; // User bus list
import PrivateRoute from './components/PrivateRoute';
import TripContainer from './components/TripContainer';
import ResetPassword from './components/ResetPassword';
import VerificationProgress from './components/VerificationProgress';
import AdminDashboard from './components/AdminDashboard';
import FailurePage from './components/Failure';
import SuccessPage from './components/Success';
import Payment from './components/Payment';
import PaymentList from './components/PaymentList';
import TicketDetails from './components/TicketDetails';
import SeatSelection from './components/SeatSelections';
import TripForm from './components/TripForm'; // Import TripForm
import TripList from './components/TripList'; // Import TripList

const App = () => {
    const { user, dispatch } = useAuth();
    const email = useSelector((state) => state.forgot.email);
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            (async () => {
                try {
                    const response = await axios.get('http://localhost:4000/users/account', {
                        headers: {
                            Authorization: localStorage.getItem('token'),
                        },
                    });
                    dispatch({ type: 'LOGIN', payload: { account: response.data } });
                } catch (error) {
                    console.error('Error fetching account data:', error.response || error.message);
                }
            })();
        }
    }, [dispatch]);

    const conditionalLinks = (path, roles) => {
        if (roles.includes(user?.account?.role)) {
            const formattedLink = path
                .split('/')[1]
                .replace('-', ' ')
                .replace(/^\w/, (c) => c.toUpperCase());
            return <Link to={path}>{formattedLink}</Link>;
        }
        return null;
    };

    return (
        <Provider store={store}>
            <div className="App">
                <ToastContainer /> 
                <h2>RedBus Clone</h2>
                <nav>
                    <Link to="/">Home</Link> |
                    {!user.isLoggedIn ? (
                        <>
                            <Link to="/register">Register</Link> |
                            <Link to="/login"> Login </Link> | 
                        </>
                    ) : (
                      <>
                      <Link to="/account">Account</Link>
                      {conditionalLinks('/admin-dashboard', ['admin']) && <> | {conditionalLinks('/admin-dashboard', ['admin'])}</>}
                      {conditionalLinks('/bus-form', ['operator']) && <> | {conditionalLinks('/bus-form', ['operator'])}</>}
                      {conditionalLinks('/bus-list', ['operator']) && <> | {conditionalLinks('/bus-list', ['operator'])}</>}
                      {conditionalLinks('/trip-form', ['operator']) && <> | {conditionalLinks('/trip-form', ['operator'])}</>}
                      {conditionalLinks('/trip-list', ['operator']) && <> | {conditionalLinks('/trip-list', ['operator'])}</>}
                      {conditionalLinks('/search', ['user']) && <> | {conditionalLinks('/search', ['user'])}</>}
                      {conditionalLinks('/tickets', ['user']) && <> | {conditionalLinks('/tickets', ['user'])}</>}
                      {conditionalLinks('/payment-list', ['operator']) && <> | {conditionalLinks('/payment-list', ['operator'])}</>}
                      |
                      <Link
                        to="/"
                        onClick={() => {
                          localStorage.removeItem('token');
                          dispatch({ type: 'LOGOUT' });
                        }}
                      >
                        Logout
                      </Link>
                    </>
                    )}
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/verification-progress" element={<VerificationProgress />} />
                    {email.length > 0 && <Route path="/reset-password" element={<ResetPassword />} />}
                    
                    
                    <Route
                        path="/search"
                        element={
                            <PrivateRoute permittedRoles={['user']}>
                                <BusDashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/buses"
                        element={
                            <PrivateRoute permittedRoles={['user']}>
                                <UserBusList />
                            </PrivateRoute>
                        }
                    />
                   
                    
                    <Route
                        path="/account"
                        element={
                            <PrivateRoute permittedRoles={['operator', 'user']}>
                                <Account />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/bus-form"
                        element={
                            <PrivateRoute permittedRoles={['operator']}>
                                <BusForm />
                                
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/bus-list"
                        element={
                            <PrivateRoute permittedRoles={['operator']}>
                                
                                <BusList />
                            </PrivateRoute>
                        }
                    />
                        <Route
                        path="/trip-form"
                        element={
                            <PrivateRoute permittedRoles={['operator']}>
                                <TripForm />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/trip-list"
                        element={
                            <PrivateRoute permittedRoles={['operator']}>
                                <TripList />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin-dashboard"
                        element={
                            <PrivateRoute permittedRoles={['admin']}>
                                <AdminDashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/payment"
                        element={
                            <PrivateRoute permittedRoles={['user']}>
                                <Payment />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/payment-list"
                        element={
                            <PrivateRoute permittedRoles={['operator']}>
                                <PaymentList />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/tickets"
                        element={
                            <PrivateRoute permittedRoles={['user']}>
                                <TicketDetails />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/success" element={<SuccessPage />} />
                    <Route path="/cancel" element={<FailurePage />} />
                </Routes>
            </div>
        </Provider>
    );
};

export default App;
*/

import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import axios from 'axios';
import { useAuth } from './context/AuthContext';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Account from './components/Account';
import BusForm from './components/BusForm';
import BusList from './components/BusList';
import BusDashboard from './components/UserDashboard';
import UserBusList from './components/UserBusList';
import PrivateRoute from './components/PrivateRoute';
import TripContainer from './components/TripContainer';
import ResetPassword from './components/ResetPassword';
import VerificationProgress from './components/VerificationProgress';
import AdminDashboard from './components/AdminDashboard';
import FailurePage from './components/Failure';
import SuccessPage from './components/Success';
import Payment from './components/Payment';
import PaymentList from './components/PaymentList';
import TicketDetails from './components/TicketDetails';
import SeatSelection from './components/SeatSelections';
import TripForm from './components/TripForm';
import TripList from './components/TripList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Primary color (blue)
    },
    secondary: {
      main: '#d32f2f', // Secondary color (red)
    },
    background: {
      default: '#f4f4f4', // Light gray background
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h6: {
      fontWeight: 500,
    },
  },
});

const App = () => {
  const { user, dispatch } = useAuth();
  const email = useSelector((state) => state.forgot.email);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      (async () => {
        try {
          const response = await axios.get('http://localhost:4000/users/account', {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          });
          dispatch({ type: 'LOGIN', payload: { account: response.data } });
        } catch (error) {
          console.error('Error fetching account data:', error.response || error.message);
        }
      })();
    }
  }, [dispatch]);

  const conditionalLinks = (path, roles) => {
    if (roles.includes(user?.account?.role)) {
      const formattedLink = path
        .split('/')[1]
        .replace('-', ' ')
        .replace(/^\w/, (c) => c.toUpperCase());
      return (
        <Button color="inherit" component={Link} to={path} key={path}>
          {formattedLink}
        </Button>
      );
    }
    return null;
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
  <img 
    src="https://res.cloudinary.com/dl19ckfpt/image/upload/v1735812664/8544bed8-b833-4b00-aea7-d020e2c61130_uxyvt4.webp" 
    alt="Logo" 
    style={{ width: '30px', height: '30px', marginRight: '8px' }} 
  />
  Bus Ticket
</Typography>

              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              {!user?.isLoggedIn ? (
                <>
                  <Button color="inherit" component={Link} to="/register">
                    Register
                  </Button>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/account">
                    Account
                  </Button>
                  {conditionalLinks('/admin-dashboard', ['admin'])}
                  {conditionalLinks('/bus-form', ['operator'])}
                  {conditionalLinks('/bus-list', ['operator'])}
                  {conditionalLinks('/trip-form', ['operator'])}
                  {conditionalLinks('/trip-list', ['operator'])}
                  {conditionalLinks('/search', ['user'])}
                  {conditionalLinks('/tickets', ['user'])}
                  {conditionalLinks('/payment-list', ['operator'])}
                  <Button
                    color="inherit"
                    onClick={() => {
                      localStorage.removeItem('token');
                      dispatch({ type: 'LOGOUT' });
                      navigate('/');
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}
            </Toolbar>
          </AppBar>
        </Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verification-progress" element={<VerificationProgress />} />
          {email.length > 0 && <Route path="/reset-password" element={<ResetPassword />} />}
          <Route
            path="/search"
            element={
              <PrivateRoute permittedRoles={['user']}>
                <BusDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/buses"
            element={
              <PrivateRoute permittedRoles={['user']}>
                <UserBusList />
              </PrivateRoute>
            }
          />
          <Route
            path="/account"
            element={
              <PrivateRoute permittedRoles={['operator', 'user']}>
                <Account />
              </PrivateRoute>
            }
          />
          <Route
            path="/bus-form"
            element={
              <PrivateRoute permittedRoles={['operator']}>
                <BusForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/bus-list"
            element={
              <PrivateRoute permittedRoles={['operator']}>
                <BusList />
              </PrivateRoute>
            }
          />
          <Route
            path="/trip-form"
            element={
              <PrivateRoute permittedRoles={['operator']}>
                <TripForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/trip-list"
            element={
              <PrivateRoute permittedRoles={['operator']}>
                <TripList />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute permittedRoles={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <PrivateRoute permittedRoles={['user']}>
                <Payment />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment-list"
            element={
              <PrivateRoute permittedRoles={['operator']}>
                <PaymentList />
              </PrivateRoute>
            }
          />
          <Route
            path="/tickets"
            element={
              <PrivateRoute permittedRoles={['user']}>
                <TicketDetails />
              </PrivateRoute>
            }
          />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<FailurePage />} />
        </Routes>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
