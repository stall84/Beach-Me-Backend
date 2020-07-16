
// @description: Query Google Distance Matrix for trip times to selected beaches
// @route GET /api/v1/get-trips
// @access PUBLIC (no auth)

const Beaches = require('../models/Beaches');

exports.getTrips = async (req,res,next) => {
    try {
        // format the incoming request body in google's distance matrix format
        let origin = [`${req.body.reduxLat},${req.body.reduxLng}`];
        let destinations = [];
        // 'loop' through req body's large searchBeach array and pull out just the nested lat and lng. no spaces per google's formating
        req.body.searchBeaches.forEach(beach => {
            destinations.push(`${beach.location.coordinates[0].$numberDecimal},${beach.location.coordinates[1].$numberDecimal}`)
        })
        
        console.log('Origin: ', origin)
        console.log('Destinations: ', destinations)
        //console.log('Redux Coords from Front: ', req.body.reduxLat, req.body.reduxLng)
    } catch (error) {
        console.log('Error on getTrips Controller POST request: ', error)
    }
}