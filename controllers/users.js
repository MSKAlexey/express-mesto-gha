const bcrypt = require('bcryptjs');
const User = require('../models/user');

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
      })
        .then((user) => {
          res.send({ data: user });
        })
        .catch(next);
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('Users');
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(() => new Error('Пользователь не найден'))
    .then((user) => {
      // eslint-disable-next-line no-console
      console.log(user);
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

module.exports = {
  createUser,
  getUsers,
  login,
};
