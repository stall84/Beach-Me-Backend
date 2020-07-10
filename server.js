
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');


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
app.use('/api/v1/beaches', require('./routes/beaches'))


 


const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Beach-Me Server up and running in ${process.env.NODE_ENV}, on Port: ${PORT}`)
});