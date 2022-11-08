const router = require('express').Router();
const {
    getEveryThought, getOneThought, createNewThought,
    updateOneThought, destroyThought, clickReaction, destroyReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getEveryThought).post(createNewThought);

router.route('/:thoughtId').get(getOneThought)
      .put(updateOneThought).delete(destroyThought)
      .post(createNewThought);

router.route('/:thoughtId/reactions').post(clickReaction);

router.route('/:thoughtId/reactions/:reactionId')
      .delete(destroyReaction);

module.exports = router;