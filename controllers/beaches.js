
const Beaches = require('../models/Beaches');

// @description: Get all of the beaches in DB
// @route GET /api/v1/beaches
// @access PUBLIC (no auth)

exports.getBeaches = async (req,res,next) => {
    try {   
        //const beaches = await Beaches.find();
        const nearestBeaches = await Beaches.aggregate([
            {
            $geoNear: {
            near: {
            type: 'Point', coordinates: [-77.466667, 37.533333] },
            distanceField: 'dist.calculated',
            maxDistance: 175000, 
            spherical: true
        }
        }
    ])
            .then((nearestBeaches) => {
                res.send(nearestBeaches)
            });
        return res.status(200).json({
            success: true,
            count: nearestBeaches.length,
            data: nearestBeaches
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: `Error retrieving beach DB: ${error}`});
    }
};

