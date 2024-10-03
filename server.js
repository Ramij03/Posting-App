const express = require('express');
const cors= require('cors');
const dotenv= require('dotenv');
const colors= require('colors');
const morgan= require('morgan');
const dbConnect = require('./config/dbConnection');

//DOTENV
dotenv.config();

//MongoDb Connect
dbConnect();
//REST OBJECT
const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//ROUTES
app.use('/api/v1/auth', require("./routes/user.route"));
app.use('/api/v1/posts', require("./routes/post.route"));

//PORT
const PORT=process.env.PORT || 5000;

//listen
app.listen(PORT, ()=>{
    console.log(`Srever started on port : ${PORT}`.bgGreen.white);
})