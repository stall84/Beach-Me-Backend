const axios = require('axios');
require('dotenv').config();
const Beaches = require('../models/Beaches');


// Original node module was not well supported and would not make 5 day forecast call so switching to basic axios call



exports.getWeather = async (req,res,next) => {
    try {
        let fiveBeachArr = req.body.fiveBeaches.map(beach => beach.name)
        let wxUrl = `api.openweathermap.org/data/2.5/forecast?q={city name},{state code}&appid=${process.env.WX_API_KEY}`
        console.log('FiveBeachArr: ', fiveBeachArr)
          
        await fiveBeachArr.forEach(beach => {
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${beach},&appid=${process.env.WX_API_KEY}`)
            .then(res => {
                weatherArray = res.data
                console.log('weatherArray: ', weatherArray)
                // console.log('openWeather Response: ', res.data.list.forEach(item => {
                //     item.clouds
                // }))
                // res.json({
                //     data: res.data
                // })
            })
        })
           
       
    } catch (error) {
        console.log('There was an error retrieving weather forecasts: ', error)
    }
}