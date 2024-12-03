/*
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SeatSelection from './SeatSelections'; // Import the SeatSelection component for viewing seats

const UserBusList = () => {
    const [selectedBusId, setSelectedBusId] = useState(null);
    const [journeyDate, setJourneyDate] = useState(null);

    // Access trips from the Redux store
    const { trips, loading, error } = useSelector((state) => state.trips);

    // Handle bus seat selection
    const handleViewSeats = (busId, date) => {
        setSelectedBusId(busId);
        setJourneyDate(date);
    };

    // Display loading or error message if necessary
    if (loading) return <p>Loading trips and buses...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Available Buses</h2>
            <ul>
                {trips.length === 0 ? (
                    <p>No buses found for the selected route and date.</p>
                ) : (
                    trips.map((trip) => (
                        <li key={trip._id}>
                            <p><strong>Route:</strong> {trip.routeID.from} - {trip.routeID.to}</p>
                            <p><strong>Date:</strong> {new Date(trip.date).toLocaleDateString()}</p>
                            <p><strong>Departure:</strong> {trip.departure} - <strong>Arrival:</strong> {trip.arrival}</p>
                            <p><strong>Bus Name:</strong> {trip.bus ? trip.bus.busName : 'N/A'}</p>
                            <p><strong>Bus Number:</strong> {trip.bus ? trip.bus.busNumber : 'N/A'}</p>
                            {trip.bus && (
                                <button onClick={() => handleViewSeats(trip.bus._id, trip.date)}>View Seats</button>
                            )}
                        </li>
                    ))
                )}
            </ul>

           
            {selectedBusId && <SeatSelection busId={selectedBusId} journeyDate={journeyDate} />}
        </div>
    );
};

export default UserBusList;
*/


import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SeatSelection from './SeatSelections'; // Corrected import name for SeatSelection

const UserBusList = () => {
    const [selectedTripId, setSelectedTripId] = useState(null); // Updated to selectedTripId
    const [journeyDate, setJourneyDate] = useState(null);

    // Access trips from the Redux store
    const { trips, loading, error } = useSelector((state) => state.trips);

    // Handle bus seat selection
    const handleViewSeats = (tripId, date) => { // Updated to tripId
        setSelectedTripId(tripId);
        setJourneyDate(date);
    };

    // Display loading or error message if necessary
    if (loading) return <p>Loading trips and buses...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Available Buses</h2>
            <ul>
                {trips.length === 0 ? (
                    <p>No buses found for the selected route and date.</p>
                ) : (
                    trips.map((trip) => (
                        <li key={trip._id}>
                            <p><strong>Route:</strong> {trip.routeID.from} - {trip.routeID.to}</p>
                            <p><strong>Date:</strong> {new Date(trip.date).toLocaleDateString()}</p>
                            <p><strong>Departure:</strong> {trip.departure} - <strong>Arrival:</strong> {trip.arrival}</p>
                            <p><strong>Bus Name:</strong> {trip.bus ? trip.bus.busName : 'N/A'}</p>
                            <p><strong>Bus Number:</strong> {trip.bus ? trip.bus.busNumber : 'N/A'}</p>
                            {trip.bus && (
                                <button onClick={() => handleViewSeats(trip._id, trip.date)}>View Seats</button> 
                            )}
                        </li>
                    ))
                )}
            </ul>

            {/* Show SeatSelection component if a trip is selected */}
            {selectedTripId && <SeatSelection tripId={selectedTripId} journeyDate={journeyDate} />} {/* Updated prop name */}
        </div>
    );
};

export default UserBusList;
