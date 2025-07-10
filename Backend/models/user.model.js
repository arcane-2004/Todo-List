const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be 3 characters or long']
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be 3 characters or long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "list"
        }
    ]
})

userSchema.methods.generateToken = async function () {
    const token = await jwt.sign({ email: this.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

userSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
