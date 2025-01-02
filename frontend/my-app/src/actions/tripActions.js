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


export const SEARCH_TRIPS_WITH_FILTERS_REQUEST = 'SEARCH_TRIPS_WITH_FILTERS_REQUEST';
export const SEARCH_TRIPS_WITH_FILTERS_SUCCESS = 'SEARCH_TRIPS_WITH_FILTERS_SUCCESS';
export const SEARCH_TRIPS_WITH_FILTERS_FAILURE = 'SEARCH_TRIPS_WITH_FILTERS_FAILURE';


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
        console.log('Adding trip with data:', tripData); // Debugging: Log the trip data being sent
        const token = localStorage.getItem('token');
        const response = await axios.post(
            'http://localhost:4000/api/trips',
            tripData,
            {
                headers: {
                    Authorization: token,
                },
            }
        );

        console.log('Trip added successfully:', response.data); // Debugging: Log the success response
        dispatch({ type: ADD_TRIP_SUCCESS, payload: response.data });
        return response;
    } catch (error) {
        console.error('Error adding trip:', error.message); // Debugging: Log the error message
        dispatch({ type: ADD_TRIP_FAILURE, payload: error.message });
        throw error; // Optionally re-throw the error for further handling
    }
};

// Search for trips (Users)

export const searchTrips = (form) => async (dispatch) => {
    dispatch({ type: SEARCH_TRIPS_REQUEST });
    console.log('Dispatching search trips with form data:', form); // Debugging: Log the form data

    try {
        // Format the date as 'YYYY-MM-DD' (no time)
        const formattedDate = new Date(form.date).toISOString().split('T')[0];
        console.log('Formatted search date:', formattedDate); // Debugging: Log the formatted date

        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        // Ensure the token is available
        if (!token) {
            throw new Error('Authentication token not found');
        }

        // Make the request with the token included in the headers
        const response = await axios.get('http://localhost:4000/api/search', {
            params: {
                from: form.from,
                to: form.to,
                date: formattedDate, // Send only the date part
            },
            headers: {
                Authorization: token, // Add token in the Authorization header
            },
        });

        console.log('Trips search response data:', response.data); // Debugging: Log the response data
        dispatch({ type: SEARCH_TRIPS_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Error during trips search:', error.message); // Debugging: Log the error message
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
        const updatedTrip = response.data.trip; // Extract the trip object
        console.log('Updated Trip:', updatedTrip);
        dispatch({ type: UPDATE_TRIP_SUCCESS, payload: updatedTrip });
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

/*
// Search for trips with filters and sorting (User)
export const searchTripsWithFilters = (form, filters) => async (dispatch) => {
    dispatch({ type: SEARCH_TRIPS_REQUEST });
    console.log('Dispatching search trips with form data and filters:', form, filters); // Log form and filters for debugging

    try {
        // Format the date as 'YYYY-MM-DD' (no time)
        const formattedDate = new Date(form.date);
        
        // Check if the date is invalid
        if (isNaN(formattedDate)) {
            throw new Error('Invalid date');
        }

        // Format the date to 'YYYY-MM-DD' for the query
        const formattedDateStr = formattedDate.toISOString().split('T')[0];
        console.log('Formatted search date:', formattedDateStr); // Log the formatted date

        const { from, to } = form;
        const { priceRange, rating, amenities, sortBy, sortOrder, page, limit } = filters;

        // Prepare query parameters
        const params = new URLSearchParams({
            from,
            to,
            date: formattedDateStr, // Send only the date part
            price: priceRange,      // Example: '100-500'
            rating,
            amenities: amenities.join(','), // Join amenities array
            sortBy,
            sortOrder,
            page,
            limit,
        });

        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication token not found');
        }

        // Make the request with the token included in the headers
        const response = await axios.get('http://localhost:4000/api/search/sort', {
            params: params.toString(),
            headers: {
                Authorization: token, // Add token in the Authorization header
            },
        });

        console.log('Trips search response data:', response.data); // Log the response data
        dispatch({ type: SEARCH_TRIPS_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Error during trips search:', error.message); // Log the error message
        dispatch({ type: SEARCH_TRIPS_FAILURE, payload: error.message });
    }
};
*/
export const searchTripsWithFilters = (filters) => (dispatch, getState) => {
    dispatch({ type: SEARCH_TRIPS_REQUEST });

    try {
        const { trips } = getState().trips;

        if (trips.length === 0) {
            console.warn('No trips available to filter and sort');
            throw new Error('No trips available to filter and sort');
        }

        console.log('Initial trips data:', trips);

        // Clone trips array for filtering
        let filteredTrips = [...trips];
        console.log('Cloned trips for filtering:', filteredTrips);

        // Apply price range filter
        if (filters.priceRange) {
            const [minPrice, maxPrice] = filters.priceRange.split('-').map(Number);
            console.log(`Filtering for price range: Min = ${minPrice}, Max = ${maxPrice}`);

            filteredTrips = filteredTrips.filter((trip) => {
                console.log(`Checking trip price: ${trip.price} against range ${minPrice}-${maxPrice}`);
                return trip.price >= minPrice && trip.price <= maxPrice;
            });

            console.log('Trips after applying price range filter:', filteredTrips);
        }

        // Apply sorting
        if (filters.sortBy) {
            console.log(
                `Applying sorting: Sort By = ${filters.sortBy}, Order = ${filters.sortOrder}`
            );

            filteredTrips.sort((a, b) => {
                let valueA, valueB;

                if (filters.sortBy === 'price') {
                    valueA = a.price;
                    valueB = b.price;
                } else if (filters.sortBy === 'rating') {
                    valueA = a.bus?.rating || 0;
                    valueB = b.bus?.rating || 0;
                }

                return filters.sortOrder === 'low-to-high' ? valueA - valueB : valueB - valueA;
            });

            console.log('Trips after sorting:', filteredTrips);
        }

        // Dispatch filtered trips or handle empty results
        if (filteredTrips.length === 0) {
            console.warn('No trips match the applied filters');
            dispatch({
                type: SEARCH_TRIPS_FAILURE,
                payload: 'No trips match the applied filters',
            });
        } else {
            console.log('Final filtered and sorted trips dispatched:', filteredTrips);
            dispatch({ type: SEARCH_TRIPS_SUCCESS, payload: filteredTrips });
        }
    } catch (error) {
        console.error('Error during trips search with filters:', error.message);
        dispatch({ type: SEARCH_TRIPS_FAILURE, payload: error.message });
    }
};
