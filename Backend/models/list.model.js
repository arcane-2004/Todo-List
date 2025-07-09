const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title:{
        type: String,
        required: false
    },
    body:{
        type: String,
        required: true
    }
})

const listModel = mongoose.model('List', listSchema);
module.exports = listModel;