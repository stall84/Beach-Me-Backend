const axios = require('axios');
require('dotenv').config();
const Beaches = require('../models/Beaches');


// Original node module was not well supported and would not make 5 day forecast call so switching to basic axios call



exports.getWeather = async (req,res,next) => {
    try {
        let weatherArr = [];
        let fiveBeachArr = req.body.fiveBeaches.map(beach => beach.name)


        weatherArr = await Promise.all(fiveBeachArr.map(beach => axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${beach},&appid=${process.env.WX_API_KEY}`)))
            return res.status(200).json({
                success: true,
                length: weatherArr.length,
                data: weatherArr.map(res => res.data)
        })
        
    
           
       
    } catch (error) {
        console.log('There was an error retrieving weather forecasts: ', error)
    }
}