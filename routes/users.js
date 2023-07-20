const router = require('express').Router();
const { validateSingUp } = require('../middlwares/validators/validate');

const {
  createUser,
  getUsers,
  login,
  getUsersById,
  updateProfile,
} = require('../controllers/users');

router.post('/', createUser);

router.get('/', getUsers);
router.get('/', validateSingUp, login);

router.get('/me', getUsersById);

router.get('/:id', getUsersById);

router.patch('/me/avatar', updateProfile);
router.patch('/me', updateProfile);

module.exports = router;
