const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
name: {
    type: String,
    required: true
},
phoneNumber: {
    type: Number,
    required: true
},
password: {
    type: String,
    required: true
},
age: {
    type: Number,
    required: true
},
pincode: {
    type: Number,
    required:true
},
adhaarNumber: {
    type: String,
    required: true
}
},{timestamps:true})

module.exports = mongoose.model('User', userSchema)