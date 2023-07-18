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
router.get('/me', getUsersById);
router.get('/:id', getUsersById);

router.patch('/', updateProfile);

module.exports = router;
