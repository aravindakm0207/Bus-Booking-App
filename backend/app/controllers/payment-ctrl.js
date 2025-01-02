const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/payment-model');
const Booking = require('../models/booking-model');
const Trip = require('../models/trip-model');
const Bus = require('../models/bus-model');
const Route = require('../models/route-model');
const Ticket = require('../models/ticket-model');
const { pick } = require('lodash');

const paymentCtrl = {};
const { v4: uuidv4 } = require('uuid');


// Online payment processing
paymentCtrl.payOnline = async (req, res) => {
    const { bookingId, amount } = pick(req.body, ['bookingId', 'amount']);

    console.log("Received payOnline request:", { bookingId, amount });

    // Validate user authentication
    if (!req.user || !req.user.id) {
        console.error("User not authenticated. Cannot proceed with payment.");
        return res.status(401).json({ error: 'User not authenticated' });
    }

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
        console.error("Invalid amount:", amount);
        return res.status(400).json({ error: 'Invalid amount' });
    }

    try {
        // Find the booking
        const booking = await Booking.findById(bookingId);
        console.log("Booking fetched:", booking);

        if (!booking) {
            console.error("Booking not found for ID:", bookingId);
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Convert amount to paise (1 INR = 100 paise)
        const amountInPaise = Math.round(amount * 100);

        // Create a Stripe checkout session
        console.log("Creating Stripe session...");
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: { name: `Payment for Booking #${bookingId}` },
                    unit_amount: amountInPaise,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3000/cancel`,
        });

        console.log("Stripe session created:", session);

        // Save payment to the database
        const payment = new Payment({
            user: req.user.id,
            bookingId,
            amount,
            transactionID: session.id,
            paymentStatus: 'pending',
            paymentType: 'card',
        });
        await payment.save();
        console.log("Payment saved to database:", payment);

        res.status(201).json({ sessionId: session.id, url: session.url, payment });
    } catch (error) {
        console.error("Error processing online payment:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



paymentCtrl.successUpdate = async (req, res) => {
    const { sessionId } = req.query;
    console.log("Processing successUpdate for sessionId:", sessionId);

    try {
        // Find the payment record by sessionId (transactionID)
        const payment = await Payment.findOne({ transactionID: sessionId });
        if (!payment) {
            console.error("Payment not found for sessionId:", sessionId);
            return res.status(404).json({ error: 'Payment not found' });
        }

        console.log("Fetched payment record:", payment);

        // Only update the status to successful if it's not already marked
        if (payment.paymentStatus !== 'successful') {
            payment.paymentStatus = 'successful';
            await payment.save();
            console.log("Payment status updated to successful:", payment);
        }

        res.status(200).json({ message: 'Payment status updated to successful', payment });
    } catch (error) {
        console.error("Error updating payment status:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



paymentCtrl.createTicket = async (req, res) => {
    try {
        // Step 1: Extract paymentId from request body or find the latest payment
        const paymentId = req.body.paymentId;

        let payment;
        if (paymentId) {
            // Use findById if a specific payment ID is provided
            payment = await Payment.findById(paymentId).select('bookingId');
        } else {
            // Use findOne to query based on user and paymentStatus
            payment = await Payment.findOne({ user: req.user.id, paymentStatus: 'successful' })
                .sort({ createdAt: -1 }) // Fetch the latest payment for the user
                .select('bookingId');
        }

        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        // Step 2: Fetch the associated booking using bookingId
        const booking = await Booking.findById(payment.bookingId)
            .populate({ path: 'routeID', select: 'from to' })
            .populate({ path: 'trip', select: 'journeyDate departure destination' })
            .populate({ path: 'bus', select: 'busName busNumber' })
            .select('seatsBooked journeyDate totalAmount routeID bus trip');
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Step 3: Create the ticket
        const ticket = new Ticket({
            bookingId: booking._id,
            ticketNumber: `TICKET-${uuidv4()}`, // Generate unique ticket number
            seats: booking.seatsBooked, // Ensure correct seats are fetched
            journeyDate: booking.journeyDate,
            totalAmount: booking.totalAmount,
            paymentId: payment._id,
        });

        // Step 4: Save the ticket
        await ticket.save();

        // Step 5: Respond with ticket and additional details
        res.status(200).json({
            message: 'Ticket creation successful',
            ticket: {
                ticketId: ticket._id,
                ticketNumber: ticket.ticketNumber,
                seats: ticket.seats,
                journeyDate: ticket.journeyDate,
                totalAmount: ticket.totalAmount,
                paymentId: ticket.paymentId,
                route: booking.routeID,
                bus: booking.bus,
                trip: booking.trip,
            },
        });
    } catch (error) {
        console.error("Error creating ticket:", error.message);
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
};

// Failure update for payment
paymentCtrl.failureUpdate = async (req, res) => {
    const { sessionId } = req.query;
    console.log("Processing failureUpdate for sessionId:", sessionId);

    try {
        // Find the payment record by sessionId (transactionID)
        const payment = await Payment.findOne({ transactionID: sessionId });
        if (!payment) {
            console.error("Payment not found for sessionId:", sessionId);
            return res.status(404).json({ error: 'Payment not found' });
        }

        console.log("Fetched payment record:", payment);

        // Only update the status to failed if it's not already marked
        if (payment.paymentStatus !== 'failed') {
            payment.paymentStatus = 'failed';
            await payment.save();
            console.log("Payment status updated to failed:", payment);
        }

        res.status(200).json({ message: 'Payment marked as failed', payment });
    } catch (error) {
        console.error("Error updating payment status:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Offline payment processing
paymentCtrl.payOffline = async (req, res) => {
    const { bookingId, amount } = req.body;
    console.log("Received payOffline request:", { bookingId, amount });

    if (!req.user || !req.user.id) {
        console.error("User not authenticated. Cannot record offline payment.");
        return res.status(401).json({ error: 'User not authenticated' });
    }

    try {
        const payment = new Payment({
            user: req.user.id,
            bookingId,
            amount,
            paymentDate: new Date(),
            paymentType: 'offline',
            paymentStatus: 'pending',
            transactionID: `OFFLINE-${Date.now()}`,
        });

        await payment.save();
        console.log("Offline payment saved:", payment);
        res.status(201).json({ message: 'Offline payment recorded successfully', payment });
    } catch (error) {
        console.error("Error recording offline payment:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Verify offline payment
paymentCtrl.verifyOfflinePayment = async (req, res) => {
    const { id } = req.params;
    console.log("Processing verifyOfflinePayment for bookingId:", id);

    try {
        const payment = await Payment.findOne({ bookingId: id, paymentType: 'offline' }).sort({ paymentDate: -1 });
        console.log("Fetched offline payment record:", payment);

        if (!payment) {
            console.error("Offline payment not found for bookingId:", id);
            return res.status(404).json({ error: 'Offline payment not found' });
        }

        if (payment.paymentStatus === 'successful') {
            console.error("Payment already verified:", payment);
            return res.status(400).json({ error: 'Payment is already verified' });
        }

        payment.paymentStatus = 'successful';
        await payment.save();
        console.log("Offline payment verified successfully:", payment);

        res.status(200).json({ message: 'Offline payment verified successfully', payment });
    } catch (error) {
        console.error("Error verifying offline payment:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Get list of all payments
paymentCtrl.getPaymentsList = async (req, res) => {
    console.log("Fetching list of payments...");

    try {
        // Fetch all payments from the database
        const payments = await Payment.find();

        // If no payments found
        if (!payments || payments.length === 0) {
            console.log("No payments found.");
            return res.status(404).json({ message: 'No payments found' });
        }

        console.log("Fetched payments:", payments);
        res.status(200).json({ payments });
    } catch (error) {
        console.error("Error fetching payments:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




const mongoose = require('mongoose');

// Adjusted method to fetch ticket details by paymentId
paymentCtrl.getTicketDetails = async (req, res) => {
    let { paymentId } = req.params; // Get the paymentId from the URL parameters

    console.log("Received request to get ticket details for paymentId:", paymentId);

    // Validate paymentId format
    if (!mongoose.Types.ObjectId.isValid(paymentId)) {
        return res.status(400).json({ error: 'Invalid paymentId format' });
    }

    try {
        // Convert paymentId to ObjectId
        const objectId = new mongoose.Types.ObjectId(paymentId)

        // Find the payment record by paymentId (transactionID)
        const payment = await Payment.findById(objectId); // Use the converted ObjectId
        if (!payment) {
            console.error("Payment not found for ID:", paymentId);
            return res.status(404).json({ error: 'Payment not found' });
        }

        console.log("Fetched payment record:", payment);

        // Fetch booking details using the bookingId from the payment
        const booking = await Booking.findById(payment.bookingId)
            .populate('user') // Populate user details
            .populate('bus') // Populate bus details
            .populate('trip') // Populate trip details
            .populate('routeID'); // Populate route details

        if (!booking) {
            console.error("Booking not found for ID:", payment.bookingId);
            return res.status(404).json({ error: 'Booking not found' });
        }

        console.log("Fetched booking details:", booking);

        // Assuming the booking model contains ticket details like:
        const ticketDetails = {
            bookingId: booking._id,
            user: {
                name: booking.user.name,
                phone: booking.user.phone,  // Assuming phone field is in User schema
                email: booking.user.email   // Assuming email field is in User schema
            },
            trip: {
                journeyDate: booking.journeyDate,
                departure: booking.routeID.from, // Using 'from' from Route schema
                destination: booking.routeID.to // Using 'to' from Route schema
            },
            bus: {
                busName: booking.bus.busName,  // busName from Bus schema
                busNumber: booking.bus.busNumber // busNumber from Bus schema
            },
            seatsBooked: booking.seatsBooked,  // The list of booked seats
            totalAmount: booking.totalAmount,
            status: booking.status,  // Status of the booking (confirmed, pending, cancelled)
            bookingDate: booking.bookingDate
        };

        res.status(200).json({
            message: 'Ticket details fetched successfully',
            ticketDetails, // Returning ticket details
        });
    } catch (error) {
        console.error("Error fetching ticket details:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = paymentCtrl;
