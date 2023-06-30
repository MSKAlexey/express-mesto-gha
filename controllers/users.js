const User = require('../models/user');

const createUser = (req, res, next) => {

  User.create(req.body)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  console.log('Hello')
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUser = (req, res) => {

  const { id } = req.params

  User.findById(id)
    .then((user) => {
      res.send(user)
    })
    .catch((error) => {
      res.status(400).send(error);
    })
}

module.exports = {
  createUser,
  getUsers,
  getUser
}