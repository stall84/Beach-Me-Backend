
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Adding DataDog Monitoring for Trial 

var StatsD = require('hot-shots');
var dogstatsd = new StatsD();

// Load environment variables 
dotenv.config({
    path: './config/config.env'
});

// Connect with Mongo database
connectDB();

// Create Express instance
const app = express();

// Middleware 
// Body-Parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Routing
app.use('/api/v1/beaches', require('./routes/beaches'));
app.use('/api/v1/get-trips', require('./routes/get-trips'));
app.use('/api/v1/get-weather', require('./routes/get-weather'));


 


const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Beach-Me Server up and running in ${process.env.NODE_ENV}, on Port: ${PORT}`)
});


dogstatsd.increment('page.views');