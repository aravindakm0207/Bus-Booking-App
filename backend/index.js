/*
require('dotenv').config()

const express = require('express')
const app = express()
const port = 4000

const cors = require('cors')
app.use(cors())

//Application Middleware
app.use(express.json())

const configureDB = require('./config/db')
const { ExpressValidator } = require('express-validator')
configureDB()

const {checkSchema} = require('express-validator')


const userRegisterValidationSchema = require('./app/validations/user-register-validations')
const userLoginValidationSchema = require('./app/validations/user-login-validations')
const usersCltr = require('./app/controllers/user-cntrl')
console.log("usersCltr:", usersCltr);

const authenticateUser = require('./app/middlewares/authenticateUser')
const authorizeUser = require('./app/middlewares/authorizeUser')


const busValidationSchema=require('./app/validations/bus-validations')
const busCtrl=require('./app/controllers/bus-cltr')
console.log("busCltr:", busCtrl);


const bookingCltr=require('./app/controllers/booking-ctrl')
console.log("bookingCltr:", bookingCltr);

const tripCtrl = require('./app/controllers/trip-ctrl');
console.log("tripCltr:", tripCtrl);

const operatorCtrl = require('./app/controllers/operator-ctrl');


app.post('/users/register', checkSchema(userRegisterValidationSchema), usersCltr.register)
app.post('/users/login', checkSchema(userLoginValidationSchema), usersCltr.login)
// routing level middleware
app.get('/users/account', authenticateUser, usersCltr.account)

app.post('/api/buses', authenticateUser,busCtrl.addBusWithRouteAndOperator)
app.get('/api/buses', authenticateUser, busCtrl.listBuses);
//app.get('/api/search', busCtrl.searchBuses);//for users
app.get('/api/buses/:id',  busCtrl.getSingleBus);
//app.put('/api/buses/:id',authenticateUser, busCtrl.updateBus)
//app.delete('/api/buses/:id',authenticateUser, busCtrl.deleteBus)



app.post('/api/trips', authenticateUser, tripCtrl.addTrip);
app.get('/api/search', tripCtrl.searchTrips); 

app.post('/api/buses/booking', authenticateUser, bookingCltr.createBooking);
//app.get('/api/buses/:busId/seatLayout',  busCltr.getSeatLayout);
//app.post('/api/buses/bookingTrip', authenticateUser,tripCtrl.addTrip );
app.get('/api/trips/:tripId/seatLayout', tripCtrl.getSeatLayout);

app.get('/api/buses/booking/:bookingId', authenticateUser,bookingCltr.getBookingById);
app.listen(port, () => {
    console.log('Server listening on  port', port)
})
*/

require('dotenv').config();
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');

// Application Middleware
app.use(cors());
app.use(express.json());

const configureDB = require('./config/db');
configureDB();

// Import Controllers and Middleware
const usersCltr = require('./app/controllers/user-cntrl');
const busCtrl = require('./app/controllers/bus-cltr');
const tripCtrl = require('./app/controllers/trip-ctrl');
const bookingCltr = require('./app/controllers/booking-ctrl');
const paymentCtrl=require('./app/controllers/payment-ctrl')
const authenticateUser = require('./app/middlewares/authenticateUser');
const authorizeUser=require('./app/middlewares/authorizeUser')
const { checkSchema } = require('express-validator');
const userRegisterValidationSchema = require('./app/validations/user-register-validations');
const userLoginValidationSchema = require('./app/validations/user-login-validations');

// User Routes
app.post('/users/register', checkSchema(userRegisterValidationSchema), usersCltr.register);
app.get('/check-admin', usersCltr.checkAdmin)
app.get('/users/checkemail', usersCltr.checkEmail)
app.get('/users/checkusername', usersCltr.checkUsername)
app.get('/users/checkphone', usersCltr.checkPhone)
app.post('/users/login', checkSchema(userLoginValidationSchema), usersCltr.login);
app.get('/users/account', authenticateUser, usersCltr.account);

app.post('/users/forgot-password' , usersCltr.forgotPassword)
app.post('/users/reset-password',usersCltr.resetPassword)



app.get('/unverified-operators', authenticateUser, authorizeUser(['admin']), usersCltr.unverified)
app.post('/verify-operator', authenticateUser, authorizeUser(['admin']), usersCltr.verified)
app.get('/verifiedOperators', authenticateUser, authorizeUser(['admin']), usersCltr.verifiedOperators)
app.post('/reject-operator', authenticateUser, authorizeUser(['admin']), usersCltr.reject)





//operator
app.post('/api/buses', authenticateUser,busCtrl.addBus)
app.get('/api/buses', authenticateUser, busCtrl.listBuses); 
app.get('/api/buses/:id',  busCtrl.getSingleBus)
app.put('/api/buses/:busId',authenticateUser, busCtrl.updateBus)
app.delete('/api/buses/:busId', authenticateUser, busCtrl.deleteBus);



// Route Routes (to be used in TripForm for listing available routes)
// In your main server file (e.g., app.js)
app.get('/api/routes', authenticateUser, tripCtrl.Routes);


// Trip Routes
app.post('/api/trips', authenticateUser, tripCtrl.addTrip);
app.put('/api/trips/:tripId', tripCtrl.updateTrip);
app.delete('/api/trips/:tripId', tripCtrl.deleteTrip);
app.get('/api/search', tripCtrl.searchTrips);
app.get('/api/trips/:tripId/seatLayout', tripCtrl.getSeatLayout);
app.get('/api/trips', authenticateUser,tripCtrl.listTrips)

// Booking Routes
app.post('/api/buses/booking', authenticateUser, bookingCltr.createBooking);

// Start Server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
