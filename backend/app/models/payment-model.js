const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const paymentSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, // Links payment to the user
    bookingId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Booking', 
        required: true 
    }, // Links payment to a specific booking
    amount: { 
        type: Number, 
        required: true 
    }, // The total amount paid
    paymentDate: { 
        type: Date, 
        default: Date.now 
    }, // Automatically sets the payment date
    transactionID: { 
        type: String, 
        required: true, 
        unique: true 
    }, // Unique transaction ID
    paymentStatus: { 
        type: String, 
        enum: ['pending', 'successful', 'failed'], 
        default: 'pending' 
    }, // Payment status
}, { timestamps: true });

const Payment = model('Payment', paymentSchema);

module.exports = Payment;
