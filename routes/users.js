const router = require('express').Router();
const {
  createUser,
  getUserById,
  getUsers,
  updateProfile,
  updateAvatar,
} = require('../controllers/user');

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.post('/users', createUser);

router.patch('/users/me', updateProfile);

router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
