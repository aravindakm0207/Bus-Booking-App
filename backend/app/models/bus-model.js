const mongoose = require('mongoose');
const busSchema = new mongoose.Schema({
    busName:  String, 
    busNumber:  String, 
    operatorID:{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Operator'	
	}, 
	routeID: {
	     type: mongoose.Schema.Types.ObjectId,
	     ref:  'Route'
	},
    busCapacity:  Number, 
    price:Number,
    amenities: [ String ],
    rating:Number,
    seatLayout: [
        [
            {
                seatNumber: String,
                isBooked: { type: Boolean, default: false },
            }
        ]
    ] ,
});

module.exports = mongoose.model('Bus', busSchema);

/*
const mongoose = require('mongoose');
const busSchema = new mongoose.Schema({
    busName:  String, 
    busNumber:  String, 
    busCapacity:  Number,
    //from:  String,
    //to: String, 
    date:Date,
    price:Number,
    //email:String,
    //phone:Number,
    //duration:  String, 
   // distance: Number, 
    amenities: [ String ],
    rating:Number,
    arrival:String,
    departure:String,
    seatLayout: [
        [
            {
                seatNumber: String,
                isBooked: { type: Boolean, default: false },
            }
        ]
    ] ,
    operator: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
});

module.exports = mongoose.model('Bus', busSchema);
*/