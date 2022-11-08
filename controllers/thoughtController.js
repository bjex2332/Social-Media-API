const { User, Thought } = require('../models');

const thoughtController = {
    getEveryThought(req, res) {
        Thought.find()
            .select('-__v')
            .then(thoughtData => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .populate({ path: 'reactions', select: '-__v' })            
            .then(thoughtData => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },
    createNewThought(req, res) {
        Thought.create(req.body)
            .then((ThoughtData) => {
                return User.findOneAndUpdate(                    
                    { _id: req.body.userId }, 
                    {  $addToSet: { thoughts: ThoughtData._id }}, 
                    { new: true }
                );
            })
            .then(thoughtData => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },
    updateOneThought(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, req.body)
        .then(thoughtData => res.json(thoughtData))
        .catch((err) => res.status(500).json(err));
    },
    destroyThought(req, res) {
        Thought.deleteOne({ _id: req.params.thoughtId})
        .then(thoughtData => res.json(thoughtData))
        .catch((err) => res.status(500).json(err));
    },
    clickReaction(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {
            $push: { reactions: req.params.reactionId}},
            { new: true })
            .populate({path: 'reactions', select: '-__v'})
            .select('-__v')
            .then(thoughtData => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },
    destroyReaction(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {
            $pull: { reactions: req.params.reactionId}},
            { new: true })
            .then(thoughtData => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    }
}

module.exports = thoughtController;