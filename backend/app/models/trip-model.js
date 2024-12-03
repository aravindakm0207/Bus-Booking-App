const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const tripSchema = new Schema({
    routeID: { type: Schema.Types.ObjectId, ref: 'Route', required: true }, // Added routeID
    bus: { type: Schema.Types.ObjectId, 
        ref: 'Bus' },
    date: { type: Date, required: true }, // Ensure date is required
    arrival: String,
    departure: String,
    price: Number,
});

module.exports = mongoose.model('Trip', tripSchema);
