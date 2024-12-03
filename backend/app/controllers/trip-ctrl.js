/*
const Trip = require('../models/trip-model');
const Bus = require('../models/bus-model');
const Route = require('../models/route-model');
const tripCtrl = {};
/*
// Add a new trip
tripCtrl.addTrip = async (req, res) => {
    try {
        const { busId, tripDate, price, departureTime, arrivalTime, routeID } = req.body;

        // Fetch the bus by ID to get the seat layout
        const bus = await Bus.findById(busId);

        if (!bus) {
            return res.status(404).json({ error: 'Bus not found' });
        }

        // Create the trip with the bus seat layout and routeID
        const trip = new Trip({
            bus: busId,
            routeID: routeID, // Add the routeID here
            date: tripDate,
            arrival: arrivalTime,
            departure: departureTime,
            price,
            seatLayout: bus.seatLayout
        });

        await trip.save();
        res.status(201).json(trip);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



tripCtrl.addTrip = async (req, res) => {
    try {
        const { busId, tripDate, price, departureTime, arrivalTime, routeID, repeatTrip, repeatInterval } = req.body;

        // Fetch the bus by ID to get the seat layout
        const bus = await Bus.findById(busId);
        if (!bus) {
            return res.status(404).json({ error: 'Bus not found' });
        }

        // Parse the initial trip date
        let currentDate = new Date(tripDate);

        const trips = [];

        // Create trips (repeat if necessary)
        while (true) {
            const trip = new Trip({
                bus: busId,
                routeID: routeID,
                date: currentDate.toISOString(),
                arrival: arrivalTime,
                departure: departureTime,
                price,
                seatLayout: bus.seatLayout
            });

            // Save each trip
            await trip.save();
            trips.push(trip);

            // If repeatTrip is false, break after creating the first trip
            if (!repeatTrip) break;

            // Add the interval to the date for the next trip (repeatInterval days)
            currentDate.setDate(currentDate.getDate() + repeatInterval);

            // Stop after repeating for a defined number of trips (e.g., 10 repeats)
            if (trips.length >= 10) break;
        }

        res.status(201).json(trips); // Return the list of trips created
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Fetch seat layout for a specific trip
tripCtrl.getSeatLayout = async (req, res) => {
    const { tripId } = req.params;
    try {
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.json(trip.seatLayout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// List all trips for a specific bus
tripCtrl.listTrips = async (req, res) => {
    const { busId } = req.params;
    try {
        const trips = await Trip.find({ bus: busId });
        res.json(trips);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing trip
tripCtrl.updateTrip = async (req, res) => {
    const { tripId } = req.params;
    try {
        const trip = await Trip.findByIdAndUpdate(tripId, { ...req.body }, { new: true });
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.json(trip);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single trip by ID
tripCtrl.getSingleTrip = async (req, res) => {
    const { tripId } = req.params;
    try {
        const trip = await Trip.findById(tripId).populate('bus');
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.json(trip);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a trip
tripCtrl.deleteTrip = async (req, res) => {
    const { tripId } = req.params;
    try {
        const trip = await Trip.findByIdAndDelete(tripId);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.json({ message: 'Trip deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search trips based on source, destination, and date
tripCtrl.searchTrips = async (req, res) => {
    const { from, to, date } = req.query;

    try {
        console.log('Search Criteria:', { from, to, date });

        // Find routes that match the source and destination
        const routes = await Route.find({ from, to }).lean();
        console.log('Matching Routes:', routes);

        if (routes.length === 0) {
            console.log('No routes found matching the search criteria.');
            return res.status(404).json({ message: 'No routes found matching the search criteria.' });
        }

        const routeIds = routes.map(route => route._id);
        console.log('Route IDs for Search:', routeIds);

        // Ensure dates are parsed correctly
        const startDate = new Date(date);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1);

        console.log('Searching for trips between:', startDate.toISOString(), 'and', endDate.toISOString());

        // Find trips with the matching routeID and date range
        const trips = await Trip.find({
            routeID: { $in: routeIds },
            date: { $gte: startDate, $lt: endDate }
        }).populate('bus').lean();

        console.log('Query Used:', {
            routeID: { $in: routeIds },
            date: { $gte: startDate, $lt: endDate }
        });

        console.log('Found Trips:', trips);

        if (trips.length === 0) {
            console.log('No trips found matching the search criteria.');
            return res.status(404).json({ message: 'No trips found matching the search criteria.' });
        }

        res.json(trips);
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ error: error.message });
    }
};



module.exports = tripCtrl;



const Trip = require('../models/trip-model');
const Bus = require('../models/bus-model');
const Route = require('../models/route-model');
const tripCtrl = {};

// Add a new trip with option to repeat
tripCtrl.addTrip = async (req, res) => {
    try {
        const { busId, tripDate, price, departureTime, arrivalTime, routeID, repeatTrip, repeatInterval } = req.body;

        // Fetch the bus by ID to get the seat layout
        const bus = await Bus.findById(busId);
        if (!bus) {
            return res.status(404).json({ error: 'Bus not found' });
        }

        // Parse the initial trip date
        let currentDate = new Date(tripDate);
        const trips = [];

        // Create trips (repeat if necessary)
        while (true) {
            const trip = new Trip({
                bus: busId,
                routeID: routeID,
                date: currentDate.toISOString(),
                arrival: arrivalTime,
                departure: departureTime,
                price,
                seatLayout: bus.seatLayout
            });

            // Save each trip
            await trip.save();
            trips.push(trip);

            // If repeatTrip is false, break after creating the first trip
            if (!repeatTrip) break;

            // Add the interval to the date for the next trip (repeatInterval days)
            currentDate.setDate(currentDate.getDate() + repeatInterval);

            // Stop after repeating for a defined number of trips (e.g., 10 repeats)
            if (trips.length >= 10) break;
        }

        res.status(201).json(trips); // Return the list of trips created
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Fetch seat layout for a specific trip
tripCtrl.getSeatLayout = async (req, res) => {
    const { tripId } = req.params;
    try {
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.json(trip.seatLayout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// List all trips for a specific bus
tripCtrl.listTrips = async (req, res) => {
    const { busId } = req.params;
    try {
        const trips = await Trip.find({ bus: busId });
        res.json(trips);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search trips based on source, destination, and date
tripCtrl.searchTrips = async (req, res) => {
    const { from, to, date } = req.query;

    try {
        const routes = await Route.find({ from, to }).lean();

        if (routes.length === 0) {
            return res.status(404).json({ message: 'No routes found matching the search criteria.' });
        }

        const routeIds = routes.map(route => route._id);
        const startDate = new Date(date);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1);

        const trips = await Trip.find({
            routeID: { $in: routeIds },
            date: { $gte: startDate, $lt: endDate }
        }).populate('bus').lean();

        if (trips.length === 0) {
            return res.status(404).json({ message: 'No trips found matching the search criteria.' });
        }

        res.json(trips);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = tripCtrl;
*/


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
                select: 'busName busNumber busCapacity seatLayout', // Select only necessary fields
            })
            .populate({
                path: 'routeID', // Populate route details
                select: 'from to duration distance', // Select only necessary fields
            });

        if (trips.length === 0) {
            return res.status(404).json({ message: 'No trips found for this operator' });
        }

        // Send the list of trips with populated bus and route details
        res.json(trips);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update a trip (new)
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

        trip.date = tripDate || trip.date;
        trip.departure = departureTime || trip.departure;
        trip.arrival = arrivalTime || trip.arrival;
        trip.price = price || trip.price;

        await trip.save();
        res.json({ message: 'Trip updated successfully', trip });
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

// Fetch Seat Layout (when "View Seats" is clicked)
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
