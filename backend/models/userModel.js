const mongoose = require('mongoose') //mongoose ODM to interact with Database

const userSchema = mongoose.Schema(
  {
//with every goal we have to know which user created that goal
//every goal is associated with a specific user
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('User', userSchema)