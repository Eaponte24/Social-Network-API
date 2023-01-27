const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {

    // Get all thoughts
    getAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get a single thought by its _id
    getSingleThought: async (req, res) => {
        try {
            const thought = await Thought.findById(req.params.id);
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a new thought and push the created thought's _id to the associated user's thoughts array field
    createThought: async (req, res) => {
        try {
            const thought = await Thought.create(req.body)
            .then(dbThoughtData => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            }
            )
            .catch(err => res.json(err));
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update a thought by its _id and return the updated thought
    updateThought: async (req, res) => {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);

        }
    },

    // Delete a thought by its _id and remove the thought's _id from any associated users' thoughts array field
    deleteThought: async (req, res) => {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.id)
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with this id!' });
                    return;
                }
                return User.findOneAndUpdate(
                    { username: dbThoughtData.username },
                    { $pull: { thoughts: req.params.id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Thought deleted, but no user found' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a reaction stored in a single thought's reactions array field
    createReaction: async (req, res) => {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            )
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a reaction by the reaction's reactionId value and remove the reactionId from the thought's reactions array field
    deleteReaction: async (req, res) => {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            )
    .then((dbThoughtData) => {
        !dbThoughtData
            ? res.status(404).json({ message: 'No thought found with this id!' })
            : res.json(dbThoughtData);
    })
    .catch((err) => res.json(err));
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

            
       

};
    
      




