
/*

const Bus = require('../models/bus-model');
const Route = require('../models/route-model');
const Operator = require('../models/operator-model');
const mongoose = require('mongoose');
const busCtrl = {};

// Add a new bus (used by the operator)
busCtrl.addBusWithRouteAndOperator = async (req, res) => {
    try {
        console.log(req.body)
        const {
            busName, busNumber, busCapacity, price, amenities, rating, arrival, departure,
            from, to, duration, distance, email, phone, rows, seatsPerRow
        } = req.body;
        const operatorUserID = req.user.id;

        // Create the Route
        const route = new Route({
            from,
            to,
            duration,
            distance
        });
        await route.save();

        // Check if the operator already exists to avoid duplication
        let operator = await Operator.findOne({ userID: operatorUserID });
        if (!operator) {
            // Generate a unique username (e.g., from email or userID)
            const username = email.split('@')[0] || `operator_${operatorUserID}`;

            // Create the Operator
            operator = new Operator({
                userID: new mongoose.Types.ObjectId(operatorUserID),
                email,
                phone,
                username  // Ensure the username is set
            });
            await operator.save();
        }

        // Generate the seat layout
        const generatedSeatLayout = [];
        let seatNumber = 1;

        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < seatsPerRow; j++) {
                if (seatNumber <= busCapacity) {
                    row.push({
                        seatNumber: `${seatNumber++}`,
                        isBooked: false
                    });
                }
            }
            generatedSeatLayout.push(row);
        }

        // Create the Bus
        const bus = new Bus({
            busName,
            busNumber,
            busCapacity,
            price,
            amenities,
            rating,
            arrival,
            departure,
            seatLayout: generatedSeatLayout,
            routeID: route._id,
            operatorID: operator._id
        });
        await bus.save();

        res.status(201).json(bus);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// List all buses for the logged-in operator
busCtrl.listBuses = async (req, res) => {
    try {
        const userId = req.user.id;

        console.log('User ID:', userId); // Debugging line

        // Find the Operator for the logged-in user
        const operator = await Operator.findOne({ userID: userId });
        console.log('Found Operator:', operator); // Debugging line

        if (!operator) {
            return res.status(404).json({ message: 'Operator not found for this user' });
        }

        // Find buses based on the operator's ID and populate the routeID field
        const buses = await Bus.find({ operatorID: operator._id }).populate('routeID');
        console.log('Found Buses:', buses); // Debugging line

        if (buses.length === 0) {
            return res.status(404).json({ message: 'No buses found for this operator' });
        }

        res.json(buses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing bus
busCtrl.updateBus = async (req, res) => {
    const { busId } = req.params;
    try {
        const bus = await Bus.findByIdAndUpdate(busId, { ...req.body }, { new: true });
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }
        res.json(bus);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single bus by ID
busCtrl.getSingleBus = async (req, res) => {
    const busId = req.params.id; // Make sure to match the route parameter
    try {
        const bus = await Bus.findById(busId).populate('routeID'); // Populate 'routeID'
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }
        res.json(bus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Delete a bus
busCtrl.deleteBus = async (req, res) => {
    const { busId } = req.params;
    try {
        const bus = await Bus.findByIdAndDelete(busId);
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }
        res.json({ message: 'Bus deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = busCtrl;
*/


const Bus = require('../models/bus-model');
const Route = require('../models/route-model');
const Operator = require('../models/operator-model');
const mongoose = require('mongoose');

const busCtrl = {};

// Add a new bus (for logged-in operator)
busCtrl.addBus = async (req, res) => {
    try {
        const {
            busName, busNumber, busCapacity, amenities, rating, email, phone, rows, seatsPerRow
        } = req.body;

        const operatorUserID = req.user.id; // Assuming req.user contains the logged-in user info

        // Check if the operator exists to avoid duplication
        let operator = await Operator.findOne({ userID: operatorUserID });
        if (!operator) {
            const username = email.split('@')[0] || `operator_${operatorUserID}`;
            operator = new Operator({
                userID: operatorUserID,
                email,
                phone,
                username
            });
            await operator.save();
        }

        // Generate the seat layout dynamically
        const seatLayout = [];
        let seatNumber = 1;

        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < seatsPerRow; j++) {
                if (seatNumber <= busCapacity) {
                    row.push({ seatNumber: `${seatNumber++}`, isBooked: false });
                }
            }
            seatLayout.push(row);
        }

        // Create the Bus
        const bus = new Bus({
            busName,
            busNumber,
            busCapacity,
            amenities,
            rating,
            seatLayout,
            operatorID: operator._id
        });
        await bus.save();

        res.status(201).json(bus);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// List all buses for the logged-in operator
busCtrl.listBuses = async (req, res) => {
    try {
        const operator = await Operator.findOne({ userID: req.user.id });
        if (!operator) {
            return res.status(404).json({ message: 'Operator not found' });
        }

        const buses = await Bus.find({ operatorID: operator._id }).populate('routeID');
        if (buses.length === 0) {
            return res.status(404).json({ message: 'No buses found for this operator' });
        }

        res.json(buses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get a single bus by ID
busCtrl.getSingleBus = async (req, res) => {
    const busId = req.params.id; // Make sure to match the route parameter
    try {
        const bus = await Bus.findById(busId).populate('routeID'); // Populate 'routeID'
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }
        res.json(bus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing bus
busCtrl.updateBus = async (req, res) => {
    const { busId } = req.params;
    try {
        const bus = await Bus.findByIdAndUpdate(busId, { ...req.body }, { new: true });
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }
        res.json(bus);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a bus
busCtrl.deleteBus = async (req, res) => {
    const { busId } = req.params;
    try {
        const bus = await Bus.findByIdAndDelete(busId);
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }
        res.json({ message: 'Bus deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = busCtrl;
