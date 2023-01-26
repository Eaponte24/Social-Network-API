const User = require("../models/User");

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
      const user = await User.findById(req.params.id);
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

  // Update a user by its _id and return the updated user
  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

    // Delete a user by its _id
    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted...");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add a new friend to a user's friend list
    addFriend: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const friend = await User.findById(req.params.friendId);
            if (!user.friends.includes(friend._id)) {
                await user.updateOne({ $push: { friends: friend._id } });
                await friend.updateOne({ $push: { friends: user._id } });
                res.status(200).json("Friend has been added!");
            } else {
                res.status(403).json("You are already friends!");
            }
        }
        catch (err) {
            res.status(500).json(err);
        }   
    },

    // Remove a friend from a user's friend list
    removeFriend: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const friend = await User.findById(req.params.friendId);
            if (user.friends.includes(friend._id)) {
                await user.updateOne({ $pull: { friends: friend._id } });
                await friend.updateOne({ $pull: { friends: user._id } });
                res.status(200).json("Friend has been removed!");
            } else {
                res.status(403).json("You are not friends!");
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    
};
