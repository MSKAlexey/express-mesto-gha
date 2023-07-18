const Card = require('../models/card');

const createCard = (req, res, next) => {
  const {
    name,
    link,
  } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch(next);
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => {
      next(res.status(404).send('Карточка не найдена'));
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        next(res.status(404).send('Удалять можно только свои карточки'));
      } else {
        card.deleteOne(card)
          .then(() => res.send({ data: card }));
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('Что то пошло не так'))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('Что то пошло не так'))
    .catch(next);
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  dislikeCard,
  likeCard,
};
