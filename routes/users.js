const router = require('express').Router();
const { users } = require('../db');

router.get('/users/:id', (req, res) => {
  if (!users[req.params.id]) {
    res.send('Такого пользователя не существует');
    return;
  }
  res.send(users[req.params.id]);
});

module.exports = router;
