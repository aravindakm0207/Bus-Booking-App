const Payment = require('../models/payment-model'); // Assuming the Payment model is defined
const Booking = require('../models/booking-model'); // Assuming the Booking model exists

const paymentCtrl = {};

// Create a new payment
paymentCtrl.createPayment = async (req, res) => {
    try {
        const { bookingId, amount, transactionID } = req.body;

        // Validate inputs
        if (!bookingId || !amount || !transactionID) {
            return res.status(400).json({ message: 'All fields are required: bookingId, amount, transactionID.' });
        }

        // Ensure booking exists
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        // Create the payment
        const payment = new Payment({
            user: req.user.id, // Assuming the user's ID is attached to the request (e.g., from auth middleware)
            bookingId,
            amount,
            transactionID,
            paymentStatus: 'pending', // Default status
        });

        await payment.save();

        res.status(201).json({ message: 'Payment created successfully.', payment });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get all payments for the logged-in user
paymentCtrl.getPaymentsByUser = async (req, res) => {
    try {
        const payments = await Payment.find({ user: req.user.id }).populate('bookingId');
        res.json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get a specific payment by ID
paymentCtrl.getPaymentById = async (req, res) => {
    const { id } = req.params;

    try {
        const payment = await Payment.findById(id).populate('bookingId');
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found.' });
        }

        res.json(payment);
    } catch (error) {
        console.error('Error fetching payment:', error);
        res.status(500).json({ error: error.message });
    }
};

// Update payment status
paymentCtrl.updatePaymentStatus = async (req, res) => {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    try {
        // Ensure valid status is provided
        if (!['pending', 'successful', 'failed'].includes(paymentStatus)) {
            return res.status(400).json({ message: 'Invalid payment status.' });
        }

        const payment = await Payment.findById(id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found.' });
        }

        payment.paymentStatus = paymentStatus;
        await payment.save();

        res.json({ message: 'Payment status updated successfully.', payment });
    } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = paymentCtrl;
