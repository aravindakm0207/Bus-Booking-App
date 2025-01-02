
/*
import React, { createContext, useReducer, useContext } from 'react';

const AuthContext = createContext();

const initialState = {
  user: {
    account: null,
    isLoggedIn: false, // Default to false
  },
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: {
          account: action.payload.account,
          isLoggedIn: true,
        },
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
*/
import React, { createContext, useReducer, useContext } from 'react';

const AuthContext = createContext();

const initialState = {
  user: {
    account: null,
    isLoggedIn: false,
  },
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: {
          account: action.payload.account,
          isLoggedIn: true,
        },
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const handleLogin = (account) => {
    dispatch({
      type: 'LOGIN',
      payload: { account },
    });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, dispatch, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

