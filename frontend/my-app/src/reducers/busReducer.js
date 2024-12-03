/*const initialState = {
    data: [],
    editBusId: null,
    showBusId: null,
  };
  
  const busReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_BUSES':
        return { ...state, data: action.payload };
      case 'REMOVE_BUS':
        return { ...state, data: state.data.filter((bus) => bus._id !== action.payload) };
      case 'SET_EDIT_BUS_ID':
        return { ...state, editBusId: action.payload };
      case 'SET_SHOW_BUS_ID':
        return { ...state, showBusId: action.payload };
      default:
        return state;
    }
  };
  
  export default busReducer;
  

  import { ADD_BUS, UPDATE_BUS, DELETE_BUS, FETCH_BUSES, FETCH_BUSES_ERROR } from '../actions/busActions';

const initialState = {
    buses: [],
    error: null
};

const busReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BUSES:
            return {
                ...state,
                buses: action.payload,
                error: null
            };
        case ADD_BUS:
            return {
                ...state,
                buses: [...state.buses, action.payload],
                error: null
            };
        case UPDATE_BUS:
            return {
                ...state,
                buses: state.buses.map(bus => bus._id === action.payload._id ? action.payload : bus),
                error: null
            };
        case DELETE_BUS:
            return {
                ...state,
                buses: state.buses.filter(bus => bus._id !== action.payload),
                error: null
            };
        case FETCH_BUSES_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default busReducer;
*/



// src/redux/reducer.js
import {
    FETCH_BUSES_REQUEST,
    FETCH_BUSES_SUCCESS,
    FETCH_BUSES_FAILURE,
    ADD_BUS_SUCCESS,
    UPDATE_BUS_SUCCESS,
    DELETE_BUS_SUCCESS,
    FETCH_USER_BUSES_REQUEST
  } from '../actions/busActions';
  
  const initialState = {
    loading: false,
    buses: [],
    error: ''
  };
  
  const busReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BUSES_REQUEST:
      case FETCH_USER_BUSES_REQUEST:
        return {
          ...state,
          loading: true
        };
      case FETCH_BUSES_SUCCESS:
        return {
          loading: false,
          buses: action.payload,
          error: ''
        };
      case FETCH_BUSES_FAILURE:
        return {
          loading: false,
          buses: [],
          error: action.payload
        };
      case ADD_BUS_SUCCESS:
        return {
          ...state,
          buses: [...state.buses, action.payload]
        };
     
      case UPDATE_BUS_SUCCESS:
        return {
          ...state,
          buses: state.buses.map(bus =>
            bus._id === action.payload._id ? action.payload : bus
          )
        };
      case DELETE_BUS_SUCCESS:
        return {
          ...state,
          buses: state.buses.filter(bus => bus._id !== action.payload)
        };
      default:
        return state;
    }
  };
  
  export default busReducer;
  