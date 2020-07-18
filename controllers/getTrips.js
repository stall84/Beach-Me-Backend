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
            // Here combining the state prop with the beachName prop to form one string of beach and state.. this might cause an issue with weather api
        let beachNamesStates = req.body.searchBeaches.map(beach => beach.beachName + ' ' + beach.state)
       
        
        // 'loop' through req body's large searchBeach array and pull out just the nested lat and lng. no spaces per google's formating
        searchBeaches.forEach(beach => {
            destinations.push(`${beach.location.coordinates[1].$numberDecimal},${beach.location.coordinates[0].$numberDecimal}`)
        })
        distance.matrix(origin, destinations, travelmode, function(error, distances) {
            if (!error && distances) {
                    let distArr = distances.rows[0].elements.map((durations, i) => {
                        return durations.duration.value  
                    })
                    // Here we are merging the trip duration array returned from distance matrix and transposing those times onto 
                    // our database beach list.
                    let mergedArr = beachNamesStates.map((beach, i) => ({name:beach, dur:distArr[i]}))
                    console.log('Merged Array: ', mergedArr)
                    // Here we're sorting the mergedArray ascending by the objects values (duration in seconds in this case)
                    let sortedArr = mergedArr.sort(function (a,b) { return a.dur - b.dur } )
                    // Taking the first 5 closest beaches to user
                    let beachDurations = sortedArr.splice(0,5)
                    
                return res.status(200).json({
                    success: true,
                    count: beachDurations.length,
                    data: beachDurations
                })
            }
        })
       
        
    } catch (error) {
        console.log('Error on getTrips Controller POST request: ', error)
    }
}