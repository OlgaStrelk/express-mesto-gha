const router = require('express').Router();

const {
  getUserById,
  getUsers,
  updateProfile,
  updateAvatar,
  getProfile,
} = require('../controllers/users');

const { idValidator, avatarValidator, profileValidator } = require('../middlewares/validator')

router.get('/', getUsers);

router.get('/me', getProfile);

router.get('/:id', idValidator, getUserById);

router.patch('/me', profileValidator, updateProfile);

router.patch('/me/avatar', avatarValidator, updateAvatar);

module.exports = router;
