/*
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips } from '../actions/tripActions';  // Import the fetchTrips action

const TripList = ({ busId }) => {
    const dispatch = useDispatch();
    const { loading, trips, error } = useSelector(state => state.trips);  // Get the trip state

    useEffect(() => {
        dispatch(fetchTrips(busId));  // Fetch trips when the component loads
    }, [dispatch, busId]);

    if (loading) return <p>Loading trips...</p>;
    if (error) return <p>Error fetching trips: {error}</p>;

    return (
        <ul>
            {trips.map(trip => (
                <li key={trip._id}>{trip.date} - {trip.departureTime} to {trip.arrivalTime}</li>
            ))}
        </ul>
    );
};

export default TripList;
*/
/*

// TripList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips } from '../actions/tripActions';

const TripList = ({ busId }) => {
    const dispatch = useDispatch();
    const { trips, loading, error } = useSelector(state => state.trips);

    useEffect(() => {
        if (busId) {
            console.log('Bus ID is:', busId);  // Debugging: log busId
            dispatch(fetchTrips(busId));  // Fetch trips when busId is available
        } else {
            console.error('Bus ID is not available');
        }
    }, [busId, dispatch]);

    if (loading) return <p>Loading trips...</p>;
    if (error) return <p>Error fetching trips: {error}</p>;

    return (
        <ul>
            {trips.map(trip => (
                <li key={trip._id}> //{ Use unique trip._id as the key }
                    {trip.tripDate} - {trip.departureTime} to {trip.arrivalTime}
                </li>
            ))}
        </ul>
    );
};

export default TripList;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips } from '../actions/tripActions';

const TripList = () => {
    const dispatch = useDispatch();
    const { trips, loading, error } = useSelector(state => state.trips);
    console.log(trips);

    useEffect(() => {
        dispatch(fetchTrips()); // Fetch all trips for the operator
    }, [dispatch]);

    if (loading) return <p>Loading trips...</p>;
    if (error) return <p>Error fetching trips: {error}</p>;

    return (
        <ul>
            {trips.map(trip => (
                <li key={trip._id}>
                    Route: {trip.routeID?.from ?? 'N/A'} - {trip.routeID?.to ?? 'N/A'} <br />
                    Date: {new Date(trip.date).toLocaleDateString()} <br />
                    Departure: {trip.departure} - Arrival: {trip.arrival} <br />
                    Bus: {trip.bus?.busNumber ?? 'N/A'} ({trip.bus?.busName ?? 'N/A'})
                </li>
            ))}
        </ul>
    );
};

export default TripList;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips } from '../actions/tripActions';

const TripList = () => {
    const dispatch = useDispatch();

    // Destructure trips, loading, and error states
    const { trips, loading } = useSelector(state => ({
        trips: state.trips.trips || [],  // Ensure trips is an array
        loading: state.trips.loading,
       
    }));

    useEffect(() => {
        dispatch(fetchTrips()); // Fetch all trips for the operator
    }, [dispatch]);

    // Loading and error handling
    if (loading) return <p>Loading trips...</p>;
   

    // Conditional check to avoid mapping over non-array values
    if (!Array.isArray(trips)) {
        return <p>No trips available.</p>;
    }

    return (
        <ul>
            {trips.map(trip => (
                <li key={trip._id}>
                    Route: {trip.routeID?.from ?? 'N/A'} - {trip.routeID?.to ?? 'N/A'} <br />
                    Date: {new Date(trip.date).toLocaleDateString()} <br />
                    Departure: {trip.departure} - Arrival: {trip.arrival} <br />
                    Bus: {trip.bus?.busNumber ?? 'N/A'} ({trip.bus?.busName ?? 'N/A'})
                </li>
            ))}
        </ul>
    );
};

export default TripList;



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips, updateTrip, deleteTrip } from '../actions/tripActions';

const TripList = () => {
    const dispatch = useDispatch();

    // Get trips, loading, and error state from Redux
    const { trips, loading, error } = useSelector(state => ({
        trips: state.trips.trips || [], // Redux state trips
        loading: state.trips.loading,
        error: state.trips.error
    }));

    const [editTripId, setEditTripId] = useState(null);
    const [tripData, setTripData] = useState({
        routeID: { from: '', to: '' },
        date: '',
        departure: '',
        arrival: '',
        bus: { busNumber: '', busName: '' },
    });

    useEffect(() => {
        dispatch(fetchTrips()); // Dispatch action to fetch trips
    }, [dispatch]);

    const handleEdit = (trip) => {
        setEditTripId(trip._id);
        setTripData({
            routeID: { from: trip.routeID?.from || '', to: trip.routeID?.to || '' },
            date: trip.date ? new Date(trip.date).toISOString().slice(0, 10) : '',
            departure: trip.departure || '',
            arrival: trip.arrival || '',
            bus: { busNumber: trip.bus?.busNumber || '', busName: trip.bus?.busName || '' },
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [field, subField] = name.split('.');

        if (subField) {
            setTripData(prevState => ({
                ...prevState,
                [field]: {
                    ...prevState[field],
                    [subField]: value
                }
            }));
        } else {
            setTripData(prevState => ({
                ...prevState,
                [field]: value
            }));
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateTrip(editTripId, tripData)); // Dispatch action to update trip
        dispatch(fetchTrips()); // Re-fetch trips to ensure the latest data is displayed
        setEditTripId(null); // Reset edit state
    };

    const handleRemove = (tripId) => {
        dispatch(deleteTrip(tripId)); // Dispatch action to delete trip
    };

    // Conditionally render based on loading/error/trips state
    if (loading) return <p>Loading trips...</p>;
    if (error) return <p>Error loading trips: {error}</p>;
    if (!trips || trips.length === 0) return <p>No trips available.</p>;

    return (
        <div>
            <ul>
                {trips.map(trip => (
                    <li key={trip._id}>
                        {editTripId === trip._id ? (
                            <form onSubmit={handleUpdate}>
                                <input
                                    type="text"
                                    name="routeID.from"
                                    value={tripData.routeID.from}
                                    onChange={handleChange}
                                    placeholder="From"
                                    required
                                />
                                <input
                                    type="text"
                                    name="routeID.to"
                                    value={tripData.routeID.to}
                                    onChange={handleChange}
                                    placeholder="To"
                                    required
                                />
                                <input
                                    type="date"
                                    name="date"
                                    value={tripData.date}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="time"
                                    name="departure"
                                    value={tripData.departure}
                                    onChange={handleChange}
                                    placeholder="Departure"
                                    required
                                />
                                <input
                                    type="time"
                                    name="arrival"
                                    value={tripData.arrival}
                                    onChange={handleChange}
                                    placeholder="Arrival"
                                    required
                                />
                                <input
                                    type="text"
                                    name="bus.busNumber"
                                    value={tripData.bus.busNumber}
                                    onChange={handleChange}
                                    placeholder="Bus Number"
                                    required
                                />
                                <input
                                    type="text"
                                    name="bus.busName"
                                    value={tripData.bus.busName}
                                    onChange={handleChange}
                                    placeholder="Bus Name"
                                    required
                                />
                                <button type="submit">Update</button>
                                <button type="button" onClick={() => setEditTripId(null)}>Cancel</button>
                            </form>
                        ) : (
                            <>
                                <p>
                                    Route: {trip.routeID?.from || 'N/A'} - {trip.routeID?.to || 'N/A'} <br />
                                    Date: {trip.date ? new Date(trip.date).toLocaleDateString() : 'Invalid Date'} <br />
                                    Departure: {trip.departure || 'N/A'} - Arrival: {trip.arrival || 'N/A'} <br />
                                    Bus: {trip.bus?.busNumber || 'N/A'} ({trip.bus?.busName || 'N/A'})
                                </p>
                                <button onClick={() => handleEdit(trip)}>Edit</button>
                                <button onClick={() => handleRemove(trip._id)}>Remove</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TripList;
*/
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips, updateTrip, deleteTrip } from '../actions/tripActions';

