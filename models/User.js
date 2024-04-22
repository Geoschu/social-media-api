const { Schema, model } = require('mongoose');
const assignmentSchema = require('./Reactions');

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
    thoughts: [thoughtsSchema],
    friends: [userSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Student = model('user', userSchema);

module.exports = Student;
