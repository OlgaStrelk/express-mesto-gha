require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const isAuthorized = require('./middlewares/isAuthorized');
const { throwNotFoundError } = require('./helpers/errors');
const { errors } = require('celebrate');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
// app.use(helmet());

app.use('/', require('./routes/index'));

app.use('/', isAuthorized, require('./routes/users'));
app.use('/', isAuthorized, require('./routes/cards'));

app.all('*', (req, res, next) => {
  next(throwNotFoundError('Страница не найдена'));
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
