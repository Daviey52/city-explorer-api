// 'use strict';
// const axios = require('axios');

// class ForeCast {
//   constructor (day) {
//     this.description = `Low: ${day.low_temp}, High: ${day.high_temp} with ${day.weather.description}`;
//     this.date = day.datetime;
//   };
// };

// async function getWeather(request, response) {
//   console.log('weather hit');
//   //let cityNameRequested = request.query.searchQuery;
//   let lat = request.query.lat;
//   let lon = request.query.lon;
//   console.log(lat, lon);
//   let result = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_MASTER_API_KEY}`);
//   response.send(result.data.data.map(item => new ForeCast(item)));
// }
// module.exports = getWeather

'use strict';

let cache = require('./cache.js');
const axios = require('axios');
const { response } = require('express');


async function getWeather(lat, lon) {
  const key = 'weather-' + lat + lon;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');

  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = await axios.get(url)
      .then(response => parseWeather(response.data));
  }

  return cache[key].data;

}


function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor (day) {
    this.description = day.weather.description;
    this.date = day.datetime;
  }
}
module.exports = getWeather;
