const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ticketSchema = new Schema({
    bookingId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Booking', 
        required: true 
    },  // Links the ticket to a specific booking
    paymentId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Payment',  // Link to the Payment collection
        required: true 
    },
    ticketNumber: { 
        type: String, 
        required: true, 
        unique: true 
    },  // Unique ticket number
    seats: [String],  // The seats booked in the ticket
    journeyDate: { 
        type: Date, 
        required: true 
    },  // The journey date
    totalAmount: { 
        type: Number, 
        required: true 
    },  // The total amount of the ticket
    status: { 
        type: String, 
        enum: ['issued', 'cancelled'], 
        default: 'issued' 
    },  // Ticket status
    issuedDate: { 
        type: Date, 
        default: Date.now 
    },  // The date when the ticket is issued
}, { timestamps: true });

const Ticket = model('Ticket', ticketSchema);

module.exports = Ticket;
