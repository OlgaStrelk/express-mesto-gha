const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const { generateToken } = require('../helpers/jwt');
const User = require('../models/user');

// const { NODE_ENV, JWT_SECRET } = process.env;
const DUPLICATED_DATA_ERROR = 11000;
const SAULT_ROUNDS = 10;

module.exports.createUser = (req, res) => {
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
        return res.status(409).send({ message: 'Данный email уже занят' });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные пользователя' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на стороне сервера' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      generateToken({ email: user.email })
        .then((token) => {
          res
            .cookie('jwt', token, {
              maxAge: 3600000 * 7,
              httpOnly: true,
            })
            .send({ token });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные пользователя' });
      }
      if (err.statusCode === 403) res.status(403).send({ message: err.message });
      return res.status(500).send({ message: 'Произошла ошибка на стороне сервера' });
    });
};
