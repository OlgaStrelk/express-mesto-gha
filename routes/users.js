const router = require('express').Router();
const { createUser, getUserById, getUsers } = require('../controllers/user');

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.post('/users', createUser);

module.exports = router;
