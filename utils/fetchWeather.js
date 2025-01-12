const axios = require('axios');

const WEATHER_API_URL = process.env.WEATHER_API_URL;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

async function fetchWeather(city){
    try{
        const url = `${WEATHER_API_URL}/${encodeURIComponent(city)}?key=${WEATHER_API_KEY}`;
        const response = await axios.get(url);
        return response.data;
    }catch(error){
        console.log('Error fetching weather data:',error.message);
        return null;
    }
}

module.exports = fetchWeather;