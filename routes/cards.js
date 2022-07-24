const router = require('express').Router();
const {
  createCard, getCards, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');
const { cardValidator, cardIdValidator} = require('../validation/cards')

router.post('/cards', cardValidator, createCard);
router.get('/cards', getCards);
router.delete('/cards/:cardId', cardIdValidator, deleteCardById);
router.put('/cards/:cardId/likes', cardIdValidator, likeCard);
router.delete('/cards/:cardId/likes', cardIdValidator, dislikeCard);

module.exports = router;
