const mongoose = require('mongoose');

function connectToDb(){
    mongoose.connect(process.env.DB_NAME,).then(()=>{
        console.log("Connected to DB")
    }).catch(error => console.log(error.message))


}

module.exports = connectToDb;