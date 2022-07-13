const router = require('express').Router();

const {
  getUserById,
  getUsers,
  updateProfile,
  updateAvatar,
} = require('../controllers/user');

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.patch('/users/me', updateProfile);

router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
