const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {type:String,required:true,unique:true},
    password: {type:String,required:true},
    dob: {
        type: Date,
        required: true, // Date of birth should be required
    },
    selectedDoctor: {
        type: String,
        required: true,
        trim: true, // Removes whitespace from the beginning and end
    },
    deliveryDate: {
        type: Date,
        required: true, // Delivery date should be required
    },
    diseases: {
        type: [String], // Array of diseases
        default: [], // Default to an empty array
    }
});

module.exports = mongoose.model('User ', UserSchema);