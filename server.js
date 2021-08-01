'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const PORT = process.env.PORT;
let weatherData = require('./weather.json');


app.get('/weather', (request, response) => {
  let weather = request.query;
  response.send(weatherData);
});


app.get('/*', (request, response) => {
  response.status(500).send('something went wrong');

});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});


