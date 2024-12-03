/*

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuses } from '../actions/busActions';
import SeatSelection from './SeatSelections';
const BusList = () => {
    const dispatch = useDispatch();
    const buses = useSelector(state => state.buses.buses || []); // Ensure buses is an array even when undefined
    const [selectedBusId, setSelectedBusId] = useState(null);
    const [journeyDate, setJourneyDate] = useState(null);

    useEffect(() => {
        dispatch(fetchBuses());
    }, [dispatch]);

    const handleViewSeats = (busId, date) => {
        setSelectedBusId(busId);
        setJourneyDate(date);
    };

    return (
        <div>
            <ul>
                {buses.map(bus => (
                    <li key={bus._id}>
                        {bus.busName} - {bus.busNumber} - {bus.from} to {bus.to} -
                        {bus.amenities && Array.isArray(bus.amenities) ? bus.amenities.join(', ') : 'No amenities listed'}
                        <button onClick={() => handleViewSeats(bus._id, bus.date)}>View Seats</button>
                    </li>
                ))}
            </ul>

            {selectedBusId && (
                <SeatSelection busId={selectedBusId} journeyDate={journeyDate} />
            )}
        </div>
    );
};

export default BusList;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuses, deleteBus } from '../actions/busActions';

const BusList = () => {
    const dispatch = useDispatch();
    const buses = useSelector(state => state.buses.buses || []);

    useEffect(() => {
        dispatch(fetchBuses());
    }, [dispatch]);

    const handleEdit = (busId) => {
        // Implement the logic to handle editing, like opening a modal or navigating to an edit page
        console.log(`Edit bus with ID: ${busId}`);
    };

    const handleRemove = (busId) => {
        dispatch(deleteBus(busId));
    };

    return (
        <div>
            <ul>
                {buses.map(bus => (
                    <li key={bus._id}>
                        {bus.busName} - {bus.busNumber} - {bus.phone} - 
                        {bus.amenities && Array.isArray(bus.amenities) ? bus.amenities.join(', ') : 'No amenities listed'}
                        <button onClick={() => handleEdit(bus._id)}>Edit</button>
                        <button onClick={() => handleRemove(bus._id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BusList;
*/

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuses, deleteBus, updateBus } from '../actions/busActions';
import { useAuth } from '../context/AuthContext';

const BusList = () => {
    const { user } = useAuth(); // Get logged-in operator details
    const dispatch = useDispatch();
    const buses = useSelector(state => state.buses.buses || []);
    const [editBusId, setEditBusId] = useState(null); // Track which bus is being edited
    const [busData, setBusData] = useState({
        busName: '',
        busNumber: '',
        busCapacity: '',
        email: user?.email || '',
        phone: '',
        amenities: '',
        rating: '',
        rows: '',
        seatsPerRow: '',
        operator: user?.account?._id || ''
    });

    useEffect(() => {
        dispatch(fetchBuses());
    }, [dispatch]);

    const handleEdit = (bus) => {
        setEditBusId(bus._id); // Set the bus ID to edit
        setBusData({
            busName: bus.busName,
            busNumber: bus.busNumber,
            busCapacity: bus.busCapacity,
            email: user?.email || '',
            phone: bus.phone,
            amenities: bus.amenities.join(', '), // Convert amenities array to comma-separated string
            rating: bus.rating,
            rows: bus.rows,
            seatsPerRow: bus.seatsPerRow,
            operator: user?.account?._id || ''
        });
    };

    const handleRemove = (busId) => {
        dispatch(deleteBus(busId));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'amenities') {
            // Convert comma-separated string into an array
            const amenitiesArray = value.split(',').map(amenity => amenity.trim());
            setBusData({
                ...busData,
                [name]: amenitiesArray
            });
        } else if (['busCapacity', 'phone', 'rating', 'rows', 'seatsPerRow'].includes(name)) {
            setBusData({
                ...busData,
                [name]: parseInt(value, 10) // Convert to integer where applicable
            });
        } else {
            setBusData({
                ...busData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateBus(editBusId, busData)); // Dispatch action to update bus
        console.log('Updated bus data:', busData)
        setEditBusId(null); // Reset editing state
    };

    return (
        <div>
            <ul>
                {buses.map(bus => (
                    <li key={bus._id}>
                        {editBusId === bus._id ? (
                            <form onSubmit={handleSubmit}>
                                <input type="text" name="busName" placeholder="Bus Name" value={busData.busName} onChange={handleChange} required />
                                <br />
                                <input type="text" name="busNumber" placeholder="Bus Number" value={busData.busNumber} onChange={handleChange} required />
                                <br />
                                <input type="number" name="busCapacity" placeholder="Bus Capacity" value={busData.busCapacity} onChange={handleChange} required />
                                <br />
                                <input type="tel" name="phone" placeholder="Phone" value={busData.phone} onChange={handleChange} required />
                                <br />
                                <input type="text" name="amenities" placeholder="Amenities (comma-separated)" value={busData.amenities} onChange={handleChange} />
                                <br />
                                <input type="number" name="rating" placeholder="Rating" value={busData.rating} onChange={handleChange} required />
                                <br />
                                <input type="number" name="rows" placeholder="Number of Rows" value={busData.rows} onChange={handleChange} required />
                                <br />
                                <input type="number" name="seatsPerRow" placeholder="Seats per Row" value={busData.seatsPerRow} onChange={handleChange} required />
                                <br />
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setEditBusId(null)}>Cancel</button>
                            </form>
                        ) : (
                            <>
                                {bus.busName} - {bus.busNumber} - {bus.phone} - 
                                {bus.amenities && Array.isArray(bus.amenities) ? bus.amenities.join(', ') : 'No amenities listed'}
                                <button onClick={() => handleEdit(bus)}>Edit</button>
                                <button onClick={() => handleRemove(bus._id)}>Remove</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BusList;
