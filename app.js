require('dotenv').config();
const express = require('express');
const Redis = require('ioredis');
const rateLimit = require('express-rate-limit');
const fetchWeather = require('./utils/fetchWeather');

const app = express();
const redis = new Redis(process.env.REDIS_URL);
const PORT = process.env.PORT || 3001;
const CACHE_EXPIRATION = parseInt(process.env.CACHE_EXPIRATION,10) || 43200;

const limiter = rateLimit({
    windowMs:15*60*1000,
    max:100,
    message:{error:'To many requests, please try again later.'},
});

app.use(express.json());
app.use(limiter);

app.get('/weather/:city',async(req,res)=>{
    const {city} = req.params;
    try{
        // check redis cache
        const cachedData = await redis.get(city.toLowerCase());
        console.log(cachedData);
        if(cachedData){
            return res.json({source:'cache',data:JSON.parse(cachedData)});
        }
        // Fetch from 3rd party API
        const weatherData = await fetchWeather(city);
        if(!weatherData){
            return res.status(404).json({error:'City not found or API error.'});
        }
        // Save to Redis
        await redis.set(city.toLowerCase(),JSON.stringify(weatherData),'EX',CACHE_EXPIRATION);
        return res.json({source:'api',data:weatherData});
    }catch(error){
        console.error('Error:',error);
        return res.status(500).json({error:'Internal server error.'});
    }
});

// start server
app.listen(PORT,()=>{
    console.log(`Weather API running on http://localhost:${PORT}`);
});