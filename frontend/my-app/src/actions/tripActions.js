/*
// tripActions.js
import axios from 'axios';

// Action Types
export const FETCH_TRIPS_REQUEST = 'FETCH_TRIPS_REQUEST';
export const FETCH_TRIPS_SUCCESS = 'FETCH_TRIPS_SUCCESS';
export const FETCH_TRIPS_FAILURE = 'FETCH_TRIPS_FAILURE';
export const ADD_TRIP_SUCCESS = 'ADD_TRIP_SUCCESS';
export const ADD_TRIP_FAILURE = 'ADD_TRIP_FAILURE';
export const SEARCH_TRIPS_REQUEST = 'SEARCH_TRIPS_REQUEST';
export const SEARCH_TRIPS_SUCCESS = 'SEARCH_TRIPS_SUCCESS';
export const SEARCH_TRIPS_FAILURE = 'SEARCH_TRIPS_FAILURE';


// Fetch trips for a specific bus
export const fetchTrips = () => async (dispatch) => {
    dispatch({ type: FETCH_TRIPS_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/api/trips', {
            headers: { Authorization: token }
        });
        dispatch({ type: FETCH_TRIPS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_TRIPS_FAILURE, payload: error.message });
    }
};


// Add a new trip
export const addTrip = (tripData) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
            'http://localhost:4000/api/trips',
            tripData,
            {
                headers: {
                    Authorization: token
                }
            }
        );
        dispatch({ type: ADD_TRIP_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: ADD_TRIP_FAILURE, payload: error.message });
    }
};


// Search for trips
export const searchTrips = (searchCriteria) => async (dispatch) => {
    dispatch({ type: SEARCH_TRIPS_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/api/trips', {
            headers: { Authorization: token },
            params: searchCriteria // Pass the search criteria as query parameters
        });
        dispatch({ type: SEARCH_TRIPS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: SEARCH_TRIPS_FAILURE, payload: error.message });
    }
};
*/

import axios from 'axios';

// Action Types
export const FETCH_TRIPS_REQUEST = 'FETCH_TRIPS_REQUEST';
export const FETCH_TRIPS_SUCCESS = 'FETCH_TRIPS_SUCCESS';
export const FETCH_TRIPS_FAILURE = 'FETCH_TRIPS_FAILURE';

export const ADD_TRIP_SUCCESS = 'ADD_TRIP_SUCCESS';
export const ADD_TRIP_FAILURE = 'ADD_TRIP_FAILURE';

export const SEARCH_TRIPS_REQUEST = 'SEARCH_TRIPS_REQUEST';
export const SEARCH_TRIPS_SUCCESS = 'SEARCH_TRIPS_SUCCESS';
export const SEARCH_TRIPS_FAILURE = 'SEARCH_TRIPS_FAILURE';

export const FETCH_SEAT_LAYOUT_REQUEST = 'FETCH_SEAT_LAYOUT_REQUEST';
export const FETCH_SEAT_LAYOUT_SUCCESS = 'FETCH_SEAT_LAYOUT_SUCCESS';
export const FETCH_SEAT_LAYOUT_FAILURE = 'FETCH_SEAT_LAYOUT_FAILURE';

export const UPDATE_TRIP_SUCCESS = 'UPDATE_TRIP_SUCCESS';
export const UPDATE_TRIP_FAILURE = 'UPDATE_TRIP_FAILURE';

export const DELETE_TRIP_SUCCESS = 'DELETE_TRIP_SUCCESS';
export const DELETE_TRIP_FAILURE = 'DELETE_TRIP_FAILURE';

// Fetch all trips for the operator
export const fetchTrips = () => async (dispatch) => {
    dispatch({ type: FETCH_TRIPS_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/api/trips', {
            headers: { Authorization: token }
        });
        dispatch({ type: FETCH_TRIPS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_TRIPS_FAILURE, payload: error.message });
    }
};

// Fetch trips for a specific bus (Operator)
export const fetchTripsByBus = (busId) => async (dispatch) => {
    dispatch({ type: FETCH_TRIPS_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:4000/api/trips?busId=${busId}`, {
            headers: { Authorization: token }
        });
        dispatch({ type: FETCH_TRIPS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_TRIPS_FAILURE, payload: error.message });
    }
};

// Add a new trip (Operator)
export const addTrip = (tripData) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
            'http://localhost:4000/api/trips',
            tripData,
            {
                headers: {
                    Authorization: token
                }
            }
        );
        dispatch({ type: ADD_TRIP_SUCCESS, payload: response.data });
        return response;
    } catch (error) {
        dispatch({ type: ADD_TRIP_FAILURE, payload: error.message });
    }
};

// Search for trips (Users)

export const searchTrips = (form) => async (dispatch) => {
    dispatch({ type: SEARCH_TRIPS_REQUEST });
    console.log('Dispatching search trips with:', form);

    try {
        // Format the date as 'YYYY-MM-DD' (no time)
        const formattedDate = new Date(form.date).toISOString().split('T')[0]; 

        const response = await axios.get('http://localhost:4000/api/search', {
            params: {
                from: form.from,
                to: form.to,
                date: formattedDate,  // Send only the date part
            },
        });

        console.log('Trips search response:', response.data);
        dispatch({ type: SEARCH_TRIPS_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Trips search error:', error.message);
        dispatch({ type: SEARCH_TRIPS_FAILURE, payload: error.message });
    }
};




// Fetch seat layout for a specific trip
/*export const fetchSeatLayout = (tripId) => async (dispatch) => {
    dispatch({ type: FETCH_SEAT_LAYOUT_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:4000/api/trips/${tripId}/seat-layout`, {
            headers: { Authorization: token }
        });
        dispatch({ type: FETCH_SEAT_LAYOUT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_SEAT_LAYOUT_FAILURE, payload: error.message });
    }
};*/

// Update a trip (for operator)
export const updateTrip = (tripId, tripData) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
            `http://localhost:4000/api/trips/${tripId}`,
            tripData,
            {
                headers: {
                    Authorization: token
                }
            }
        );
        dispatch({ type: UPDATE_TRIP_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_TRIP_FAILURE, payload: error.message });
    }
};

// Delete a trip (for operator)
export const deleteTrip = (tripId) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:4000/api/trips/${tripId}`, {
            headers: {
                Authorization: token
            }
        });
        dispatch({ type: DELETE_TRIP_SUCCESS, payload: tripId });
    } catch (error) {
        dispatch({ type: DELETE_TRIP_FAILURE, payload: error.message });
    }
};
