import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box } from '@mui/material';
import { searchTripsWithFilters } from '../actions/tripActions'; // Action to filter and sort trips
import SeatSelection from './SeatSelections';

const UserBusList = () => {
    const [selectedTrips, setSelectedTrips] = useState([]);
    const [showImages, setShowImages] = useState({});
    const [filters, setFilters] = useState({
        priceRange: '',
        sortBy: 'price',
        sortOrder: 'low-to-high',
    });
    const [filteredTrips, setFilteredTrips] = useState([]);
    const [noMatchingTrips, setNoMatchingTrips] = useState(false);
    const [openImageDialog, setOpenImageDialog] = useState(false);
    const [openSeatsDialog, setOpenSeatsDialog] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);

    const dispatch = useDispatch();
    const { trips, loading, error } = useSelector((state) => state.trips);

    // Apply filters locally on trips already fetched
    useEffect(() => {
        if (trips.length > 0) {
            let updatedTrips = [...trips];

            // Apply price range filter
            if (filters.priceRange) {
                const [min, max] = filters.priceRange.split('-').map(Number);
                updatedTrips = updatedTrips.filter(
                    (trip) => trip.price >= min && trip.price <= max
                );
            }

            // Apply sorting
            if (filters.sortBy === 'price') {
                updatedTrips = updatedTrips.sort((a, b) =>
                    filters.sortOrder === 'low-to-high'
                        ? a.price - b.price
                        : b.price - a.price
                );
            } else if (filters.sortBy === 'rating') {
                updatedTrips = updatedTrips.sort((a, b) =>
                    filters.sortOrder === 'low-to-high'
                        ? a.rating - b.rating
                        : b.rating - a.rating
                );
            }

            setFilteredTrips(updatedTrips);

            // Check if no trips match
            if (updatedTrips.length === 0) {
                setNoMatchingTrips(true);
            } else {
                setNoMatchingTrips(false);
            }
        }
    }, [filters, trips]);

    // Handle price range, sorting changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    // Handle seat selection visibility
    const handleViewSeats = (tripId, date) => {
        setSelectedTrip({ tripId, date });
        setOpenSeatsDialog(true);
    };

    const handleHideSeats = () => {
        setOpenSeatsDialog(false);
    };

    const handleToggleImages = (tripId) => {
        setShowImages((prev) => ({
            ...prev,
            [tripId]: !prev[tripId],
        }));
    };

    const handleImageDialogOpen = (trip) => {
        setSelectedTrip(trip);
        setOpenImageDialog(true);
    };

    const handleImageDialogClose = () => {
        setOpenImageDialog(false);
    };

    if (loading) {
        return <p>Loading trips...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2>Available Buses</h2>

            <div>
                <label>
                    Price Range:
                    <select
                        name="priceRange"
                        value={filters.priceRange}
                        onChange={handleFilterChange}
                    >
                        <option value="">Select Price Range</option>
                        <option value="0-500">0 - 500</option>
                        <option value="500-750">500 - 750</option>
                        <option value="750-1000">750 - 1000</option>
                    </select>
                </label>

                <label>
                    Sort Order:
                    <select
                        name="sortOrder"
                        value={filters.sortOrder}
                        onChange={handleFilterChange}
                    >
                        <option value="low-to-high">Low to High</option>
                        <option value="high-to-low">High to Low</option>
                    </select>
                </label>
            </div>

            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {filteredTrips.length === 0 ? (
                    <p>No trips match the selected filters.</p>
                ) : (
                    filteredTrips.map((trip) => (
                        <li
                            key={trip._id}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '15px',
                            }}
                        >
                            {/* Route and other information in a single row */}
                            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                            <Typography sx={{ whiteSpace: 'pre-line' }}>
  <strong>Route:</strong> {trip.routeID.from} - {trip.routeID.to}
</Typography>

                                <Typography sx={{ marginRight: 2 }}><strong>Date:</strong> {new Date(trip.date).toLocaleDateString()}</Typography>
                                <Typography sx={{ marginRight: 2 }}><strong>Departure:</strong> {trip.departure}</Typography>
                                <Typography sx={{ marginRight: 2 }}><strong>Arrival:</strong> {trip.arrival}</Typography>
                                <Typography sx={{ marginRight: 2 }}><strong>Bus Name:</strong> {trip.bus ? trip.bus.busName : 'N/A'}</Typography>
                                <Typography sx={{ marginRight: 2 }}><strong>Price:</strong> {trip.price ? trip.price : 'N/A'}</Typography>
                            </Box>

                            {/* Photos and seats in the same row */}
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {trip.bus && trip.bus.images && trip.bus.images.length > 0 && (
                                    <Button variant="contained" onClick={() => handleImageDialogOpen(trip)} sx={{ marginRight: 2 }}>
                                        View Photos
                                    </Button>
                                )}

                                <Button
                                    variant="outlined"
                                    onClick={() => handleViewSeats(trip._id, trip.date)}
                                    sx={{ marginLeft: 2 }}
                                >
                                    View Seats
                                </Button>
                            </Box>
                        </li>
                    ))
                )}
            </ul>

            {/* Dialog for Image Preview */}
            <Dialog open={openImageDialog} onClose={handleImageDialogClose} fullWidth>
                <DialogTitle>Bus Images</DialogTitle>
                <DialogContent>
                    {selectedTrip &&
                        selectedTrip.bus &&
                        selectedTrip.bus.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Bus Image ${index + 1}`}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    marginBottom: '10px',
                                }}
                            />
                        ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleImageDialogClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for Seat Selection */}
            <Dialog open={openSeatsDialog} onClose={handleHideSeats} fullWidth>
                <DialogTitle>Select Seats</DialogTitle>
                <DialogContent>
                    {selectedTrip && <SeatSelection tripId={selectedTrip.tripId} journeyDate={selectedTrip.date} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleHideSeats} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UserBusList;


















/*
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SeatSelection from './SeatSelections'; // Corrected import name for SeatSelection

const UserBusList = () => {
    const [selectedTrips, setSelectedTrips] = useState([]); // Array to track selected trips
    const [showImages, setShowImages] = useState({}); // Track which bus's images to show

    // Access trips from the Redux store
    const { trips, loading, error } = useSelector((state) => state.trips);

    // Debugging: Log trips, loading, and error state from Redux store
    console.log('Trips:', trips);
    console.log('Loading:', loading);
    console.log('Error:', error);

    // Handle viewing bus seats
    const handleViewSeats = (tripId, date) => {
        if (!selectedTrips.some(trip => trip.tripId === tripId)) {
            setSelectedTrips([...selectedTrips, { tripId, journeyDate: date }]);
        }
    };

    // Handle hiding bus seats
    const handleHideSeats = (tripId) => {
        setSelectedTrips(selectedTrips.filter(trip => trip.tripId !== tripId));
    };

    // Toggle images visibility
    const handleToggleImages = (tripId) => {
        setShowImages((prev) => ({
            ...prev,
            [tripId]: !prev[tripId], // Toggle the visibility for the specific trip
        }));
    };

    // Display loading or error message if necessary
    if (loading) {
        console.log('Loading trips...');
        return <p>Loading trips and buses...</p>;
    }
    if (error) {
        console.error('Error fetching trips:', error);
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2>Available Buses</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {trips.length === 0 ? (
                    <p>No buses found for the selected route and date.</p>
                ) : (
                    trips.map((trip) => (
                        <li key={trip._id} style={{ display: 'flex', flexDirection: 'row', marginBottom: '15px', alignItems: 'center' }}>
                            <p style={{ marginRight: '20px' }}><strong>Route:</strong><br/> {trip.routeID.from} - {trip.routeID.to}</p>
                            <p style={{ marginRight: '20px' }}><strong>Date:</strong> {new Date(trip.date).toLocaleDateString()}</p>
                            <p style={{ marginRight: '20px' }}><strong>Departure:</strong> {trip.departure} - <strong>Arrival:</strong> {trip.arrival}</p>
                            <p style={{ marginRight: '20px' }}><strong>Bus Name:</strong> {trip.bus ? trip.bus.busName : 'N/A'}</p>
                            <p style={{ marginRight: '20px' }}><strong>Bus Number:</strong> {trip.bus ? trip.bus.busNumber : 'N/A'}</p>
                            <p style={{ marginRight: '20px' }}><strong>Price:</strong> {trip.price ? `Rs${trip.price}` : 'N/A'}</p>
                            <p style={{ marginRight: '20px' }}><strong>Amenities:</strong> {trip.bus && trip.bus.amenities ? trip.bus.amenities.join(', ') : 'N/A'}</p>

                            
                            {trip.bus && trip.bus.images && trip.bus.images.length > 0 && (
                                <div>
                                    <button onClick={() => handleToggleImages(trip._id)}>
                                        {showImages[trip._id] ? 'Hide Photos' : 'View Photos'}
                                    </button>
                                    {showImages[trip._id] && (
                                        <div>
                                            <strong>Bus Images:</strong>
                                            {trip.bus.images.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image}
                                                    alt={`Bus Image ${index + 1}`}
                                                    style={{ width: '150px', height: 'auto', marginRight: '10px' }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            
                            {trip.bus && (
                                <div>
                                    {!selectedTrips.some(selectedTrip => selectedTrip.tripId === trip._id) ? (
                                        <button 
                                            onClick={() => handleViewSeats(trip._id, trip.date)}
                                            style={{ padding: '8px 16px', fontSize: '14px', cursor: 'pointer' }}
                                        >
                                            View Seats
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={() => handleHideSeats(trip._id)}
                                            style={{ padding: '8px 16px', fontSize: '14px', cursor: 'pointer' }}
                                        >
                                            Hide Seats
                                        </button>
                                    )}
                                </div>
                            )}

                            
                            {selectedTrips.some(selectedTrip => selectedTrip.tripId === trip._id) && (
                                <SeatSelection
                                    tripId={trip._id}
                                    journeyDate={trip.date}
                                />
                            )}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default UserBusList;

*/
/*
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SeatSelection from './SeatSelections';

const UserBusList = () => {
    const [selectedTrips, setSelectedTrips] = useState([]);
    const [showImages, setShowImages] = useState({});
    const [filters, setFilters] = useState({
        priceRange: '',
        sortBy: 'price',
        sortOrder: 'low-to-high',
    });

    const { trips, loading, error } = useSelector((state) => state.trips);

    // Apply filters and sorting to trips
    const applyFiltersAndSorting = () => {
        let filteredTrips = [...trips];

        // Apply price range filter
        if (filters.priceRange) {
            const [minPrice, maxPrice] = filters.priceRange.split('-').map(Number);
            filteredTrips = filteredTrips.filter(trip => trip.price >= minPrice && trip.price <= maxPrice);
        }

        // Sorting by price or rating
        if (filters.sortBy === 'price') {
            filteredTrips = filteredTrips.sort((a, b) => 
                filters.sortOrder === 'low-to-high' ? a.price - b.price : b.price - a.price
            );
        } else if (filters.sortBy === 'rating') {
            filteredTrips = filteredTrips.sort((a, b) => 
                filters.sortOrder === 'low-to-high' ? a.rating - b.rating : b.rating - a.rating
            );
        }

        return filteredTrips;
    };

    // Handle price range, sorting changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    // Handle seat selection visibility
    const handleViewSeats = (tripId, date) => {
        if (!selectedTrips.some(trip => trip.tripId === tripId)) {
            setSelectedTrips([...selectedTrips, { tripId, journeyDate: date }]);
        }
    };

    const handleHideSeats = (tripId) => {
        setSelectedTrips(selectedTrips.filter(trip => trip.tripId !== tripId));
    };

    const handleToggleImages = (tripId) => {
        setShowImages((prev) => ({
            ...prev,
            [tripId]: !prev[tripId],
        }));
    };

    if (loading) {
        return <p>Loading trips...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    // Apply filters and sorting before rendering the trips
    const filteredTrips = applyFiltersAndSorting();

    return (
        <div>
            <h2>Available Buses</h2>

            
            <div>
                <label>
                    Price Range:
                    <select
                        name="priceRange"
                        value={filters.priceRange}
                        onChange={handleFilterChange}
                    >
                        <option value="">Select Price Range</option>
                        <option value="0-500">0 - 500</option>
                        <option value="500-750">500 - 750</option>
                        <option value="750-1000">750 - 1000</option>
                    </select>
                </label>

              

                <label>
                    Sort Order:
                    <select
                        name="sortOrder"
                        value={filters.sortOrder}
                        onChange={handleFilterChange}
                    >
                        <option value="low-to-high">Low to High</option>
                        <option value="high-to-low">High to Low</option>
                    </select>
                </label>
            </div>

           
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {filteredTrips.length === 0 ? (
                    <p>No buses found for the selected route and date.</p>
                ) : (
                    filteredTrips.map((trip) => (
                        <li
                            key={trip._id}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginBottom: '15px',
                                alignItems: 'center',
                            }}
                        >
                            <p style={{ marginRight: '20px' }}>
                                <strong>Route:</strong><br /> {trip.routeID.from} - {trip.routeID.to}
                            </p>
                            <p style={{ marginRight: '20px' }}>
                                <strong>Date:</strong> {new Date(trip.date).toLocaleDateString()}
                            </p>
                            <p style={{ marginRight: '20px' }}>
                                <strong>Departure:</strong> {trip.departure} - <strong>Arrival:</strong> {trip.arrival}
                            </p>
                            <p style={{ marginRight: '20px' }}>
                                <strong>Bus Name:</strong> {trip.bus ? trip.bus.busName : 'N/A'}
                            </p>
                            <p style={{ marginRight: '20px' }}>
                                <strong>Bus Number:</strong> {trip.bus ? trip.bus.busNumber : 'N/A'}
                            </p>
                            <p style={{ marginRight: '20px' }}>
                                <strong>Price:</strong> {trip.price ? `Rs${trip.price}` : 'N/A'}
                            </p>
                            <p style={{ marginRight: '20px' }}>
                                <strong>Amenities:</strong> {trip.bus && trip.bus.amenities ? trip.bus.amenities.join(', ') : 'N/A'}
                            </p>

                           
                            {trip.bus && trip.bus.images && trip.bus.images.length > 0 && (
                                <div>
                                    <button onClick={() => handleToggleImages(trip._id)}>
                                        {showImages[trip._id] ? 'Hide Photos' : 'View Photos'}
                                    </button>
                                    {showImages[trip._id] && (
                                        <div>
                                            <strong>Bus Images:</strong>
                                            {trip.bus.images.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image}
                                                    alt={`Bus Image ${index + 1}`}
                                                    style={{
                                                        width: '150px',
                                                        height: 'auto',
                                                        marginRight: '10px',
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            
                            {trip.bus && (
                                <div>
                                    {!selectedTrips.some((selectedTrip) => selectedTrip.tripId === trip._id) ? (
                                        <button
                                            onClick={() => handleViewSeats(trip._id, trip.date)}
                                            style={{ padding: '8px 16px', fontSize: '14px', cursor: 'pointer' }}
                                        >
                                            View Seats
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleHideSeats(trip._id)}
                                            style={{ padding: '8px 16px', fontSize: '14px', cursor: 'pointer' }}
                                        >
                                            Hide Seats
                                        </button>
                                    )}
                                </div>
                            )}

                            {selectedTrips.some((selectedTrip) => selectedTrip.tripId === trip._id) && (
                                <SeatSelection tripId={trip._id} journeyDate={trip.date} />
                            )}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default UserBusList;
*/



  {/* Display Message if No Trips Match the Filter 
            {noMatchingTrips && (
                <p>No trips match the selected filters. You can try a different filter.</p>
            )}
                */}

/*

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SeatSelection from './SeatSelections';
import { searchTripsWithFilters } from '../actions/tripActions'; // Action to filter and sort trips

const UserBusList = () => {
    const [selectedTrips, setSelectedTrips] = useState([]);
    const [showImages, setShowImages] = useState({});
    const [filters, setFilters] = useState({
        priceRange: '',
        sortBy: 'price',
        sortOrder: 'low-to-high',
    });
    const [filteredTrips, setFilteredTrips] = useState([]);
    const [noMatchingTrips, setNoMatchingTrips] = useState(false);

    const dispatch = useDispatch();
    const { trips, loading, error } = useSelector((state) => state.trips);

    // Apply filters locally on trips already fetched
    useEffect(() => {
        if (trips.length > 0) {
            let updatedTrips = [...trips];

            // Apply price range filter
            if (filters.priceRange) {
                const [min, max] = filters.priceRange.split('-').map(Number);
                updatedTrips = updatedTrips.filter(
                    (trip) => trip.price >= min && trip.price <= max
                );
            }

            // Apply sorting
            if (filters.sortBy === 'price') {
                updatedTrips = updatedTrips.sort((a, b) =>
                    filters.sortOrder === 'low-to-high'
                        ? a.price - b.price
                        : b.price - a.price
                );
            } else if (filters.sortBy === 'rating') {
                updatedTrips = updatedTrips.sort((a, b) =>
                    filters.sortOrder === 'low-to-high'
                        ? a.rating - b.rating
                        : b.rating - a.rating
                );
            }

            setFilteredTrips(updatedTrips);

            // Check if no trips match
            if (updatedTrips.length === 0) {
                setNoMatchingTrips(true);
            } else {
                setNoMatchingTrips(false);
            }
        }
    }, [filters, trips]);

    // Handle price range, sorting changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
        console.log(`Filter changed - ${name}: ${value}`); // Debugging: Log the specific filter change
    };

    // Handle seat selection visibility
    const handleViewSeats = (tripId, date) => {
        if (!selectedTrips.some((trip) => trip.tripId === tripId)) {
            console.log(`Adding seat selection for tripId: ${tripId}, date: ${date}`); // Debugging: Log seat selection
            setSelectedTrips([...selectedTrips, { tripId, journeyDate: date }]);
        }
    };

    const handleHideSeats = (tripId) => {
        console.log(`Removing seat selection for tripId: ${tripId}`); // Debugging: Log seat deselection
        setSelectedTrips(selectedTrips.filter((trip) => trip.tripId !== tripId));
    };

    const handleToggleImages = (tripId) => {
        console.log(`Toggling images for tripId: ${tripId}`); // Debugging: Log image toggling
        setShowImages((prev) => ({
            ...prev,
            [tripId]: !prev[tripId],
        }));
    };

    if (loading) {
        console.log('Loading trips...'); // Debugging: Log loading state
        return <p>Loading trips...</p>;
    }

    if (error) {
        console.error('Error fetching trips:', error); // Debugging: Log error state
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2>Available Buses</h2>

            
            <div>
                <label>
                    Price Range:
                    <select
                        name="priceRange"
                        value={filters.priceRange}
                        onChange={handleFilterChange}
                    >
                        <option value="">Select Price Range</option>
                        <option value="0-500">0 - 500</option>
                        <option value="500-750">500 - 750</option>
                        <option value="750-1000">750 - 1000</option>
                    </select>
                </label>

              

                <label>
                    Sort Order:
                    <select
                        name="sortOrder"
                        value={filters.sortOrder}
                        onChange={handleFilterChange}
                    >
                        <option value="low-to-high">Low to High</option>
                        <option value="high-to-low">High to Low</option>
                    </select>
                </label>
            </div>

          

            
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {filteredTrips.length === 0 ? (
                    <p>No trips match the selected filters. You can try a different filter.</p>
                   
                ) : (
                    filteredTrips.map((trip) => (
                        <li
                            key={trip._id}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginBottom: '15px',
                                alignItems: 'center',
                            }}
                        >
                            <p style={{ marginRight: '20px' }}>
                                <strong>Route:</strong><br /> {trip.routeID.from} - {trip.routeID.to}
                            </p>
                            <p style={{ marginRight: '20px' }}>
                                <strong>Date:</strong> {new Date(trip.date).toLocaleDateString()}
                            </p>
                            <p style={{ marginRight: '20px' }}>
                                <strong>Departure:</strong> {trip.departure} - <strong>Arrival:</strong> {trip.arrival}
                            </p>
                            <p style={{ marginRight: '20px' }}>
                                <strong>Bus Name:</strong> {trip.bus ? trip.bus.busName : 'N/A'}
                            </p>
                            <p style={{ marginRight: '20px' }}>
                                <strong>Bus Number:</strong> {trip.bus ? trip.bus.busNumber : 'N/A'}
                            </p>
                            <p style={{ marginRight: '20px' }}>
                                <strong>Price:</strong> {trip.price ? `Rs${trip.price}` : 'N/A'}
                            </p>
                            <p style={{ marginRight: '20px' }}>
                                <strong>Amenities:</strong> {trip.bus && trip.bus.amenities ? trip.bus.amenities.join(', ') : 'N/A'}
                            </p>

                           
                            {trip.bus && trip.bus.images && trip.bus.images.length > 0 && (
                                <div>
                                    <button onClick={() => handleToggleImages(trip._id)}>
                                        {showImages[trip._id] ? 'Hide Photos' : 'View Photos'}
                                    </button>
                                    {showImages[trip._id] && (
                                        <div>
                                            <strong>Bus Images:</strong>
                                            {trip.bus.images.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image}
                                                    alt={`Bus Image ${index + 1}`}
                                                    style={{
                                                        width: '150px',
                                                        height: 'auto',
                                                        marginRight: '10px',
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                          
                            {trip.bus && (
                                <div>
                                    {!selectedTrips.some((selectedTrip) => selectedTrip.tripId === trip._id) ? (
                                        <button
                                            onClick={() => handleViewSeats(trip._id, trip.date)}
                                            style={{ padding: '8px 16px', fontSize: '14px', cursor: 'pointer' }}
                                        >
                                            View Seats
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleHideSeats(trip._id)}
                                            style={{ padding: '8px 16px', fontSize: '14px', cursor: 'pointer' }}
                                        >
                                            Hide Seats
                                        </button>
                                    )}
                                </div>
                            )}

                            {selectedTrips.some((selectedTrip) => selectedTrip.tripId === trip._id) && (
                                <SeatSelection tripId={trip._id} journeyDate={trip.date} />
                            )}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default UserBusList;
*/

