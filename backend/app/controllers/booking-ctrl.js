/*
const Booking = require('../models/booking-model');
const Bus = require('../models/bus-model');
const bookingCltr = {};


// Create a new booking with user details
bookingCltr.createBooking = async (req, res) => {
    try {
        console.log('Booking Request Body:', req.body);
        const { busId, seatsBooked, journeyDate, name, email, phone } = req.body;

        // Fetch the bus details from the database
        const bus = await Bus.findById(busId);

        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        // Log the current seat layout
        console.log('Current Seat Layout:', bus.seatLayout);

        // Log the seats that the user wants to book
        console.log('Seats Requested for Booking:', seatsBooked);

        // Check if seats are already booked for the specified journey date
        const alreadyBookedSeats = bus.seatLayout.flat().filter(seat =>
            seatsBooked.includes(seat.seatNumber) && seat.isBooked
        );

        // Log any seats that are already booked
        console.log('Already Booked Seats:', alreadyBookedSeats);

        if (alreadyBookedSeats.length > 0) {
            return res.status(400).json({ message: 'Some seats are already booked' });
        }

        // Update seat layout with booked seats
        bus.seatLayout = bus.seatLayout.map(row =>
            row.map(seat => {
                if (seatsBooked.includes(seat.seatNumber)) {
                    return { ...seat, isBooked: true };
                }
                return seat;
            })
        );

        await bus.save();

        const totalAmount = bus.price * seatsBooked.length;
        const booking = new Booking({
            user: req.user.id,
            bus: busId,
            seatsBooked,
            totalAmount,
            journeyDate,
            name,
            email,
            phone
        });

        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};








// Get all bookings for a user
bookingCltr.getBookingsByUser = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('bus');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single booking by ID
bookingCltr.getBookingById = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const booking = await Booking.findById(bookingId).populate('bus');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cancel a booking
bookingCltr.cancelBooking = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const booking = await Booking.findById(bookingId).populate('bus');

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Update seat layout to unbook the seats
        const bus = booking.bus;
        bus.seatLayout = bus.seatLayout.map(row =>
            row.map(seat => {
                if (booking.seatsBooked.includes(seat.seatNumber)) {
                    return { ...seat, isBooked: false };
                }
                return seat;
            })
        );

        await bus.save();

        booking.status = 'cancelled';
        await booking.save();

        res.json({ message: 'Booking cancelled successfully', booking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = bookingCltr;


const Booking = require('../models/booking-model');
const Bus = require('../models/bus-model');
const bookingCltr = {};

// Create a booking (after seat selection and form submission)
bookingCltr.createBooking = async (req, res) => {
    try {
        const { busId, seatsBooked, journeyDate, name, email, phone } = req.body;

        const bus = await Bus.findById(busId);
        if (!bus) return res.status(404).json({ message: 'Bus not found' });

        // Check if the seats are already booked
        const alreadyBookedSeats = bus.seatLayout.flat().filter(seat =>
            seatsBooked.includes(seat.seatNumber) && seat.isBooked
        );
        if (alreadyBookedSeats.length) return res.status(400).json({ message: 'Some seats are already booked' });

        // Mark seats as booked
        bus.seatLayout = bus.seatLayout.map(row =>
            row.map(seat => (seatsBooked.includes(seat.seatNumber) ? { ...seat, isBooked: true } : seat))
        );
        await bus.save();

        const totalAmount = bus.price * seatsBooked.length;
        const booking = new Booking({
            user: req.user.id,
            bus: busId,
            seatsBooked,
            totalAmount,
            journeyDate,
            name,
            email,
            phone
        });

        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all bookings for a user
bookingCltr.getBookingsByUser = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('bus');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get booking by ID
bookingCltr.getBookingById = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const booking = await Booking.findById(bookingId).populate('bus');
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cancel a booking
bookingCltr.cancelBooking = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const booking = await Booking.findById(bookingId).populate('bus');
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        const bus = booking.bus;
        bus.seatLayout = bus.seatLayout.map(row =>
            row.map(seat => (booking.seatsBooked.includes(seat.seatNumber) ? { ...seat, isBooked: false } : seat))
        );
        await bus.save();

        booking.status = 'cancelled';
        await booking.save();
        res.json({ message: 'Booking cancelled successfully', booking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = bookingCltr;

*/



