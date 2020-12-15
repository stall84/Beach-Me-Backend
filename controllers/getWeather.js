const axios = require('axios');
require('dotenv').config();


// @description: Query OpenWeatherMap's API For an array of the 5 closest beach 'cities' weather. Return to client
// @route POST /api/v1/get-weather
// @access PUBLIC (no auth)

exports.getWeather = async (req,res,next) => {
    try {
        let weatherArr = [];
        let fiveBeachArr = req.body.fiveBeaches.map(beach => beach.name)

        // console.log('FiveBeachArr: ', fiveBeachArr)  // For Debug Purposes
   
        weatherArr = await Promise.all(fiveBeachArr.map(beach => axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${beach},&appid=${process.env.WX_API_KEY}`)))
            // console.log('LOWER weatherArr: ', weatherArr)   // For Debug Purposes
            return res.status(200).json({
                success: true,
                length: weatherArr.length,
                data: weatherArr.map(res => res.data)
        })
           
       
    } catch (error) {
        console.log('There was an error retrieving weather forecasts: ', error)
    }
}