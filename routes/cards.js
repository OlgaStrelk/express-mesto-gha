const router = require('express').Router();
const {
  createCard, getCards, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');
const { cardValidator, idValidator } = require('../middlewares/validator');

router.post('/', cardValidator, createCard);

router.get('/', getCards);

router.delete('/:cardId', idValidator, deleteCardById);

router.put('/:cardId/likes', idValidator, likeCard);

router.delete('/:cardId/likes', idValidator, dislikeCard);

module.exports = router;
