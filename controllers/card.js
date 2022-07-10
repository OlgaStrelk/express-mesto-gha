const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные карточки' });
      }
      res.status(500).send({ message: 'Произошла ошибка на стороне сервера' });
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === '') {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
      }
      res.status(500).send({ message: 'Произошла ошибка на стороне сервера' });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные карточки' });
      }
      res.status(500).send({ message: 'Произошла ошибка на стороне сервера' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => { res.send({ data: card }); })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан несуществующий id карточки' });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(404).send({ message: 'Переданы некорректные данные для постановки лайка.' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка на стороне сервера' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => { res.send({ data: card }); })
    .catch(((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Передан несуществующий id карточки' });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка.' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка на стороне сервера' });
    }));
};
