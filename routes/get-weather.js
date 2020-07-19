const express = require('express');
const router = express.Router();
const { getWeather } = require('../controllers/getWeather');


router
    .route('/')
    .get((req,res,next) => res.send('Got NEW request on get-weather route'))  // test route
    .post(getWeather);



module.exports = router;    