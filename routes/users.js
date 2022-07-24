const router = require('express').Router();

const {
  getUserById,
  getUsers,
  updateProfile,
  updateAvatar,
  getProfile,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getProfile);

router.get('/:id', getUserById);

router.patch('/me', updateProfile);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
