const router = require('express').Router();

const {
  createUser,
  getUsers,
  login,
  getUsersById,
  updateProfile,
} = require('../controllers/users');
const { validateAvatarUpdate, validateProfileUpdate } = require('../middlwares/validators/validators');

router.post('/', createUser);

router.get('/', getUsers);
router.get('/', login);

router.get('/me', getUsersById);

router.get('/:id', getUsersById);

router.patch('/me', validateProfileUpdate, updateProfile);
router.patch('/me/avatar', validateAvatarUpdate, updateProfile);

module.exports = router;
