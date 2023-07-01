const router = require('express').Router();

const { createUser, getUsers, login } = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/', login);

module.exports = router;
