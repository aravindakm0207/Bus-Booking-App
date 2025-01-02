const Ticket = require('../models/ticket-model');
const Booking = require('../models/booking-model');
const { v4: uuidv4 } = require('uuid');  // To generate unique ticket numbers

const ticketCtrl = {};

// Create a ticket after a successful payment
ticketCtrl.createTicket = async (req, res) => {
    const { bookingId } = req.body; // The bookingId is passed in the request

    try {
        // Validate the bookingId
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Generate a unique ticket number
        const ticketNumber = `TICKET-${uuidv4()}`;

        // Create a new ticket
        const ticket = new Ticket({
            bookingId: booking._id,
            ticketNumber,
            seats: booking.seatsBooked,
            journeyDate: booking.journeyDate,
            totalAmount: booking.totalAmount,
        });

        // Save the ticket to the database
        await ticket.save();

        // Respond with the created ticket
        res.status(201).json({
            message: 'Ticket created successfully',
            ticket
        });
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a ticket by its ID
const mongoose = require('mongoose');

ticketCtrl.getTicket = async (req, res) => {
    const { ticketId } = req.params;  // The ticketId is passed in the URL

    // Validate ticketId format
    if (!mongoose.Types.ObjectId.isValid(ticketId)) {
        return res.status(400).json({ error: 'Invalid ticket ID format' });
    }

    try {
        // Fetch the ticket from the database and populate the 'bookingId' and 'routeID'
        const ticket = await Ticket.findById(ticketId)
            .populate({
                path: 'bookingId',  // Populate the bookingId field
                populate: {
                    path: 'routeID',  // Populate the route details from the associated Route model
                    select: 'from to'  // Only select 'from' and 'to' fields from the Route model
                }
            });

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        // Respond with ticket details, including the populated route details (departure and arrival)
        res.status(200).json({
            ticket,
            departure: ticket.bookingId.routeID.from,  // Get departure (from) directly from populated route
            arrival: ticket.bookingId.routeID.to      // Get arrival (to) directly from populated route
        });
    } catch (error) {
        console.error('Error fetching ticket:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Get all tickets (Admin function)
ticketCtrl.getAllTickets = async (req, res) => {
    try {
        // Fetch all tickets from the database
        const tickets = await Ticket.find().populate('bookingId');
        if (!tickets || tickets.length === 0) {
            return res.status(404).json({ message: 'No tickets found' });
        }

        // Respond with the list of tickets
        res.status(200).json({ tickets });
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = ticketCtrl;
