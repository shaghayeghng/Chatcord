const UserModel = require("../models/userModel");
const { UserRoles } = require("../models/userModel");

const catchAsync = require("./../util/catchAsync");
const AppError = require("./../util/appError");

exports.getProfile = catchAsync(async (req, res, next) => {
  res.status(200).json({
    user: req.user,
  });
});

exports.getOtherProfile = catchAsync(async (req, res, next) => {
  const { username } = req.params;

  const user = await UserModel.findOne({
    username,
  });
  if (!user) {
    return next(new AppError("User Does not Exist!", 400));
  }

  res.status(200).json({
    status: "Success",
    user,
  });
});
