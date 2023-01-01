const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    startTime: {
        type:Number, 
        required:true
    },
    endTime: {
        type:Number,
         required:true
        },
    clientName: {
        type:String, 
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('Booking', bookingSchema)