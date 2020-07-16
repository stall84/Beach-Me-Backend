
// @description: Query Google Distance Matrix for trip times to selected beaches
// @route GET /api/v1/get-trips
// @access PUBLIC (no auth)

const Beaches = require('../models/Beaches');

exports.getTrips = async (req,res,next) => {
    try {
        console.log('Redux Coords from Front: ', req.body.reduxLat, req.body.reduxLng)
    } catch (error) {
        console.log('Error on getTrips Controller POST request: ', error)
    }
}