/*
import {
    FETCH_TRIPS_REQUEST,
    FETCH_TRIPS_SUCCESS,
    FETCH_TRIPS_FAILURE,
    ADD_TRIP_SUCCESS,
    ADD_TRIP_FAILURE
} from '../actions/tripActions';  // Import action types

const initialState = {
    loading: false,
    trips: [],     // Array to store all fetched trips
    error: null,   // To store any errors
    tripAdded: false  // To track if a trip was successfully added
};

const tripReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRIPS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_TRIPS_SUCCESS:
            return {
                ...state,
                loading: false,
                trips: action.payload,  // Save fetched trips
                error: null
            };
        case FETCH_TRIPS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload  // Store the error message
            };
        case ADD_TRIP_SUCCESS:
            return {
                ...state,
                loading: false,
                trips: [...state.trips, ...action.payload],  // Add the new trip(s) to the trips array
                tripAdded: true,
                error: null
            };
        case ADD_TRIP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload  // Store the error for failed trip creation
            };
        default:
            return state;
    }
};

export default tripReducer;
*/
import {
    FETCH_TRIPS_REQUEST,
    FETCH_TRIPS_SUCCESS,
    FETCH_TRIPS_FAILURE,
    ADD_TRIP_SUCCESS,
    ADD_TRIP_FAILURE,
    SEARCH_TRIPS_REQUEST,
    SEARCH_TRIPS_SUCCESS,
    SEARCH_TRIPS_FAILURE,
    FETCH_SEAT_LAYOUT_REQUEST,
    FETCH_SEAT_LAYOUT_SUCCESS,
    FETCH_SEAT_LAYOUT_FAILURE,
    UPDATE_TRIP_SUCCESS,
    UPDATE_TRIP_FAILURE,
    DELETE_TRIP_SUCCESS,
    DELETE_TRIP_FAILURE
} from '../actions/tripActions';

const initialState = {
    loading: false,
    trips: [],
    seatLayout: null,
    error: ''
};

const tripReducer = (state = initialState, action) => {
    switch (action.type) {
        // Fetch trips
        case FETCH_TRIPS_REQUEST:
            return {
                ...state,
                loading: true,
                error:null
            };
        case FETCH_TRIPS_SUCCESS:
            return {
                ...state,
                loading: false,
                trips: action.payload,
                error: ''
            };
        case FETCH_TRIPS_FAILURE:
            return {
                ...state,
                loading: false,
                trips: [],
                error: action.payload
            };

        // Add trip
        case ADD_TRIP_SUCCESS:
            return {
                ...state,
                trips: [...state.trips, action.payload],
                error: ''
            };
        case ADD_TRIP_FAILURE:
            return {
                ...state,
                error: action.payload
            };

        // Search trips
        case SEARCH_TRIPS_REQUEST:
            return {
                ...state,
                loading: true,
                error: '' // Clear previous errors on new search
            };
        case SEARCH_TRIPS_SUCCESS:
            return {
                ...state,
                loading: false,
                trips: action.payload, // Save fetched trips
                error: ''
            };
        case SEARCH_TRIPS_FAILURE:
            return {
                ...state,
                loading: false,
                trips: [], // Clear trips on failure
                error: action.payload // Store error message
            };

        // Fetch seat layout
        case FETCH_SEAT_LAYOUT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_SEAT_LAYOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                seatLayout: action.payload,
                error: ''
            };
        case FETCH_SEAT_LAYOUT_FAILURE:
            return {
                ...state,
                loading: false,
                seatLayout: null,
                error: action.payload
            };

        // Update trip
        case UPDATE_TRIP_SUCCESS:
            return {
                ...state,
                trips: state.trips.map(trip => 
                    trip._id === action.payload._id ? action.payload : trip
                ),
                error: ''
            };
        case UPDATE_TRIP_FAILURE:
            return {
                ...state,
                error: action.payload
            };

        // Delete trip
        case DELETE_TRIP_SUCCESS:
            return {
                ...state,
                trips: state.trips.filter(trip => trip._id !== action.payload),
                error: ''
            };
        case DELETE_TRIP_FAILURE:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
};

export default tripReducer;
