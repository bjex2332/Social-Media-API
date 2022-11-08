const router = require('express').Router();
const {
    getAllUsers, getOneUser, createUser, updateUser,
    destroyUser, addOneFriend, destroyFriend,
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getOneUser)
      .put(updateUser).delete(destroyUser);

router.route('/:userId/friends/:friendId').post(addOneFriend);

router.route('/:userId/friends/:friendId').delete(destroyFriend);

module.exports = router;