// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');

const validateCard = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24),
  }),
});

module.exports = {
  validateCard,
};
