

require('dotenv').config();
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const path = require('path');

// Application Middleware
app.use(cors());
app.use(express.json());

const configureDB = require('./config/db');
configureDB();

const mongoose = require('mongoose');
mongoose.set('debug', true);

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
const ticketCtrl= require('./app/controllers/ticket-ctrl')
const upload = require('./app/middlewares/upload');


 app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// User Routes
app.post('/users/register',upload.single('profilePic'), checkSchema(userRegisterValidationSchema), usersCltr.register);
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
app.post('/api/buses', authenticateUser,upload.array('images', 5),busCtrl.addBus)


app.get('/api/buses', authenticateUser, busCtrl.listBuses); 
app.get('/api/buses/:busId',authenticateUser,  busCtrl.getSingleBus)
app.put('/api/buses/:busId',authenticateUser, busCtrl.updateBus)
app.delete('/api/buses/:busId', authenticateUser, busCtrl.deleteBus);



// Route Routes (to be used in TripForm for listing available routes)
// In your main server file (e.g., app.js)
app.get('/api/routes', authenticateUser, tripCtrl.Routes);


// Trip Routes
app.post('/api/trips', authenticateUser, tripCtrl.addTrip);
app.put('/api/trips/:tripId', authenticateUser, tripCtrl.updateTrip);
app.delete('/api/trips/:tripId', authenticateUser, tripCtrl.deleteTrip);
app.get('/api/search', authenticateUser, tripCtrl.searchTrips);
app.get('/api/trips/:tripId/seatLayout', authenticateUser, tripCtrl.getSeatLayout);
app.get('/api/trips', authenticateUser, tripCtrl.listTrips);
app.get('/api/search/sort', authenticateUser, tripCtrl.getTripsWithFilters);

app.post('/api/buses/booking', authenticateUser, bookingCltr.createBooking);
app.get('/api/buses/bookings', authenticateUser, bookingCltr.getBookingsByUser);
app.get('/api/buses/bookings/:bookingId', authenticateUser, bookingCltr.getBookingById);

app.get('/api/buses/bookings/trip/:tripId', authenticateUser, bookingCltr.getBookingsByTrip);
app.get('/api/buses/bookings/all', authenticateUser, bookingCltr.getAllBookings);





// Online payment route
app.post('/payments/online', authenticateUser, paymentCtrl.payOnline); // Online payment
app.post('/payments/offline', authenticateUser, paymentCtrl.payOffline); // Offline payment
app.get('/payments/success', paymentCtrl.successUpdate); // Success update
app.get('/payments/failure', paymentCtrl.failureUpdate); // Failure update
app.get('/payments/verify-offline/:id', authenticateUser, paymentCtrl.verifyOfflinePayment); // Verify offline payment
app.get('/payments', authenticateUser, paymentCtrl.getPaymentsList); // Get payments list
//app.get('/create-ticket/:paymentId', authenticateUser, paymentCtrl.createTicket);
app.get('/api/ticket', authenticateUser, paymentCtrl.createTicket);


app.post('/tickets/create',authenticateUser,  ticketCtrl.createTicket);

// Route to get a ticket by ticketId
app.get('/tickets/:ticketId', authenticateUser, ticketCtrl.getTicket)
//app.get('/api/bookings/:bookingId/tickets/:ticketId', authenticateUser, ticketCtrl.getTicket)
// Start Server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
