const User = require('../models/user');
const { BadRequestError } = require('../utils/errors/BadRequestError');
const { NotFoundError } = require('../utils/errors/NotFoundError');

const NOT_FOUND_USER_ERR_MESSAGE = 'Пользователь с таким id не найден';
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw NotFoundError(NOT_FOUND_USER_ERR_MESSAGE);
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw BadRequestError('Отправлены некорректные данные');
      } else {
        next();
      }
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => next());
};

module.exports.getProfile = (req, res, next) => {
  console.log('тут');
  User.findById(req.user._id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => next());
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw NotFoundError(NOT_FOUND_USER_ERR_MESSAGE);
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw BadRequestError('Переданы некорректные данные пользователя.');
      } else {
        next();
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        throw NotFoundError(NOT_FOUND_USER_ERR_MESSAGE);
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw BadRequestError(
          'Переданы некорректные данные при обновлении аватара',
        );
      } else {
        next();
      }
    });
};
