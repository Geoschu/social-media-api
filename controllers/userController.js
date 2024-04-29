// ObjectId() method for converting userId string into an ObjectId for querying database
const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

// TODO: Create an aggregate function to get the number of users overall
const headCount = async () => {
  try {
    const numberOfUsers = await User.aggregate([
      {
        $group: {
          _id: null,
          number_of_users: { $count: {} },
        },
      },
    ]);
    return numberOfUsers;
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      const userObj = {
        users,
        headCount: await headCount(),
      };
      return res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .lean();

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json({
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and remove their thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      const thought = await Thought.findOneAndUpdate(
        { users: req.params.userId },
        { $pull: { users: req.params.userId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: "User deleted, but no thoughts found",
        });
      }

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a thought to a user
  async addThought(req, res) {
    console.log("You are adding a thought to a user!");
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a friend to a user's friend list
  async addFriend(req, res) {
    console.log("You are adding a friend");

    const { userId, friendId } = req.params;
    console.log(userId, friendId);
    try {
      // get the friend by their ID
      const friend = await User.findOne({ _id: friendId });
      console.log(friend);
      // save to friend variable

      // add friend to user's friend list

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { friends: friend } },
        { runValidators: true, new: true }
      );
      console.log(user);
      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove friend from a user's friend list
  async removeFriend(req, res) {
    console.log(req.params.userId, req.params.friendId);
    try {
      // Convert friendId to ObjectId
      const friendIdObjectId = new ObjectId(req.params.friendId);

      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        // $pull removes the friend from the friends array
        { $pull: { friends: friendIdObjectId } },
        { runValidators: true, new: true }
      );
      console.log(user);
      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
