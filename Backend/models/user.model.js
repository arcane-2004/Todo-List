const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength:[3, 'First name must be 3 characters or long']
        },
        lastname:{
            type: String,
            minlength:[3, 'Last name must be 3 characters or long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        select: false
    }
}) 


const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
