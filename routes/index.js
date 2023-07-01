const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const userRouter = require('./users');
const cardRouter = require('./cards');

router.post('/signup', createUser);
router.post('/signin', login);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req, res, next) => {
  next(new Error('Маршрут не найден'));
});

module.exports = router;
