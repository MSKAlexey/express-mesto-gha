const router = require('express').Router();

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { validateCard } = require('../middlwares/validators/validateCard');

router.post('/', createCard);
router.get('/', getCards);
router.delete('/:id', validateCard, deleteCard);
router.put('/:id/likes', likeCard);
router.delete('/:id/likes', dislikeCard);

module.exports = router;
