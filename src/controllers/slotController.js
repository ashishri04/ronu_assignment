const slotModel = require('../models/slotModel')
const bookingSlot =require('../models/bookingSchema')
const  userModel = require('../models/userModel')


//   const appointMent = async function (req, res) {

    


slotsToBook.forEach(async (slot) => {
    
    slotsToBook = await slotModel.find().where('time').gte(startTime).lt(endTime).exec();

    if (slot.booked) {
        console.log(`Damn, the slot at ${slot.time} is already booked`); 
        return res.status(400).send({status:false})
    } else {
        await slotModel.findByIdAndUpdate(
            slot._id,
            {$set: {
                booked: true, 
                bookingId: yourNewBooking._id
            }}
        );
        console.log(`Just booked the ${slot.time} slot !`);
    }
    return res.status(200).send({status:true})
});




module.exports ={slotsToBook}