const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    todo:{
        type: String,
        require: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
})

const listModel = mongoose.model('list', listSchema);
module.exports = listModel;