const TripList = () => {
    const dispatch = useDispatch();
    const [localTrips, setLocalTrips] = useState([]);
    const [editingTripId, setEditingTripId] = useState(null);
    const [tripEditData, setTripEditData] = useState({
        busId: '',
        tripDate: '',
        departureTime: '',
        arrivalTime: '',
        from: '',
        to: '',
        duration: '',
        distance: ''
    });

    const { trips, loading, error } = useSelector(state => ({
        trips: state.trips.trips || [],
        loading: state.trips.loading,
        error: state.trips.error
    }));

    useEffect(() => {
        console.log(trips)
        dispatch(fetchTrips());
    }, [dispatch]);

    useEffect(() => {
        setLocalTrips(trips);
    }, [trips]);

    const handleTripAdded = (newTrip) => {
        setLocalTrips(prevTrips => [...prevTrips, newTrip]);
    };

    const handleRemove = (tripId) => {
        dispatch(deleteTrip(tripId));
        setLocalTrips(prevTrips => prevTrips.filter(trip => trip._id !== tripId));
    };

    const handleEdit = (trip) => {
        setEditingTripId(trip._id);
        setTripEditData({
            busId: trip.bus?._id || '',
            tripDate: trip.date,
            departureTime: trip.departureTime,
            arrivalTime: trip.arrivalTime,
            from: trip.routeID?.from || '',
            to: trip.routeID?.to || '',
            duration: trip.duration,
            distance: trip.distance
        });
    };

    const handleSaveEdit = (tripId) => {
        dispatch(updateTrip(tripId, tripEditData));
        setEditingTripId(null);  // Exit edit mode
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTripEditData({
            ...tripEditData,
            [name]: value
        });
    };

    if (loading) return <p>Loading trips...</p>;
    if (error) return <p>Error loading trips: {error}</p>;
    if (!localTrips || localTrips.length === 0) return <p>No trips available.</p>;

    return (
        <div>
            <ul>
                {localTrips.map(trip => (
                    <li key={trip._id}>
                        {editingTripId === trip._id ? (
                            <div>
                                <input type="text" name="from" value={tripEditData.from} onChange={handleChange} placeholder="From" />
                                <input type="text" name="to" value={tripEditData.to} onChange={handleChange} placeholder="To" />
                                <input type="date" name="tripDate" value={tripEditData.tripDate} onChange={handleChange} />
                                <input type="time" name="departureTime" value={tripEditData.departureTime} onChange={handleChange} />
                                <input type="time" name="arrivalTime" value={tripEditData.arrivalTime} onChange={handleChange} />
                                <button onClick={() => handleSaveEdit(trip._id)}>Save</button>
                                <button onClick={() => setEditingTripId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <p>
                                 Route: {trip.routeID?.from || 'N/A'} - {trip.routeID?.to || 'N/A'} <br />
                                 Date: {trip.date ? new Date(trip.date).toLocaleDateString() : 'Invalid Date'} <br />
                                 Departure: {trip.departure || 'N/A'} - Arrival: {trip.arrival || 'N/A'} <br />
                                Bus: {trip.bus?.busNumber || 'N/A'} ({trip.bus?.busName || 'N/A'})
                               </p>
 
                                <button onClick={() => handleEdit(trip)}>Edit</button>
                                <button onClick={() => handleRemove(trip._id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TripList;
