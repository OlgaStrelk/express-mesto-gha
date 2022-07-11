const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '62c9dea2650c3cbf3890c462',
  };

  next();
});

app.use('/', userRouter);
app.use('/', cardRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});
// добавить мидллвэр для централизованной обработки ошибки
// app.use((err, req, res, next) => {
//   // это обработчик ошибки
// });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
