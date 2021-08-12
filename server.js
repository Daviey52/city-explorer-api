'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const PORT = process.env.PORT;

const weather = require('./modules/weather');
const movieFile = require('./modules/movie');


app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}


app.get('/movie', movieFile);
app.get('*', (request, response) => {
  response.status(500).send('something went wrong');

});

app.listen(PORT, () => {
  console.log(`Server up on ${PORT}`);
});


