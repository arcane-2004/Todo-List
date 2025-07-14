const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    todo:{
        type: String,
        require: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    done:{
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const listModel = mongoose.model('list', listSchema);
module.exports = listModel;