


const Bus = require('../models/bus-model');
const Route = require('../models/route-model');
const Operator = require('../models/operator-model');
const mongoose = require('mongoose');

const busCtrl = {};
/*
// Add a new bus (for logged-in operator)
busCtrl.addBus = async (req, res) => {
    try {
        console.log('Files:', req.files); // Logs uploaded files
        console.log('Body:', req.body);  // Logs other form data
        const {
            busName, busNumber, busCapacity, amenities, rating, email, phone, rows, seatsPerRow,
        } = req.body;

        const images = req.files.map(file => file.path)
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
            images,
            operatorID: operator._id
        });
        await bus.save();

        res.status(201).json(bus);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

*/

busCtrl.addBus = async (req, res) => {
    try {
        console.log('Files:', req.files); // Logs uploaded files
        console.log('Body:', req.body);  // Logs other form data

        const {
            busName, busNumber, busCapacity, amenities, rating, email, phone, rows, seatsPerRow,
        } = req.body;

        // Validate required fields
        if (!busName || !busNumber || !busCapacity || !rows || !seatsPerRow) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Parse amenities: Ensure it is an array
        let parsedAmenities = [];
        if (amenities) {
            if (Array.isArray(amenities)) {
                parsedAmenities = amenities;
            } else if (typeof amenities === 'string') {
                parsedAmenities = amenities.split(',').map(a => a.trim().replace(/^['"]+|['"]+$/g, ""));
            } else {
                return res.status(400).json({ error: 'Invalid amenities format', received: amenities });
            }
        }
        

       

        const images = req.files.map(file => file.path);
        const operatorUserID = req.user.id; // Assuming req.user contains the logged-in user info

        // Check if the operator exists to avoid duplication
        let operator = await Operator.findOne({ userID: operatorUserID });
        if (!operator) {
            const username = email ? email.split('@')[0] : `operator_${req.user.id}`;
            operator = new Operator({
                userID: operatorUserID,
                email: email || null,
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
            amenities: parsedAmenities, // Use parsed amenities
            rating,
            seatLayout,
            images,
            operatorID: operator._id
        });
        await bus.save();

        res.status(201).json(bus);
    } catch (error) {
        // Enhanced error logging
        console.error('Validation error:', error);
        res.status(400).json({ 
            error: 'Validation failed', 
            details: error.message 
        });
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
