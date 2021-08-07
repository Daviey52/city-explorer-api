
const axios = require('axios');
//import axios from 'axios';

class ForeCast {
  constructor (day) {
    this.description = `Low: ${day.low_temp}, High: ${day.high_temp} with ${day.weather.description}`;
    this.date = day.datetime;

  };
};

async function getWeather(request, response) {
  console.log('weather hit');
  //let cityNameRequested = request.query.searchQuery;
  let lat = request.query.lat;
  let lon = request.query.lon;
  console.log(lat, lon);
  let result = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_MASTER_API_KEY}`);

  // let city = result.find(
  //   obj => obj.timezone.toLowerCase() === cityNameRequested.toLowerCase());
  // let forecastArr = [];
  // if (city) {
  //   city.data.data.forEach(item => forecastArr.push(new ForeCast(
  //     `low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`
  //     , item.datetime)));
  //   response.send(forecastArr);
  // } else {
  //   response.status(404).send('There is no weather data for the requested city');
  // }
  response.send(result.data.data.map(item => new ForeCast(item)));

}
module.exports = getWeather
