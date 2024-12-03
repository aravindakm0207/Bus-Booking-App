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

// Fetch seat layout for a specific trip
export const fetchSeatLayout = (tripId) => async (dispatch) => {
    try {
        console.log('Fetching seat layout for tripId:', tripId);  // Log the tripId being used
        const { data } = await axios.get(`http://localhost:4000/api/trips/${tripId}/seatLayout`);
        
        console.log('Fetched seat layout data:', data);  // Log the data fetched from the API
        
        dispatch({ type: FETCH_SEAT_LAYOUT_SUCCESS, payload: data });
    } catch (error) {
        console.error('Error fetching seat layout:', error.response?.data || error.message);  // Log the error for debugging
        dispatch({
            type: FETCH_SEAT_LAYOUT_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};


// Book seats for a specific bus on a journey date
export const bookSeats = (tripId, selectedSeats, journeyDate, userDetails) => async (dispatch) => {
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
            },
            {
                headers: {
                    Authorization: token // Ensure the token is formatted correctly
                }
            }
        );
        dispatch({ type: BOOK_SEATS_SUCCESS, payload: data });
    } catch (error) {
        console.error('Error booking seats:', error.response?.data || error.message);
        dispatch({
            type: BOOK_SEATS_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
