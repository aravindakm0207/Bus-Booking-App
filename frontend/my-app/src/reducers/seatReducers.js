// src/redux/reducers/seatReducers.js
import { FETCH_SEAT_LAYOUT_SUCCESS, FETCH_SEAT_LAYOUT_FAIL, BOOK_SEATS_SUCCESS, BOOK_SEATS_FAIL } from '../constants/seatConstants';

export const seatLayoutReducer = (state = { seatLayout: [] }, action) => {
    switch (action.type) {
        case FETCH_SEAT_LAYOUT_SUCCESS:
            return { seatLayout: action.payload };
        case FETCH_SEAT_LAYOUT_FAIL:
            return { error: action.payload };
           
        default:
            return state;
    }
};

export const bokingReducer = (state = { booking: null }, action) => {
    switch (action.type) {
        case BOOK_SEATS_SUCCESS:
            return { booking: action.payload };
        case BOOK_SEATS_FAIL:
            return { error: action.payload };
        default:
            return state;
    }
};
