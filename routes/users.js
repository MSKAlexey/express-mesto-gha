const router = require('express').Router();

const {
  createUser,
  getUsers,
  login,
  getUsersById,
  updateProfile,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/', login);
router.get('/:id', getUsersById);
router.patch('/me', updateProfile);

module.exports = router;
