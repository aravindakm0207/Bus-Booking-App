/*
import axios from 'axios';

export const FETCH_BUSES_REQUEST = 'FETCH_BUSES_REQUEST';
export const FETCH_USER_BUSES_REQUEST = 'FETCH_USER_BUSES_REQUEST';
export const FETCH_BUSES_SUCCESS = 'FETCH_BUSES_SUCCESS';
export const FETCH_BUSES_FAILURE = 'FETCH_BUSES_FAILURE';
export const ADD_BUS_SUCCESS = 'ADD_BUS_SUCCESS';
export const SEARCH_BUSES_SUCCESS = 'SEARCH_BUSES_SUCCESS';

export const fetchBusesRequest = (buses) => ({
    type: FETCH_BUSES_REQUEST
});

export const fetchBusesSuccess = (buses) => ({
    type: FETCH_BUSES_SUCCESS,
    payload: buses
});

export const fetchBusesFailure = (error) => ({
    type: FETCH_BUSES_FAILURE,
    payload: error
});

export const addBusSuccess = (bus) => ({
    type: ADD_BUS_SUCCESS,
    payload: bus
});

export const fetchUserBusesRequest = () => ({
    type: FETCH_USER_BUSES_REQUEST
});

export const fetchUserBusesSuccess = (buses) => ({
    type: FETCH_BUSES_SUCCESS,
    payload: buses
});



export const fetchBuses = () => {
    return async (dispatch) => {
        dispatch(fetchBusesRequest());
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:4000/api/buses', {
                headers: {
                    Authorization: token // Ensure the token is being sent correctly
                }
            });
            dispatch(fetchBusesSuccess(response.data));
        } catch (error) {
            dispatch(fetchBusesFailure(error.message));
        }
    };
};


export const addBus = (busData) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:4000/api/buses',
                busData,
                {
                   headers: {
                      Authorization: token // Ensure the token is being sent correctly
                    }
                }
            );
            dispatch(addBusSuccess(response.data));
        } catch (error) {
            console.error(error);
        }
    };
};


export const fetchUserBuses = () => async (dispatch) => {
    dispatch(fetchUserBusesRequest());
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/api/buseslist', {
            headers: {
                Authorization: token // Ensure the token is being sent correctly
            }
        });
        dispatch(fetchUserBusesSuccess(response.data));
    } catch (error) {
        dispatch(fetchBusesFailure(error.message));
    }
};

export const searchBuses = (form) => async (dispatch) => {
    dispatch(fetchUserBusesRequest());
    try {
        const response = await axios.get(`http://localhost:4000/api/search`, {
            params: {
                from: form.from,
                to: form.to,
                date: form.date,
            },
        });
        dispatch({ type: SEARCH_BUSES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch(fetchBusesFailure(error.message));
    }
};
*/

import axios from 'axios';

export const FETCH_BUSES_REQUEST = 'FETCH_BUSES_REQUEST';
export const FETCH_USER_BUSES_REQUEST = 'FETCH_USER_BUSES_REQUEST';
export const FETCH_BUSES_SUCCESS = 'FETCH_BUSES_SUCCESS';
export const FETCH_BUSES_FAILURE = 'FETCH_BUSES_FAILURE';
export const ADD_BUS_SUCCESS = 'ADD_BUS_SUCCESS';
export const SEARCH_BUSES_SUCCESS = 'SEARCH_BUSES_SUCCESS';
export const FETCH_SEAT_LAYOUT_SUCCESS='FETCH_SEAT_LAYOUT_SUCCESS';
export const FETCH_SEAT_LAYOUT_FAIL='FETCH_SEAT_LAYOUT_FAIL'


// Action Types
export const UPDATE_BUS_SUCCESS = 'UPDATE_BUS_SUCCESS';
export const DELETE_BUS_SUCCESS = 'DELETE_BUS_SUCCESS';

// Update Bus Action
export const updateBusSuccess = (bus) => ({
    type: UPDATE_BUS_SUCCESS,
    payload: bus
});

export const updateBus = (busId, busData) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            const response = await axios.put(
                `http://localhost:4000/api/buses/${busId}`,
                busData,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            dispatch(updateBusSuccess(response.data));
        } catch (error) {
            console.error('Error response:', error.response?.data);
        }
    };
};

// Delete Bus Action
export const deleteBusSuccess = (busId) => ({
    type: DELETE_BUS_SUCCESS,
    payload: busId
});

export const deleteBus = (busId) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            await axios.delete(`http://localhost:4000/api/buses/${busId}`, {
                headers: {
                    Authorization: token
                }
            });

            dispatch(deleteBusSuccess(busId));
        } catch (error) {
            console.error('Error response:', error.response?.data);
        }
    };
};


export const fetchBusesRequest = () => ({
    type: FETCH_BUSES_REQUEST
});

export const fetchBusesSuccess = (buses) => ({
    type: FETCH_BUSES_SUCCESS,
    payload: buses
});

export const fetchBusesFailure = (error) => ({
    type: FETCH_BUSES_FAILURE,
    payload: error
});

export const addBusSuccess = (bus) => ({
    type: ADD_BUS_SUCCESS,
    payload: bus
});

export const fetchUserBusesRequest = () => ({
    type: FETCH_USER_BUSES_REQUEST
});

export const fetchUserBusesSuccess = (buses) => ({
    type: FETCH_BUSES_SUCCESS,
    payload: buses
});

// Fetch all buses for an operator
export const fetchBuses = () => {
    return async (dispatch) => {
        dispatch(fetchBusesRequest());
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:4000/api/buses', {
                headers: {
                    Authorization: token // Ensure the token is being sent correctly
                }
            });
            dispatch(fetchBusesSuccess(response.data));
        } catch (error) {
            dispatch(fetchBusesFailure(error.message));
        }
    };
};





export const addBus = (busData) => {
    return async (dispatch) => {
        try {
            // Retrieve token from localStorage
            const token = localStorage.getItem('token');
            console.log('Token:', token); // Log token to check if it's valid

            // If no token found, log an error
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            // Make the POST request with the token in Authorization header
            const response = await axios.post(
                'http://localhost:4000/api/buses',
                busData,
                {
                    headers: {
                        Authorization: token // Ensure the token is being sent correctly
                    }
                }
            );

            // Dispatch success action if request is successful
            dispatch(addBusSuccess(response.data));
        } catch (error) {
            // Log any error that occurs
            console.error('Error response:', error.response?.data);
        }
    };
};

export const fetchSeatLayout = (tripId) => async (dispatch) => {
    try {
        console.log('Fetching seat layout for tripId:', tripId); // Debugging log

        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        // Ensure the token is available
        if (!token) {
            throw new Error('Authentication token not found');
        }

        // Make the request with the token included in the headers
        const { data } = await axios.get(`http://localhost:4000/api/trips/${tripId}/seatLayout`, {
            headers: {
                Authorization: token, // Add token in the Authorization header
            },
        });

        console.log('Fetched seat layout data:', data); // Debugging log
        dispatch({ type: FETCH_SEAT_LAYOUT_SUCCESS, payload: data });
    } catch (error) {
        console.error('Error fetching seat layout:', error.response?.data || error.message); // Debugging log
        dispatch({
            type: FETCH_SEAT_LAYOUT_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};