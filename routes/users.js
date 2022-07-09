const router = require('express').Router();
const { createUser } = require('../controllers/user');

router.get('/users', (req, res) => {
  res.send('USERS');
});

router.get('/users/:id', (req, res) => {
  res.send('user ID');
});

router.post('/users', createUser);

module.exports = router;
