const router = require('express').Router();
const { User } = require('../models/user');

router.get('/users', (req, res) => {
  res.send('USERS');
});

router.get('/users/:id', (req, res) => {
  res.send('user ID');
});

router.post('/users', (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));})

module.exports = router;
