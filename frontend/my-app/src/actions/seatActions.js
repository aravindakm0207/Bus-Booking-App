/*

import axios from 'axios';
import { FETCH_SEAT_LAYOUT_SUCCESS, FETCH_SEAT_LAYOUT_FAIL, BOOK_SEATS_SUCCESS, BOOK_SEATS_FAIL } from '../constants/seatConstants';

// Fetch seat layout for a bus
export const fetchSeatLayout = (busId) => async (dispatch) => {
    try {
        console.log('Fetching seat layout for busId:', busId); 
        const { data } = await axios.get(`http://localhost:4000/api/trips/${tripId}/seatLayout`);
        dispatch({ type: FETCH_SEAT_LAYOUT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: FETCH_SEAT_LAYOUT_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};



export const bookSeats = (busId, selectedSeats, journeyDate, userDetails) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.post('http://localhost:4000/api/buses/booking', {
            busId,
            seatsBooked: selectedSeats,
            journeyDate,
            name: userDetails.name,
            email: userDetails.email,
            phone: userDetails.phone,
        },{
            headers: {
                Authorization: token // Pass the token in the headers
            }
        }
    );
        dispatch({ type: BOOK_SEATS_SUCCESS, payload: data });
    } catch (error) {
        console.error(error.response?.data || error.message);
        dispatch({
            type: BOOK_SEATS_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

*/
import axios from 'axios';
import { 
    FETCH_SEAT_LAYOUT_SUCCESS, FETCH_SEAT_LAYOUT_FAIL, 
    BOOK_SEATS_SUCCESS, BOOK_SEATS_FAIL 
} from '../constants/seatConstants';



export const fetchSeatLayout = (tripId) => async (dispatch) => {
    try {
        console.log('Fetching seat layout for tripId:', tripId); // Debugging log

        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        // Throw an error if no token is found
        if (!token) {
            throw new Error('Authentication token not found');
        }

        // Make the request to fetch the seat layout
        const { data } = await axios.get(`http://localhost:4000/api/trips/${tripId}/seatLayout`, {
            headers: {
                Authorization: token, // Use token directly without Bearer
            },
        });

        console.log('Fetched seat layout data:', data); // Debugging log
        // Dispatch success action with seat layout data
        dispatch({ type: FETCH_SEAT_LAYOUT_SUCCESS, payload: data });
    } catch (error) {
        // Log the error for debugging
        console.error('Error fetching seat layout:', error.response?.data || error.message);

        // Dispatch failure action with error message
        dispatch({
            type: FETCH_SEAT_LAYOUT_FAIL,
            payload: error.response?.data?.message || 'Failed to fetch seat layout',
        });
    }
};


// Book seats for a specific trip
export const bookSeats = (tripId, selectedSeats, journeyDate, userDetails, price) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('User not authenticated');
        }

        const { data } = await axios.post(
            'http://localhost:4000/api/buses/booking', 
            {
                tripId,
                seatsBooked: selectedSeats,
                journeyDate,
                name: userDetails.name,
                email: userDetails.email,
                phone: userDetails.phone,
                price, // Include price in the request body
            },
            {
                headers: {
                    Authorization: token, // Include token in the Authorization header
                }
            }
        );

        console.log('Booking successful:', data); // Debugging log
        dispatch({ type: BOOK_SEATS_SUCCESS, payload: data });
    } catch (error) {
        console.error('Error booking seats:', error.response?.data || error.message); // Debugging log
        dispatch({
            type: BOOK_SEATS_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
