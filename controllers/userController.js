const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find()
            .select('-__v')
            .then(userData => res.json(userData))
            .catch((err) => res.status(500).json(err));
    },
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate({ path: 'friends', select: '-__v' })
            .populate({ path: 'thoughts', select: '-__v' })
            .then(userData => res.json(userData))
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create( req.body )
            .then(userData => res.json(userData))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId}, req.body)
        .then(userData => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },
    destroyUser(req, res) {
        User.deleteOne({ _id: req.params.userId})
        .then(userData => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },
    addOneFriend(req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, 
            { $push: { friends: req.params.friendId}},
            { new: true })
            .then(userData => res.json(userData))
            .catch((err) => res.status(500).json(err));
    },
    destroyFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId}, 
            { $pull: { friends: req.params.friendId}},
            { new: true })
            .then(userData => res.json(userData))
            .catch((err) => res.status(500).json(err));
    }
}

module.exports = userController;