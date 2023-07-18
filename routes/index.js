const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlwares/auth');

router.post('/signup', createUser);
router.post('/signin', login);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req, res, next) => {
  next(res.status(404).send('Маршрут не найден'));
});

module.exports = router;
