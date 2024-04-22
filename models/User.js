const { Schema, model } = require('mongoose');
const Thoughts = require('./Thoughts');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (validateEmail) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(validateEmail);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'thoughts' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  },
  {
    toJSON: {
      virtuals: true,
    }, 
    id: false,
  }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

userSchema.virtual('userThoughts', {
  ref: 'thought',
  localField: '_id',
  foreignField: 'userId',
});

userSchema.pre('remove', async function(next) {
  await this.model('thought').deleteMany({ userId: this._id });
  next();
});

// Create the User model using the userSchema
const User = model('user', userSchema);

module.exports = User;
