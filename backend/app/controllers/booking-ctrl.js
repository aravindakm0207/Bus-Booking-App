

const Booking = require('../models/booking-model');
const Trip = require('../models/trip-model');
const Bus = require('../models/bus-model');
const Payment = require('../models/payment-model');
const mongoose = require('mongoose');

const bookingCltr = {};

// Helper function to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

bookingCltr.createBooking = async (req, res) => {
    const { tripId, seatsBooked, journeyDate, name, email, phone } = req.body;

    // Validate if tripId is a valid ObjectId
    if (!isValidObjectId(tripId)) {
        return res.status(400).json({ message: 'Invalid trip ID format' });
    }

    try {
        console.log('Received Booking Request:', { tripId, seatsBooked, journeyDate, name, email, phone });

        // Validate inputs
        if (!Array.isArray(seatsBooked) || seatsBooked.length === 0) {
            console.error('Invalid seatsBooked:', seatsBooked);
            return res.status(400).json({ message: 'SeatsBooked must be a non-empty array.' });
        }

        // Retrieve trip and associated bus
        const trip = await Trip.findById(tripId).populate('bus');
        if (!trip) {
            console.error('Trip not found for tripId:', tripId);
            return res.status(404).json({ message: 'Trip not found.' });
        }

        const bus = trip.bus;
        if (!bus) {
            console.error('Bus not found for trip:', tripId);
            return res.status(404).json({ message: 'Bus not found for this trip.' });
        }

        // Validate trip price
        if (typeof trip.price !== 'number' || isNaN(trip.price)) {
            console.error('Invalid trip price:', trip.price);
            return res.status(400).json({ message: 'Invalid trip price.' });
        }

        // Check if requested seats are available
        const unavailableSeats = bus.seatLayout.flat().filter(seat =>
            seatsBooked.includes(seat.seatNumber) && seat.isBooked
        );
        if (unavailableSeats.length) {
            return res.status(400).json({ message: 'Some selected seats are already booked.' });
        }

        // Mark seats as booked
        bus.seatLayout = bus.seatLayout.map(row =>
            row.map(seat => (seatsBooked.includes(seat.seatNumber) ? { ...seat, isBooked: true } : seat))
        );
        await bus.save();

        // Calculate total amount
        const totalAmount = trip.price * seatsBooked.length;

        const booking = new Booking({
            user: req.user.id,
            trip: tripId,
            bus: bus,
            seatsBooked,
            totalAmount,
            journeyDate,
            name,
            email,
            phone,
            routeID: trip.routeID 
        });

        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        console.error('Booking Error:', error);
        res.status(400).json({ error: error.message });
    }
};














bookingCltr.getBookingsByUser = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you are using JWT or some form of session to get the logged-in user's ID.

        // Fetch all bookings for the logged-in user
        const bookings = await Booking.find({ user: userId })
            .populate('trip') // Populate trip details
            .populate('bus')  // Populate bus details
            .exec();

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this user' });
        }

        // Return the bookings
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings by user:', error);
        res.status(400).json({ error: error.message });
    }
};




bookingCltr.getBookingById = async (req, res) => {
    const { bookingId } = req.params;

    // Validate if bookingId is a valid ObjectId
    if (!isValidObjectId(bookingId)) {
        return res.status(400).json({ message: 'Invalid booking ID format' });
    }

    try {
        // Fetch the booking by bookingId, only if the booking belongs to the authenticated user
        const booking = await Booking.findOne({ _id: bookingId, user: req.user.id })
            .select('bookingId bus seatsBooked status totalAmount trip') // Only select specific fields
            .populate('trip', 'journeyDate departure destination') // Populate trip with specific fields
            .populate('bus', 'busName busNumber')  // Populate bus with specific fields
            .exec();

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found or does not belong to this user' });
        }

        // Return only the required booking details
        res.status(200).json({
            bookingId: booking.bookingId,
            bus: booking.bus,
            seatsBooked: booking.seatsBooked,
            status: booking.status,
            totalAmount: booking.totalAmount,
            trip: booking.trip,
        });
    } catch (error) {
        console.error('Error fetching booking by ID:', error);
        res.status(400).json({ error: error.message });
    }
};




bookingCltr.getBookingsByTrip = async (req, res) => {
    const { tripId } = req.params;

    // Validate if tripId is a valid ObjectId
    if (!isValidObjectId(tripId)) {
        return res.status(400).json({ message: 'Invalid trip ID format' });
    }

    try {
        // Fetch all bookings for the specific trip
        const bookings = await Booking.find({ trip: tripId })
            .populate('user')  // Optionally populate user details
            .populate('bus')   // Optionally populate bus details
            .exec();

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this trip' });
        }

        // Return the bookings
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings by trip:', error);
        res.status(400).json({ error: error.message });
    }
};

bookingCltr.getAllBookings = async (req, res) => {
    try {
        // Fetch all bookings
        const bookings = await Booking.find()
            .populate('user')  // Optionally populate user details
            .populate('trip')  // Optionally populate trip details
            .populate('bus')   // Optionally populate bus details
            .exec();

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found' });
        }

        // Return all bookings
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching all bookings:', error);
        res.status(400).json({ error: error.message });
    }
};
bookingCltr.getTicketDetails = async (req, res) => {
    const { bookingId } = req.params;  // bookingId passed as a URL parameter

    if (!isValidObjectId(bookingId)) {
        return res.status(400).json({ message: 'Invalid booking ID format' });
    }

    try {
        // Fetch the booking by bookingId, populate trip and bus details
        const booking = await Booking.findById(bookingId)
            .populate('trip')
            .populate('bus')
            .exec();

        if (!booking || booking.paymentStatus !== 'successful') {
            return res.status(400).json({ message: 'Payment not completed or booking not found.' });
        }

        // Return ticket details only if payment is successful
        const ticketDetails = {
            bookingId: booking._id,
            journeyDate: booking.journeyDate,
            name: booking.name,
            email: booking.email,
            phone: booking.phone,
            trip: {
                destination: booking.trip.destination,
                price: booking.trip.price,
                departureTime: booking.trip.departureTime,
                arrivalTime: booking.trip.arrivalTime
            },
            bus: {
                busName: booking.bus.name,
                totalSeats: booking.bus.totalSeats
            },
            seatsBooked: booking.seatsBooked,
            totalAmount: booking.totalAmount
        };

        res.status(200).json(ticketDetails);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



module.exports = bookingCltr;
