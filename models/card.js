const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Card',
    required: [true, 'Поле name должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля 2'],
    maxlength: [30, 'Максимальная длина поля 30'],
  },
  owner: {
    type: String,
    required: [true, 'Поле owner должно быть заполнено'],
  },
  link: {
    type: String,
    default: 'https://mobimg.b-cdn.net/v3/fetch/6d/6d48cc4931068721007e798bbfcd1e8c.jpeg',
    required: [true, 'Поле link должно быть заполнено'],
  },
  likes: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

const Card = mongoose.model('card', cardSchema);

module.exports = Card;
