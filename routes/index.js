const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { create } = require('../models/user');
const userRouter = require('./users');

router.post('/signup', createUser);

router.use('/users', userRouter);

router.use((req, res, next) => {
  next(new Error('Маршрут не найден'));
});

module.exports = router;