const router = require('express').Router();
const { createUser, login } = require('../controllers/auths');
const isAuthorized = require('../middlewares/isAuthorized');
const { throwNotFoundError } = require('../utils/errors');

router.post('/signup', createUser);
router.post('/signin', login);

router.use(isAuthorized);

router.use('/cards', require('./users'));
router.use('/users', require('./cards'));

router.use((req, res, next) => {
  next(throwNotFoundError('Страница не найдена'));
});

module.exports = router;
