const express = require('express');
const router = express.Router();
const { getTrips } = require('../controllers/getTrips');
 

router
    .route('/')
    .post(getTrips)
    



module.exports = router;