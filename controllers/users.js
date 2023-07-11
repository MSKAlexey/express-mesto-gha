const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');
const CreateAndEditUserCardProfileError = require('../errors/CreateAndEditUserCardProfileError');
const NotFoundError = require('../errors/NotFoundError');

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(String(password), 10)
    .then((hashedPassword) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hashedPassword,
      })
        .then((user) => {
          res.status(201).send({ data: user });
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new CreateAndEditUserCardProfileError('Данный email уже зарегистрирован'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  // для предотвращения лишних пустых запросов
  if (!email || !password) {
    res.status(403).send({ message: 'Не введен email или пароль' });
    return;
  }

  User.findOne({ email })
    .select('+password')
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const jwt = jsonWebToken.sign({
              _id: user._id,
            }, 'SECRET');
            res.cookie('jwt', jwt, {
              maxAge: 360000,
              httpOnly: true,
              sameSite: true,
            });
            res.send({ data: user.toJSON() });
          } else {
            res.status(403).send({ message: 'Неправильные данные' });
          }
        });
    })
    .catch(next);
};

const getUsersById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => new NotFoundError('Пользователь с таким id не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const newUser = req.body;
  const id = req.user._id;
  return User.findByIdAndUpdate(id, newUser, {
    new: true,
    runValidators: true,
  })
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        throw new NotFoundError(`Пользователь по id  ${req.user._id} не найден`);
      }
      if (err.name === 'ValidationError') {
        throw new Error(`${Object.values(err.errors).map((error) => error.message).join(' and ')}`);
      }
      next(err);
    })
    .catch(next);
};

module.exports = {
  createUser,
  getUsers,
  login,
  getUsersById,
  updateProfile,
};
