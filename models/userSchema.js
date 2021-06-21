const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  productCRUD: {
    type: Boolean,
    required: false,
    default: false,
  },
  admin: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
