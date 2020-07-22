
// @description: Get all of the beaches in DB
// @route GET /api/v1/beaches
// @access PUBLIC (no auth)

const Beaches = require('../models/Beaches');


exports.getBeaches = async (req,res,next) => {
    try {   
        console.log('Getting BeachSearch Request... ')
            // Format longitude before latitude in req body from client for mongoDB geoJSON 
        const origins = [parseFloat(req.body.lng), parseFloat(req.body.lat)]
            // Use mongoDB aggregate method on our Beaches database to find nearest beaches to the client/user
            // Using point-radius off of client coords within 500 miles (804km)
        const nearestBeaches = await Beaches.aggregate([
            {
            $geoNear: {
            near: {
            type: 'Point', coordinates: origins },
            distanceField: 'dist.calculated',
            maxDistance: 804672, 
            spherical: true
        }
        }
    ])
          
        return res.status(200).json({
            success: true,
            count: nearestBeaches.length,
            data: nearestBeaches
        })
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: `Error retrieving beach DB: ${error}`});
    }
};

