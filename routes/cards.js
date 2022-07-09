const router = require('express').Router();
const { createCard } = require('../controllers/card');

router.post('/cards', createCard);

module.exports = router;
