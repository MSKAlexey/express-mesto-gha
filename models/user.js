const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Alexey',
    required: [true, 'Поле должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля 2'],
    maxlength: [30, 'Максимальная длина поля 30'],
  },
  about: {
    type: String,
    default: 'Demin',
    required: [true, 'Поле должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля 2'],
    maxlength: [30, 'Максимальная длина поля 30'],
  },
  avatar: {
    type: String,
    default: 'https://mobimg.b-cdn.net/v3/fetch/6d/6d48cc4931068721007e798bbfcd1e8c.jpeg',
    required: [true, 'Поле должно быть заполнено'],
  },
  email: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Поле должно быть заполнено'],
  },
}, { versionKey: false });

const User = mongoose.model('user', userSchema);

module.exports = User;