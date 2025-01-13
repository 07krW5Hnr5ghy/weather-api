# Weather API

A simple Weather API built using Node.js that fetches and returns weather data from a 3rd party API. This project demonstrates how to work with external APIs, caching using Redis, and environment variables.

## Features

- Fetch weather data for a specified city using a 3rd party API (e.g., Visual Crossing).
- Cache results in Redis with a 12-hour expiration to improve performance and reduce API calls.
- Error handling for invalid city names or API failures.
- Environment variables to securely store API keys and Redis connection details.
- Rate limiting to prevent abuse of the API.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [Redis](https://cloud.redis.io/) redis cloud account
- A 3rd party weather API account (e.g., Visual Crossing) and API key

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/07krW5Hnr5ghy/weather-api
   cd weather-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:

   ```env
   WEATHER_API_KEY=your_visual_crossing_api_key
   REDIS_URL=your_redis_cloud_url
   PORT=3001
   ```

   Replace `your_visual_crossing_api_key` with your actual API key.

4. Ensure Redis is running locally or accessible via the `REDIS_URL`.

## Usage

1. Start the Node.js server:

   ```bash
   npm start
   ```

2. Make a request to the Weather API:

   ```bash
   curl http://localhost:3001/weather/london
   ```

   Example response:

   ```json
   {
     "city": "London",
     "temperature": "15°C",
     "condition": "Cloudy",
     "cached": false
   }
   ```

   If the data is retrieved from the cache, the response will include:

   ```json
   "cached": true
   ```

## Project Structure

```
weather-api/
├── utils/
│   ├── fetchWeather.js       # Fetch weather data from a city
├── app.js              # weather get route and cache handling
├── .env                # Environment variables
├── .gitignore          # Files to ignore in Git
├── package.json        # Project metadata and dependencies
├── README.md           # Project documentation
```

## API Endpoints

### `GET /weather/:city`

Fetches weather data for a specified city.

- **Query Parameters**:

  - `city` (required): Name of the city

- **Example Request**:

  ```bash
  GET /weather/new york
  ```

- **Example Response**:
  ```json
  {
    "source": "api",
    "data": {
        "queryCost": 1,
        "latitude": 40.7146,
        "longitude": -74.0071,
        "resolvedAddress": "New York, NY, United States",
        "address": "new york",
        "timezone": "America/New_York",
        "tzoffset": -5,
        "description": "Similar temperatures continuing with a chance of rain Sunday & a chance of snow Saturday.",
        "more data...."
    }
        "more data..."
   }
  ```

## Error Handling

- Invalid city names or API errors return a 400 or 500 status with an appropriate message.
- Example:
  ```json
  {
    "error": "City not found or API error"
  }
  ```

## Additional Features

- **Rate Limiting**: Prevents abuse by limiting the number of requests per IP.
- **Cache Expiry**: Automatically expires cached data after 12 hours.

# Project url

https://roadmap.sh/projects/weather-api-wrapper-service
