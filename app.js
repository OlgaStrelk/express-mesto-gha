require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const helmet = require('helmet');
// const cookieParser = require('cookie-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const authRouter = require('./routes/index');
const auth = require('./middlewares/auth');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cookieParser());
// app.use(helmet());

app.use((req, res, next) => {
  req.user = {
    _id: '62c9dea2650c3cbf3890c462',
  };

  next();
});
app.use('/', authRouter);

app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});
// добавить мидллвэр для централизованной обработки ошибки
// app.use((err, req, res, next) => {
// const { statusCode = 500, message } = err;

// res
//   .status(statusCode)
//   .send({
//    // проверяем статус и выставляем сообщение в зависимости от него
//     message: statusCode === 500
//       ? 'На сервере произошла ошибка'
//       : message
//   });
// });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
