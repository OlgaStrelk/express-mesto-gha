const router = require('express').Router();
const { createUser, login } = require('../controllers/auths');

router.post('/signup', createUser);
router.post('/signin', login);

module.exports = router;
