const router = require('express').Router();
const { createUser, login } = require('../controllers/auths');
const isAuthorized = require('../middlewares/isAuthorized');
const { userValidator } = require('../middlewares/validator');
const { notFoundError } = require('../utils/errors');

router.post('/signup', userValidator, createUser);

router.post('/signin', login);

router.use(isAuthorized);

router.use('/cards', require('./cards'));

router.use('/users', require('./users'));

router.use((req, res, next) => {
  next(notFoundError('Страница не найдена'));
});

module.exports = router;
