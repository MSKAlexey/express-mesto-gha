const router = require('express').Router();

const {
  createUser,
  getUsers,
  login,
  getUsersById,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/', login);
router.get('/:id', getUsersById);

module.exports = router;
