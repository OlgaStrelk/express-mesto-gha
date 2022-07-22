const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt');
const User = require('../models/user');
const { throwForbiddenError, throwBadRequestError, throwConflictError } = require('../helpers/errors');

// const { NODE_ENV, JWT_SECRET } = process.env;
const DUPLICATED_DATA_ERROR = 11000;
const SAULT_ROUNDS = 10;

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, SAULT_ROUNDS)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send(`Пользователь ${user.name} с почтой ${user.email} зарегистрирован`))
    .catch((err) => {
      if (err.code === DUPLICATED_DATA_ERROR) {
        next(throwConflictError('Данный email уже занят'));
      }
      if (err.name === 'ValidationError') {
        next(throwBadRequestError('Переданы некорректные данные пользователя'));
      }
      next();
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken({ _id: user._id });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 7,
          httpOnly: true,
        })
        .send({ token });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(throwBadRequestError('Переданы некорректные данные пользователя'));
      }
      if (err.statusCode === 403) {
        next(throwForbiddenError(err.message));
      }
      next();
    });
};
