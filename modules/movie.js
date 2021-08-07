'use strict';
const axios = require('axios');

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


async function getMovies(request, response) {
  let cityNameRequested = request.query.searchQuery;
  console.log(cityNameRequested);

  console.log('here');
  let movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityNameRequested}`);

  console.log(movieResponse.data.results);
  response.send(movieResponse.data.results.map(obj => new Movie(obj)));

}

module.exports = getMovies
