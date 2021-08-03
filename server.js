'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const PORT = process.env.PORT;
const weatherData = require('./data/weather.json');


class ForeCast {
  constructor (description, date) {
    this.description = description;
    this.date = date;

  }
}


app.get('/weather', getWeather);
function getWeather(request, response) {
  console.log('weather hit');
  let cityNameRequested = request.query.searchQuery;
  let latRequested = (request.query.lat);
  let lonRequested = (request.query.lon);
  console.log(latRequested, lonRequested, cityNameRequested);

  let cityFound = weatherData.find(
    obj => obj.city_name.toLowerCase() === cityNameRequested.toLowerCase());


  let forecastArray = [];

  if (cityFound) {
    cityFound.data.forEach(obj => forecastArray.push(new ForeCast(
      `low of ${obj.low_temp}, high of ${obj.high_temp} with ${obj.weather.description}`
      , obj.datetime)));
    response.send(forecastArray);
  } else {
    response.status(404).send('There is no weather data for the requested city');
  }

}

app.get('*', (request, response) => {
  response.status(500).send('something went wrong');

});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});


