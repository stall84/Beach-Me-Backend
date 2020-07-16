const express = require('express');
const router = express.Router();
const { getBeaches, addLoc } = require('../controllers/beaches');


router
    .route('/')
    .post(getBeaches)
 
    
        
    
    




module.exports = router;