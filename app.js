/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const routes = require('./routes');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();
app.use(helmet());

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('ok'));
