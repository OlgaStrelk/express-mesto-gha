const Card = require('../models/card');
const { throwBadRequestError, throwNotFoundError, throwForbiddenError } = require('../helpers/errors');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throwBadRequestError('Переданы некорректные данные карточки');
      } else {
        next();
      }
    });
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throwNotFoundError('Карточка с указанным _id не найдена');
      }
      if (req.user._id !== card.owner.toString()) {
        throwForbiddenError('Отсутствуют права для удаления данной карточки');
      } else {
        Card.findByIdAndRemove(req.params.cardId)
          .then((removedCard) => {
            res.send({ data: removedCard });
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throwBadRequestError('Переданы некорректные данные карточки');
      } else {
        next();
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throwBadRequestError('Переданы некорректные данные карточки');
      } else {
        next();
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throwNotFoundError('Передан несуществующий id карточки.');
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throwBadRequestError('Переданы некорректные данные для постановки лайка.');
      } else {
        next();
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throwNotFoundError('Передан несуществующий id карточки.');
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throwBadRequestError('Переданы некорректные данные для снятия лайка.');
      } else {
        next();
      }
    });
};
