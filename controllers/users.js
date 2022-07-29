const User = require('../models/user');
const { throwBadRequestError, throwNotFoundError } = require('../utils/errors');

const NOT_FOUND_USER_ERR_MESSAGE = 'Пользователь с таким id не найден';
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        next(throwNotFoundError(NOT_FOUND_USER_ERR_MESSAGE));
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(throwBadRequestError('Отправлены некорректные данные'));
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
  console.log('Пришел');
  User.findById(req.user._id)
    .then((user) => {
      console.log(user);
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
        next(throwNotFoundError(NOT_FOUND_USER_ERR_MESSAGE));
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          throwBadRequestError('Переданы некорректные данные пользователя.'),
        );
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
        next(throwNotFoundError(NOT_FOUND_USER_ERR_MESSAGE));
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          throwBadRequestError(
            'Переданы некорректные данные при обновлении аватара',
          ),
        );
      } else {
        next();
      }
    });
};
