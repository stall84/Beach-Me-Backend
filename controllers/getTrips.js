const distance = require('google-distance-matrix');
const Beaches = require('../models/Beaches');
require('dotenv').config();




// @description: Query Google Distance Matrix for trip times to selected beaches
// @route GET /api/v1/get-trips
// @access PUBLIC (no auth)

// Configure Google Distance Matrix API request
distance.key(process.env.GOOGLE_API_KEY);


exports.getTrips = async (req,res,next) => {
    try {
        // format the incoming request body in google's distance matrix format
        let travelmode = 'DRIVING'
        let origin = [`${req.body.reduxLat},${req.body.reduxLng}`];
        let destinations = [];
        let searchBeaches = req.body.searchBeaches;
        let searchBeachNames = req.body.searchBeaches.map(beach => beach.beachName)
        // 'loop' through req body's large searchBeach array and pull out just the nested lat and lng. no spaces per google's formating
        searchBeaches.forEach(beach => {
            destinations.push(`${beach.location.coordinates[1].$numberDecimal},${beach.location.coordinates[0].$numberDecimal}`)
        })
        distance.matrix(origin, destinations, travelmode, function(error, distances) {
            if (!error && distances) {
                res.json(distances);
                //console.log('Google Distance Response: ', distances)
                console.log('Logging distances.rows[0].elements[0].duration.value: ', distances.rows[0].elements[0].duration.value)
                let distArr = distances.rows[0].elements.map((durations, i) => {
                    return durations.duration.value
                    
                })
                console.log('Logging distArr: ', distArr)
                let mergedArr = searchBeachNames.map((beach, i) => ({name:beach, dur:distArr[i]}))
                console.log('Merged Array: ', mergedArr)
            }
        })
        
        console.log('Origin: ', origin)
        console.log('Destinations: ', destinations)
        


        //console.log('Redux Coords from Front: ', req.body.reduxLat, req.body.reduxLng)
    } catch (error) {
        console.log('Error on getTrips Controller POST request: ', error)
    }
}