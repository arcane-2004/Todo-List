const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const cors = require('cors')
const connectToDb = require('./db/db')

const userRoutes = require('./routes/user.route')
const todosRoutes = require('./routes/todos.route')

connectToDb();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true})); 
app.use(cookieParser());


app.get("/", (req, res)=>{
    res.send("hello Sumit")
})

app.use('/user', userRoutes);

app.use('/todo', todosRoutes);

module.exports = app;