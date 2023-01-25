const User = require('../models/User');


module.exports = {

    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get a single user
    getSingleUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }   
    },

    // Create a new user
    createUser: async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}
// Update a user by its _id and return the updated user
    
