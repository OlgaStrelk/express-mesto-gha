const router = require('express').Router();
const { createUser, getUserById } = require('../controllers/user');

router.get('/users', (req, res) => {
  res.send('USERS');
});

router.get('/users/:id', getUserById);

router.post('/users', createUser);

module.exports = router;
