const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const app = express()
const cors = require('cors')
const connectToDb = require('./db/db')

connectToDb();

app.use(cors())
app.use(express.json())



app.get("/", (req, res)=>{
    res.send("hello Sumit")
})

module.exports = app;