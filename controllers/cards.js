const Card = require('../models/card');

const getCards = (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('Cards');
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports = {
  getCards,
};
