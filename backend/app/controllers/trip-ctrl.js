


const Trip = require('../models/trip-model');
const Bus = require('../models/bus-model');
const Route = require('../models/route-model');
const Operator = require('../models/operator-model');
const tripCtrl = {};


tripCtrl.addTrip = async (req, res) => {
    try {
        const {
            busId, tripDate, departureTime, arrivalTime, price, from, to, duration, distance, repeatTrip, repeatInterval
        } = req.body;

        // Fetch the bus to ensure it exists
        const bus = await Bus.findById(busId);
        if (!bus) {
            return res.status(404).json({ error: 'Bus not found' });
        }

        // Create the route
        const route = new Route({
            from,
            to,
            duration,
            distance
        });
        await route.save();

        // Parse the initial trip date
        let currentDate = new Date(tripDate);
        const trips = [];

        // Create multiple trips if repeat is enabled
        while (true) {
            const trip = new Trip({
                bus: busId,
                routeID: route._id,  // Assign the newly created route
                date: currentDate,
                departure: departureTime,
                arrival: arrivalTime,
                price:price
            });

            // Save each trip
            await trip.save();
            trips.push(trip);

            // If repeat is not required, break after the first trip
            if (!repeatTrip) break;

            // Increment the date by the repeat interval (e.g., every 7 days)
            currentDate.setDate(currentDate.getDate() + repeatInterval);

            // Stop after a predefined number of repeats (e.g., 10 repeats)
            if (trips.length >= 10) break;
        }

        res.status(201).json(trips); // Return the created trips
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// In trip-ctrl.js (trip controller file)
tripCtrl.Routes = async (req, res) => {
    try {
        // Fetch all trips from the database
        const trips = await Trip.find({})
            .populate('bus')       // Populate bus details
            .populate('routeID');   // Populate route details
        
        // Send the trips as a JSON response
        res.json(trips);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// List all trips for a specific bus or operator
tripCtrl.listTrips = async (req, res) => {
    try {
        // Find the operator based on the authenticated user's ID
        const operator = await Operator.findOne({ userID: req.user.id });
        if (!operator) {
            return res.status(404).json({ message: 'Operator not found' });
        }

        // Find all buses belonging to the operator
        const buses = await Bus.find({ operatorID: operator._id }).select('_id');

        if (!buses || buses.length === 0) {
            return res.status(404).json({ message: 'No buses found for this operator' });
        }

        // Fetch trips for the operator's buses
        const busIds = buses.map(bus => bus._id);
        const trips = await Trip.find({ bus: { $in: busIds } })
            .populate({
                path: 'bus',   // Populate bus details
                select: 'busName busNumber busCapacity seatLayout images', // Select only necessary fields
            })
            .populate({
                path: 'routeID', // Populate route details
                select: 'from to duration distance', // Select only necessary fields
            })
            .select('price date departure arrival');
 // Select the price field here

        if (trips.length === 0) {
            return res.status(404).json({ message: 'No trips found for this operator' });
        }

        // Send the list of trips with populated bus, route details, and price
        res.json(trips);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};






tripCtrl.updateTrip = async (req, res) => {
    const { tripId } = req.params;
    const { busId, tripDate, departureTime, arrivalTime, price, from, to, duration, distance } = req.body;

    try {
        const trip = await Trip.findById(tripId);
        if (!trip) return res.status(404).json({ message: 'Trip not found' });

        // Fetch the bus and route if necessary
        if (busId) {
            const bus = await Bus.findById(busId);
            if (!bus) return res.status(404).json({ message: 'Bus not found' });
            trip.bus = busId;
        }

        if (from && to) {
            const route = await Route.findById(trip.routeID);
            if (route) {
                route.from = from;
                route.to = to;
                route.duration = duration || route.duration;
                route.distance = distance || route.distance;
                await route.save();
            }
        }

        // Update other trip details
        trip.date = tripDate || trip.date;
        trip.departure = departureTime || trip.departure;
        trip.arrival = arrivalTime || trip.arrival;
        trip.price = price || trip.price;

        await trip.save();

        // Populate bus and routeID in the updated trip before sending response
        const updatedTrip = await Trip.findById(trip._id)
            .populate('bus') // Populate the bus field
            .populate('routeID'); // Populate the routeID if necessary

        res.json({ message: 'Trip updated successfully', trip: updatedTrip });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Delete a trip (new)
tripCtrl.deleteTrip = async (req, res) => {
    const { tripId } = req.params;

    try {
        // Find and delete the trip directly, handling any potential errors automatically
        const deletedTrip = await Trip.findByIdAndDelete(tripId);

        // If no trip is found, return a 404 error
        if (!deletedTrip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        // Return a success message if trip was deleted
        res.json({ message: 'Trip deleted successfully' });
    } catch (error) {
        // If there's an error (including invalid ObjectId format), catch it here
        console.error(`Error deleting trip with ID: ${tripId}`, error);
        res.status(500).json({ error: 'Server error or invalid trip ID format' });
    }
};


// Search trips based on source, destination, and date
tripCtrl.searchTrips = async (req, res) => {
    const { from, to, date } = req.query;
    try {
        console.log(`Searching routes for: { from: '${from}', to: '${to}', date: '${date}' }`);

        const routes = await Route.find({ from, to }).lean();

        if (routes.length === 0) {
            return res.status(404).json({ message: 'No routes found matching the search criteria.' });
        }

        const routeIds = routes.map(route => route._id);
        const startDate = new Date(date);
        const endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999); // End of the day

        console.log('Matching Route IDs:', routeIds);
        console.log('Searching for trips on date:', startDate, 'to', endDate);

        const trips = await Trip.find({
            routeID: { $in: routeIds },
            date: {
                $gte: startDate.setHours(0, 0, 0, 0), // Start of the day
                $lt: endDate // End of the day
            }
        })
        .populate('bus') // Populate bus data
        .populate('routeID') // Populate route data
        .lean();

        if (trips.length === 0) {
            return res.status(404).json({ message: 'No trips found matching the search criteria.' });
        }

        res.json(trips);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



tripCtrl.getTripsWithFilters = async (req, res) => {
    const { from, to, date, price, rating, amenities, sortBy, sortOrder, page = 1, limit = 10 } = req.query;
    
    console.log('Received query parameters:', req.query);  // Log the query parameters
    
    try {
        // Step 1: Find matching routes based on 'from' and 'to'
        const routes = await Route.find({ from, to }).lean();

        if (routes.length === 0) {
            return res.status(404).json({ message: 'No routes found matching the search criteria.' });
        }

        const routeIds = routes.map(route => route._id);
        const startDate = new Date(date);
        const endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999); // End of the day

        // Step 2: Build initial search query based on routes and date
        let searchQuery = {
            routeID: { $in: routeIds },
            date: {
                $gte: startDate.setHours(0, 0, 0, 0), // Start of the day
                $lt: endDate // End of the day
            }
        };

        // Step 3: Apply price filter if provided
        if (price) {
            const priceRange = price.split('-');
            if (priceRange.length === 2) {
                searchQuery.price = { $gte: parseFloat(priceRange[0]), $lte: parseFloat(priceRange[1]) };
            }
        }

        // Step 4: Apply rating filter if provided
        if (rating) {
            searchQuery['bus.rating'] = { $gte: parseFloat(rating) };
        }

        // Step 5: Apply amenities filter if provided
        if (amenities) {
            const amenitiesList = amenities.split(',').map(amenity => amenity.trim()).filter(Boolean);
            console.log('Parsed amenities:', amenitiesList);  // Log the parsed amenities list
            searchQuery['bus.amenities'] = { $all: amenitiesList }; // Match all amenities in the bus's amenities array
        }

        // Step 6: Apply sorting if provided
        const sortOptions = {};
        const validSortFields = ['price', 'rating', 'date'];
        if (sortBy && validSortFields.includes(sortBy)) {
            sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        } else if (sortBy) {
            return res.status(400).json({ message: `Invalid sortBy field: ${sortBy}` });
        } else {
            sortOptions.date = 1; // Default to sorting by date ascending if no sortBy is specified
        }

        // Log the final search query
        console.log('Final search query:', searchQuery);  // Log the final search query

        // Step 7: Find trips based on search query with filters, sorting, and pagination
        const trips = await Trip.find(searchQuery)
            .populate('bus')  // Populate the bus details
            .populate('routeID')  // Populate the route details
            .sort(sortOptions) // Sorting applied here
            .skip((page - 1) * limit) // Pagination
            .limit(limit);

        if (trips.length === 0) {
            return res.status(404).json({ message: 'No trips found matching the search criteria.' });
        }

        // Step 8: Get the total count for pagination
        const total = await Trip.countDocuments(searchQuery);

        // Step 9: Send the response with trips and pagination info
        res.json({
            data: trips,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });

    } catch (error) {
        console.error('Error fetching trips:', error);
        res.status(500).json({ error: error.message });
    }
};



tripCtrl.getSeatLayout = async (req, res) => {
    const { tripId } = req.params;

    try {
        const trip = await Trip.findById(tripId).populate('bus');
        if (!trip) return res.status(404).json({ message: 'Trip not found' });
        if (!trip.bus) return res.status(404).json({ message: 'Bus not found for this trip' });

        const seatLayout = trip.bus.seatLayout;
        if (!seatLayout) return res.status(404).json({ message: 'Seat layout not found for this bus' });

        res.json(seatLayout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




module.exports = tripCtrl;
