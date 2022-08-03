const mongoose = require('mongoose')
const config = require('../configs/dbconfig')

const UserSchema = mongoose.Schema({
    departure:{
        type: Date,
        required: true,
    },
    returned:{
        type: Date,
        required: true
    },
    departureName:{
        type: String,
        required: true,
    },
    returnedName:{
      type: String,
        required: true,
    },
    distance: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        require: true,
    }
});


const data = module.exports = mongoose.model('Data', UserSchema)
