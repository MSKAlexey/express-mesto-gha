const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const routes = require('./routes');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.listen(PORT, () => console.log('ok'));