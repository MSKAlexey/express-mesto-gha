const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const CreateAndEditUserCardProfileError = require('../errors/CreateAndEditUserCardProfileError');

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatat,
    email,
    password,
  } = req.body;

  bcrypt.hash(String(password), 10)
    .then((hashedPassword) => {
      User.create({
        name,
        about,
        avatat,
        email,
        password: hashedPassword,
        _id: req.user._id,
      })
        .then((user) => {
          res.send({ data: user });
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
  User.findOne({ email })
    .select('+password')
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            res.send({ data: user });
          } else {
            res.status(403).send({ message: 'Неправильный пароль' });
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
