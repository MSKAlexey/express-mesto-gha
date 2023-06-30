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
    default: 'http://yandex.ru',
    required: [true, 'Поле должно быть заполнено'],
  },
  email: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
  },
  password: {
    type: String,
    // select: false,
    required: [true, 'Поле должно быть заполнено'],
  },
}, { versionKey: false });

const User = mongoose.model('user', userSchema);

module.exports = User;