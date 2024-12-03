const mongoose = require('mongoose');

const operatorSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    email: String,
    phone: Number,
    username: { type: String, unique: true, sparse: true }
});

module.exports = mongoose.model('Operator', operatorSchema);
