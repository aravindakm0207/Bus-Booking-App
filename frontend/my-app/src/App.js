/*
mport React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BusForm from "./components/BusForm";
import BusList from "./components/BusList";

function App() {
  return (
    <Router>
      <div className="container mt-3">
        <h1>BUS APP</h1>
        <Routes>
          <Route path="/" element={<BusList />} />
          <Route path="/add-bus" element={<BusForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BusOperatorContainer from "./components/BusOperatorContainer";
function App() {
  

  return (
    <div className="container">
      <h2>Exp App (redux) </h2>
      <div className="row">
        <BusOperatorContainer />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;



import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/configureStore';
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Account from './components/Account';
import BusContainer from './components/BusContainer';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';
import { useEffect } from 'react';
const { user, dispatch} = useAuth() 

const App = () => {
  const conditionalLinks = (path, roles) => {
    switch(path) {
      case '/add-bus' : {
        if(roles.includes(user?.account?.role)) {
          return <Link to={path}>Add Bus</Link>
        }
      }
    }
  }

  useEffect(() => {
    if(localStorage.getItem('token'))  {
      (async () => {
        console.log('app use effect')
        const response = await axios.get('http://localhost:4000/users/account', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        console.log(response.data)
        setTimeout(() => {
          dispatch({ type: 'LOGIN', payload: { account: response.data } })       
        }, 3000)
      })();
    }
  }, [])
    return (
        <Provider store={store}>
            <div className="App">
                <nav>
                    <Link to="/">Home</Link> |
                    <Link to="/register">Register</Link> |
                    <Link to="/login">Login</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
                <BusContainer />
            </div>
        </Provider>
    );
};

export default App;






import React, { useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/configureStore';
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Account from './components/Account';
import BusContainer from './components/BusContainer';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';
import axios from 'axios';

const App = () => {
  const { user, dispatch } = useAuth();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      (async () => {
        console.log('app use effect');
        const response = await axios.get('http://localhost:4000/users/account', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        console.log(response.data);
        setTimeout(() => {
          dispatch({ type: 'LOGIN', payload: { account: response.data } });
        }, 3000);
      })();
    }
  }, [dispatch]);

  const conditionalLinks = (path, roles) => {
    switch (path) {
      case '/bus-container': {
        if (roles.includes(user?.account?.role)) {
          return <Link to={path}>Bus Management</Link>;
        }
        break;
      }
      default:
        return null;
    }
  };

  return (
    <Provider store={store}>
      <div className="App">
        <h2>RedBus Clone</h2>
        <nav>
          <Link to="/">Home</Link> |
          <Link to="/register">Register</Link> |
          <Link to="/login">Login</Link> |
          {user.isLoggedIn && (
            <>
              <Link to="/account">Account</Link> |
              {conditionalLinks('/bus-container', ['operator'])}
              <Link to="/" onClick={() => {
                localStorage.removeItem('token');
                dispatch({ type: 'LOGOUT' });
              }}>Logout</Link>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={
            <PrivateRoute permittedRoles={['operator', 'user']}>
              <Account />
            </PrivateRoute>
          } />
          <Route path="/bus-container" element={
            <PrivateRoute permittedRoles={['operator']}>
              <BusContainer />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;







import React, { useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/configureStore';
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Account from './components/Account';
import BusContainer from './components/BusContainer';
import UserDashboard from './components/UserDashboard';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';
import axios from 'axios';

const App = () => {
  const { user, dispatch } = useAuth();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      (async () => {
        console.log('app use effect');
        const response = await axios.get('http://localhost:4000/users/account', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        console.log(response.data);
        setTimeout(() => {
          dispatch({ type: 'LOGIN', payload: { account: response.data } });
        }, 3000);
      })();
    }
  }, [dispatch]);

  const conditionalLinks = (path, roles) => {
    switch (path) {
      case '/bus-container': {
        if (roles.includes(user?.account?.role)) {
          return <Link to={path}>Bus Management</Link>;
        }
        break;
      }
      case '/user-dashboard': {
        if (roles.includes(user?.account?.role)) {
          return <Link to={path}>User Dashboard</Link>;
        }
        break;
      }
      default:
        return null;
    }
  };

  return (
    <Provider store={store}>
      <div className="App">
        <h2>RedBus Clone</h2>
        <nav>
          <Link to="/">Home</Link> |
          <Link to="/register">Register</Link> |
          <Link to="/login">Login</Link> |
          {user.isLoggedIn && (
            <>
              <Link to="/account">Account</Link> |
              {conditionalLinks('/bus-container', ['operator'])} |
              {conditionalLinks('/user-dashboard', ['user'])}
              <Link to="/" onClick={() => {
                localStorage.removeItem('token');
                dispatch({ type: 'LOGOUT' });
              }}>Logout</Link>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={
            <PrivateRoute permittedRoles={['operator', 'user']}>
              <Account />
            </PrivateRoute>
          } />
          <Route path="/bus-container" element={
            <PrivateRoute permittedRoles={['operator']}>
              <BusContainer />
            </PrivateRoute>
          } />
          <Route path="/user-dashboard" element={
            <PrivateRoute permittedRoles={['user']}>
              <UserDashboard />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;



import React, { useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/configureStore';
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Account from './components/Account';
import BusContainer from './components/BusContainer';
import UserBusContainer from './components/UserBusContainer';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';
import axios from 'axios';
import TripContainer from './components/TripContainer'; // Import TripContainer

const App = () => {
  const { user, dispatch } = useAuth();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      (async () => {
        console.log('app use effect');
        const response = await axios.get('http://localhost:4000/users/account', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        console.log(response.data);
        setTimeout(() => {
          dispatch({ type: 'LOGIN', payload: { account: response.data } });
        }, 3000);
      })();
    }
  }, [dispatch]);

  const conditionalLinks = (path, roles) => {
    switch (path) {
      case '/bus-container': {
        if (roles.includes(user?.account?.role)) {
          return <Link to={path}>Bus Management</Link>;
        }
        break;
      }
      case '/user-dashboard': {
        if (roles.includes(user?.account?.role)) {
          return <Link to={path}>User Dashboard</Link>;
        }
        break;
      }
      case '/trip-container': {  // Add a conditional link for trip management
        if (roles.includes('operator')) {
          return <Link to={path}>Trip Management</Link>;
        }
        break;
      }
      default:
        return null;
    }
  };

  return (
    <Provider store={store}>
      <div className="App">
        <h2>RedBus Clone</h2>
        <nav>
          <Link to="/">Home</Link> |
          <Link to="/register">Register</Link> |
          <Link to="/login">Login</Link> |
          {user.isLoggedIn && (
            <>
              <Link to="/account">Account</Link> |
              {conditionalLinks('/bus-container', ['operator'])} |
              {conditionalLinks('/trip-container', ['operator'])} | 
              {conditionalLinks('/user-dashboard', ['user'])}
              <Link to="/" onClick={() => {
                localStorage.removeItem('token');
                dispatch({ type: 'LOGOUT' });
              }}>Logout</Link>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={
            <PrivateRoute permittedRoles={['operator', 'user']}>
              <Account />
            </PrivateRoute>
          } />
          <Route path="/bus-container" element={
            <PrivateRoute permittedRoles={['operator']}>
              <BusContainer />
            </PrivateRoute>
          } />
          <Route path="/trip-container" element={ // Add route for TripContainer
            <PrivateRoute permittedRoles={['operator']}>
              <TripContainer />
            </PrivateRoute>
          } />
          <Route path="/user-dashboard" element={
    <PrivateRoute permittedRoles={['user']}>
        <UserBusContainer />
    </PrivateRoute>
} />


        </Routes>
      </div>
    </Provider>
  );
};

export default App;
*/


