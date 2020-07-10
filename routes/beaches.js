const express = require('express');
const router = express.Router();
const { getBeaches } = require('../controllers/beaches');


router
    .route('/')
    .get(getBeaches)
        
    
    




module.exports = router;