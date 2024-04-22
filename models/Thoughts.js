const { Schema, model } = require('mongoose');

const reactionSchema = require('./Reactions');

const thoughtSchema = new Schema(
  {
    thoughtContent: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: date,
      default: Date.now,
      get: function (timestamp) {
        return timestamp.toDateString();
      }
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
    },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function() { return this.reactions.length; });

const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;
