const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { login } = require('../controllers/users');
const userRouter = require('./users');

router.post('/signup', createUser);
router.post('/signin', login);

router.use('/users', userRouter);

router.use((req, res, next) => {
  next(new Error('Маршрут не найден'));
});

module.exports = router;