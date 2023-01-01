const mongoose = require('mongoose')

const slotSchema = new mongoose.Schema({
   time: {
      type:Number, 
      required:true, 
      unique:true
   },
   booked: {
      type:Boolean, 
      required:true
   }, 
   bookingId: {
      type:String
   } 
},{timestamps:true});

module.exports = mongoose.model('Slot', slotSchema)