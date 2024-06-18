const { Thoughts, User } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      res.json({ thoughts });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought by ID
  async getSingleThought(req, res) {
    console.log("getSingleThought");
    try {
      const thought = await Thoughts.findOne({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json({ thought });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thoughts.create(req.body);
      await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought } },
        { runValidators: true, new: true }
      );
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      await User.deleteMany({ _id: { $in: thought.users } });
      res.json({ message: "Thought and users deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a reaction to a thought
  async addReaction(req, res) {
    console.log("You are adding a reaction to a thought!");

    const { thoughtId } = req.params;
    const { reactionEmote, userName } = req.body;
    console.log(thoughtId, req.body);
    try {
      const reaction = {
        reactionEmote,
        userName,
      };
      const thought = await Thoughts.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: reaction } },
        { new: true, runValidators: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }
      console.log(thought);
      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Delete a reaction from a thought
  async deleteReaction(req, res) {
    console.log("You are deleting a reaction from a thought!");

    const { thoughtId } = req.params;
    const { reactionId } = req.body;
    console.log(thoughtId, reactionId);
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { reactionId } } },
        { new: true, runValidators: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }
      console.log(thought);
      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
