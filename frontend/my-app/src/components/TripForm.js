/*
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTrip } from '../actions/tripActions';  // Import the action to add trips
import axios from 'axios';  // Use axios to fetch buses

const TripForm = () => {
    const [busOptions, setBusOptions] = useState([]);
    const [tripData, setTripData] = useState({
        busId: '',  // Bus ID to which the trip is assigned
        tripDate: '',  // Date of the trip
        price: '',
        departureTime: '',
        arrivalTime: '',
        from: '',  // Starting point
        to: '',    // Destination
        duration: '',  // Duration of the trip
        distance: '',  // Distance between the two points
        repeatTrip: false,  // Field to indicate repeating trips
        repeatInterval: 2    // Repeat every 2 days (alternating days)
    });

    const dispatch = useDispatch();

    // Fetch buses when the component mounts
    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token from localStorage
                const config = {
                    headers: {
                        Authorization: token // Pass the token in the Authorization header
                    }
                };
    
                const busResponse = await axios.get('http://localhost:4000/api/buses', config);
                setBusOptions(busResponse.data);
            } catch (error) {
                console.error('Error fetching buses:', error);
            }
        };
    
        fetchBuses();
    }, []);
    
    
    

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTripData({
            ...tripData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(tripData);
        dispatch(addTrip(tripData));  // Dispatch the action to add a trip
        // Reset the form
        setTripData({
            busId: '',
            tripDate: '',
            price: '',
            departureTime: '',
            arrivalTime: '',
            from: '',
            to: '',
            duration: '',
            distance: '',
            repeatTrip: false,
            repeatInterval: 2
        });
    };

    return (
        <form onSubmit={handleSubmit}>
           
            <label>Bus:</label>
            <select name="busId" value={tripData.busId} onChange={handleChange} required>
                <option value="">Select Bus</option>
                {busOptions.map(bus => (
                    <option key={bus._id} value={bus._id}>{bus.busName} ({bus.busNumber})</option>
                ))}
            </select>
            <br />

           
            <input
                type="date"
                name="tripDate"
                placeholder="Trip Date"
                value={tripData.tripDate}
                onChange={handleChange}
                required
            />
            <br />

           
            <input
                type="number"
                name="price"
                placeholder="Price"
                value={tripData.price}
                onChange={handleChange}
                required
            />
            <br />

            <input
                type="time"
                name="departureTime"
                placeholder="Departure Time"
                value={tripData.departureTime}
                onChange={handleChange}
                required
            />
            <br />

            
            <input
                type="time"
                name="arrivalTime"
                placeholder="Arrival Time"
                value={tripData.arrivalTime}
                onChange={handleChange}
                required
            />
            <br />

            
            <input
                type="text"
                name="from"
                placeholder="From"
                value={tripData.from}
                onChange={handleChange}
                required
            />
            <br />

           
            <input
                type="text"
                name="to"
                placeholder="To"
                value={tripData.to}
                onChange={handleChange}
                required
            />
            <br />

          
            <input
                type="text"
                name="duration"
                placeholder="Duration"
                value={tripData.duration}
                onChange={handleChange}
                required
            />
            <br />

            
            <input
                type="number"
                name="distance"
                placeholder="Distance (in km)"
                value={tripData.distance}
                onChange={handleChange}
                required
            />
            <br />

           
            <label>
                Repeat on alternate days:
                <input
                    type="checkbox"
                    name="repeatTrip"
                    checked={tripData.repeatTrip}
                    onChange={handleChange}
                />
            </label>
            <br />

            
            {tripData.repeatTrip && (
                <input
                    type="number"
                    name="repeatInterval"
                    placeholder="Repeat Interval (in days)"
                    value={tripData.repeatInterval}
                    onChange={handleChange}
                    required={tripData.repeatTrip}
                />
            )}
            <br />
            <button type="submit">Add Trip</button>
        </form>
    );
};

export default TripForm;
*/

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTrip, fetchTrips } from '../actions/tripActions';  // Import necessary actions
import axios from 'axios';

const TripForm = ({ onTripAdded }) => {
    const [busOptions, setBusOptions] = useState([]);
    const [tripData, setTripData] = useState({
        busId: '',
        tripDate: '',
        price: '',
        departureTime: '',
        arrivalTime: '',
        from: '',
        to: '',
        duration: '',
        distance: '',
        repeatTrip: false,
        repeatInterval: 2
    });

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: { Authorization: token }
                };
                const busResponse = await axios.get('http://localhost:4000/api/buses', config);
                setBusOptions(busResponse.data);
            } catch (error) {
                console.error('Error fetching buses:', error);
            }
        };
        fetchBuses();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTripData({
            ...tripData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(addTrip(tripData));
            
            // Optimistic update with manually populated fields
            const fullTrip = {
                ...result.data,
                routeID: {
                    from: tripData.from,
                    to: tripData.to
                },
                bus: {
                    busNumber: busOptions.find(bus => bus._id === tripData.busId)?.busNumber || 'N/A',
                    busName: busOptions.find(bus => bus._id === tripData.busId)?.busName || 'N/A'
                },
                date: tripData.tripDate
            };
            if (onTripAdded) onTripAdded(fullTrip);  // Pass the complete trip to parent
            
            // Reset form after adding trip
            setTripData({
                busId: '',
                tripDate: '',
                price: '',
                departureTime: '',
                arrivalTime: '',
                from: '',
                to: '',
                duration: '',
                distance: '',
                repeatTrip: false,
                repeatInterval: 2
            });
            
            // Optionally, refetch trips from the backend
            dispatch(fetchTrips());
        } catch (error) {
            console.error('Error adding trip:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select name="busId" value={tripData.busId} onChange={handleChange} required>
                <option value="">Select Bus</option>
                {busOptions.map(bus => (
                    <option key={bus._id} value={bus._id}>{bus.busName} ({bus.busNumber})</option>
                ))}
            </select>
            <input type="date" name="tripDate" value={tripData.tripDate} onChange={handleChange} required />
            <input type="number" name="price" value={tripData.price} onChange={handleChange} required />
            <input type="time" name="departureTime" value={tripData.departureTime} onChange={handleChange} required />
            <input type="time" name="arrivalTime" value={tripData.arrivalTime} onChange={handleChange} required />
            <input type="text" name="from" value={tripData.from} onChange={handleChange} required />
            <input type="text" name="to" value={tripData.to} onChange={handleChange} required />
            <input type="text" name="duration" value={tripData.duration} onChange={handleChange} required />
            <input type="number" name="distance" value={tripData.distance} onChange={handleChange} required />
            <label>
                Repeat on alternate days:
                <input type="checkbox" name="repeatTrip" checked={tripData.repeatTrip} onChange={handleChange} />
            </label>
            {tripData.repeatTrip && (
                <input type="number" name="repeatInterval" value={tripData.repeatInterval} onChange={handleChange} />
            )}
            <button type="submit">Add Trip</button>
        </form>
    );
};

export default TripForm;
