const mongoose = require('mongoose')
const {Schema, model} = mongoose

const routeSchema = new Schema({
    from:  String,
    to: String, 
    duration:  String, 
    distance: Number,
    
    
}, {timestamps: true})

const routeModel = model('Route', routeSchema)

module.exports = routeModel