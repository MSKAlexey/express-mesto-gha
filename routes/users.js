const router = require('express').Router();

const {
  createUser,
  getUsers,
  login,
  getUsersById,
  updateProfile,
} = require('../controllers/users');
const { validateSingUp } = require('../middlwares/validators/validate');

router.post('/', validateSingUp, createUser);

router.get('/', getUsers);
router.get('/', login);

router.get('/me', getUsersById);

router.get('/:id', getUsersById);

router.patch('/me/avatar', updateProfile);
router.patch('/me', updateProfile);

module.exports = router;