import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/configureStore';
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Account from './components/Account';
import BusContainer from './components/BusContainer';
import UserBusContainer from './components/UserBusContainer';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';
import axios from 'axios';
import TripContainer from './components/TripContainer';
import ResetPassword from './components/ResetPassword';
import VerificationProgress from './components/VerificationProgress';
import AdminDashboard from './components/AdminDashboard';
import { useSelector } from 'react-redux';

const App = () => {
  const { user, dispatch } = useAuth();
  const email = useSelector((state) => state.forgot.email);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      (async () => {
        try {
          const response = await axios.get('http://localhost:4000/users/account', {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          });
          setTimeout(() => {
            dispatch({ type: 'LOGIN', payload: { account: response.data } });
          }, 3000);
        } catch (error) {
          console.error("Error fetching account data:", error.response || error.message);
        }
      })();
    }
  }, [dispatch]);

  const conditionalLinks = (path, roles) => {
    if (roles.includes(user?.account?.role)) {
      return (
        <Link to={path}>
          {path === '/trip-container'
            ? 'Trip Management'
            : path.split('/')[1].replace('-', ' ').replace(/^\w/, (c) => c.toUpperCase())}
        </Link>
      );
    }
    return null;
  };

  return (
    <Provider store={store}>
      <div className="App">
        <h2>RedBus Clone</h2>
        <nav>
          <Link to="/">Home</Link> |
          <Link to="/register">Register</Link> |
          <Link to="/login">Login</Link> |
          {user?.isLoggedIn && (
            <>
              <Link to="/account">Account</Link> |
              {conditionalLinks('/bus-container', ['operator'])} |
              {conditionalLinks('/trip-container', ['operator'])} |
              {conditionalLinks('/user-dashboard', ['user'])} |
              {conditionalLinks('/admin-dashboard', ['admin'])} |
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
          <Route
            path="/account"
            element={
              <PrivateRoute permittedRoles={['operator', 'user']}>
                <Account />
              </PrivateRoute>
            }
          />
          <Route
            path="/bus-container"
            element={
              <PrivateRoute permittedRoles={['operator']}>
                <BusContainer />
              </PrivateRoute>
            }
          />
          <Route
            path="/trip-container"
            element={
              <PrivateRoute permittedRoles={['operator']}>
                <TripContainer />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <PrivateRoute permittedRoles={['user']}>
                <UserBusContainer />
              </PrivateRoute>
            }
          />
          <Route path="/verification-progress" element={<VerificationProgress />} />
          {email.length > 0 && <Route path="/reset-password" element={<ResetPassword />} />}
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute permittedRoles={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
