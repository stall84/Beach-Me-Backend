
const weather = require('openweather-apis');
const Beaches = require('../models/Beaches');
require('dotenv').config();


// @description: Query OpenWeatherMap's API to return 5-day forecasts for our 5 closest beaches
//               ..Heavily reliant on using the node module 'openweather-apis' in this build
// @route GET /api/v1/get-weather
// @access PUBLIC (no auth)


exports.getWeather = async (req,res,next) => {
    try {
        weather.setAPPID(process.env.WX_API_KEY);
        weather.setLang('en');
        weather.setUnits('imperial');
        weather.setCity('Atlanta,GA,');


        weather.getWeatherForecastForDays(3, function(err, weatherObj) {
            if (err) {console.log('Error in forecast request: ', err)};
            res.json(weatherObj)
            console.log('OpenWeather Response: ', weatherObj)
})
    } catch (error) {
        console.log('Error getting weather: ', error)
} 
}

