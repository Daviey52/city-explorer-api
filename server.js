'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const PORT = process.env.PORT;
const weatherData = require('./data/weather.json');
const axios = require('axios');



class ForeCast {
  constructor (day) {
    this.description = day.weather.description;
    this.date = day.datetime;

  }
}
class Movie {
  constructor (video) {
    this.title = video.original_title;
    this.overview = video.overview;
    this.average_votes = video.vote_average;
    this.total_votes = video.vote_count;
    this.image_url = video.poster_path;
    this.popularity = video.popularity;
    this.released_on = video.release_date;

  }
}


app.get('/weather', async (request, response) => {
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



});

app.get('/movie', async (request, response) => {
  let cityNameRequested = request.query.searchQuery;
  console.log(cityNameRequested);

  console.log('here');
  let movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityNameRequested}`);

  console.log(movieResponse.data.results);
  response.send(movieResponse.data.results.map(obj => new Movie(obj)));

});


app.get('/*', (request, response) => {
  response.status(500).send('something went wrong');

});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});


