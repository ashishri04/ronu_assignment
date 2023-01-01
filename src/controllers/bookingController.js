const slotModel = require('../models/slotModel')
const bookingSlot =require('../models/bookingSchema')
const  userModel = require('../models/userModel')




const  bookingHandler = async function(req,res){

let  conflictingBookings = await bookingSlot.find()
    .where('startTime').lt(newEndTime)
    .where('endTime').gt(newStartTime)
    .exec();


if (conflictingBookings.length === 0) {
    return res.send({status:false,msg:"not given booking "})
} else {

    conflictingBookings.forEach( booking => {
        console.log(`There is already a booking from ${convertToString(booking.startTime)} to ${convertToString(booking.endTime)} with ${booking.clientName} !`);
    });

   return res.send ({status:false,})

}}


module.exports ={
    bookingHandler
}