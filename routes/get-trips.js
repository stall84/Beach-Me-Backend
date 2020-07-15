const express = require('express');
const router = express.Router();
const { getTrips } = require('../controllers/beaches');
 

router
    .route('/')
    .post(getTrips)
    
    
        
    
    




module.exports = router;