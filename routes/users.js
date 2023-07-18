const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');

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

router.get('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), getUsersById);

router.get('/:id', getUsersById);

router.patch('/me/avatar', updateProfile);
router.patch('/me', updateProfile);

module.exports = router;
