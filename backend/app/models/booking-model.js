/*const { model, Schema } = require("mongoose");

const bookingModel = new Schema(
  {
    bookingId: String,
    userId: {
      type:Schema.Types.ObjectId,
      ref:'User'
    },
    busID: {
		type: Schema.Types.ObjectId, 
		ref: 'Bus'	
	},
    routeId: {
        type: Schema.Types.ObjectId, 
        ref: 'route'
     },
     seatsBooked: [Number],
     bookingDate: Date,
     status: String
   
    }
);
*/

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bookingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, 
      ref: 'User'},
    bus: { type: Schema.Types.ObjectId, 
      ref: 'Bus' },
      routeID: {
        type: Schema.Types.ObjectId,
        ref:  'Route'
   },
    seatsBooked: [String], 
    totalAmount: Number,
    bookingDate: { type: Date,
       default: Date.now },
    journeyDate: { type: Date, 

    },
    status: { type: String, enum: ['confirmed', 'pending', 'cancelled'],
       default: 'confirmed' }
}, { timestamps: true });

const Booking = model('Booking', bookingSchema);

module.exports = Booking;