const Booking = require('../models/booking-model');
const Trip = require('../models/trip-model');
const Bus = require('../models/bus-model');

const bookingCltr = {};

// Get Seat Layout based on tripId (from Trip and Bus models)
bookingCltr.getSeatLayout = async (req, res) => {
    const { tripId } = req.params;
    try {
        // Find the trip and populate bus details to access seat layout
        const trip = await Trip.findById(tripId).populate('bus');
        if (!trip) return res.status(404).json({ message: 'Trip not found' });
        if (!trip.bus) return res.status(404).json({ message: 'Bus not found for this trip' });

        const seatLayout = trip.bus.seatLayout;
        if (!seatLayout) return res.status(404).json({ message: 'Seat layout not found for this bus' });

        res.json(seatLayout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/*
// Create a booking after selecting seats
bookingCltr.createBooking = async (req, res) => {
    try {
        const { tripId, seatsBooked, journeyDate, name, email, phone } = req.body;

        // Retrieve trip and associated bus
        const trip = await Trip.findById(tripId).populate('bus');
        if (!trip) return res.status(404).json({ message: 'Trip not found' });

        const bus = trip.bus;
        if (!bus) return res.status(404).json({ message: 'Bus not found' });

        // Check if requested seats are available
        const unavailableSeats = bus.seatLayout.flat().filter(seat =>
            seatsBooked.includes(seat.seatNumber) && seat.isBooked
        );
        if (unavailableSeats.length) {
            return res.status(400).json({ message: 'Some selected seats are already booked' });
        }

        // Mark seats as booked
        bus.seatLayout = bus.seatLayout.map(row =>
            row.map(seat => (seatsBooked.includes(seat.seatNumber) ? { ...seat, isBooked: true } : seat))
        );
        await bus.save();

        const totalAmount = trip.price * seatsBooked.length;
        const booking = new Booking({
            user: req.user.id,
            trip: tripId,
            bus: bus._id,
            seatsBooked,
            totalAmount,
            journeyDate,
            name,
            email,
            phone
        });

        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
*/


bookingCltr.createBooking = async (req, res) => {
    try {
        const { tripId, seatsBooked, journeyDate, name, email, phone } = req.body;

        // Validate inputs
        if (!Array.isArray(seatsBooked) || seatsBooked.length === 0) {
            return res.status(400).json({ message: 'SeatsBooked must be a non-empty array.' });
        }

        // Retrieve trip and associated bus
        const trip = await Trip.findById(tripId).populate('bus');
        if (!trip) return res.status(404).json({ message: 'Trip not found.' });

        const bus = trip.bus;
        if (!bus) return res.status(404).json({ message: 'Bus not found for this trip.' });

        console.log('Trip Price:', trip.price); // Debug
        console.log('Seats Booked:', seatsBooked); // Debug

        // Validate trip price
        if (typeof trip.price !== 'number' || isNaN(trip.price)) {
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
        console.log('Total Amount:', totalAmount); // Debug

        const booking = new Booking({
            user: req.user.id,
            trip: tripId,
            bus: bus._id,
            seatsBooked,
            totalAmount,
            journeyDate,
            name,
            email,
            phone
        });

        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        console.error('Booking Error:', error.message);
        res.status(400).json({ error: error.message });
    }
};

// Get all bookings for a user
bookingCltr.getBookingsByUser = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('trip bus');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific booking by ID
bookingCltr.getBookingById = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const booking = await Booking.findById(bookingId).populate('trip bus');
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cancel a booking and release booked seats
bookingCltr.cancelBooking = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const booking = await Booking.findById(bookingId).populate('bus');
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        const bus = booking.bus;
        if (!bus) return res.status(404).json({ message: 'Bus not found for this booking' });

        // Release booked seats by marking them as available
        bus.seatLayout = bus.seatLayout.map(row =>
            row.map(seat => (booking.seatsBooked.includes(seat.seatNumber) ? { ...seat, isBooked: false } : seat))
        );
        await bus.save();

        // Update booking status
        booking.status = 'cancelled';
        await booking.save();
        res.json({ message: 'Booking cancelled successfully', booking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = bookingCltr;
