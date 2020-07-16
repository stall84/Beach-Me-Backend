
// @description: Get all of the beaches in DB
// @route GET /api/v1/beaches
// @access PUBLIC (no auth)

const Beaches = require('../models/Beaches');


exports.getBeaches = async (req,res,next) => {
    try {   
        //const beaches = await Beaches.find();
        const origins = [parseFloat(req.body.lng), parseFloat(req.body.lat)]
        //console.log('ORIGINS NEXT: ', origins)
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
        //console.log('Nearest Beaches: ', nearestBeaches)      
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

