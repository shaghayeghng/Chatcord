const mongoose = require("mongoose");

const UserRoles = {
  ADMIN: "admin",
  USER: "user",
};

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Provide a username."],
      unique: [true, "This username is not available."],
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: [true, "Please Provide an Email."],
      unique: [true, "This Email is not available."],
      max: 50,
    },
    password: {
      type: String,
      required: [true, "Please Provide a password."],
      min: 6,
    },
    avatar: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    role: {
      type: String,
      enum: UserRoles,
      required: [true, "User Roles Must have a value."],
      default: UserRoles.USER,
    },
    // desc: {
    //   type: String,
    //   max: 50,
    // },
    // city: {
    //   type: String,
    //   max: 50,
    // },
    // from: {
    //   type: String,
    //   max: 50,
    // },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);
module.exports = user;
module.exports.UserRoles = UserRoles;
