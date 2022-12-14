const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const catchAsync = require("./../util/catchAsync");
const AppError = require("./../util/appError");

// Register
exports.signUp = catchAsync(async (req, res, next) => {
  //generate new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create new user
  const newUser = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  //save user and respond
  const user = await newUser.save();
  res.status(201).json({
    status: "Success",
    user,
  });
});

// Login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please enter your email and password", 400));
  }

  //Check if the user exists && if the password is correct
  const user = await userModel.find({ email: email }).select("+password");

  if (
    user.length !== 1 ||
    !(await bcrypt.compare(password, user[0].password))
  ) {
    return next(new AppError("Wrong email or password!", 401));
  }

  //!
  const currentUser = user[0];
  req.user = currentUser;
  res.locals.user = currentUser;

  res.status(200).json({
    status: "Success",
    currentUser,
  });
});

//todo isLoggedIn
