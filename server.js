'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const PORT = process.env.PORT;

const weatherFile = require('./modules/weather');
const movieFile = require('./modules/movie');


app.get('/weather', weatherFile);
app.get('/movie', movieFile);


app.get('*', (request, response) => {
  response.status(500).send('something went wrong');

});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});


