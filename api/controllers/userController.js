const UserModel = require("../models/userModel");
const { UserRoles } = require("../models/userModel");

const catchAsync = require("./../util/catchAsync");
const AppError = require("./../util/appError");

//todo add req.user
// exports.getProfile = catchAsync(async (req, res, next) => {
//   res.status(200).json({
//     user: req.user,
//   });
// });

exports.getProfile = catchAsync(async (req, res, next) => {
  const { username, userId } = req.query;

  const user = userId
  ? await UserModel.findById(userId)
  : await UserModel.findOne({ username: username });

  if (!user) {
    return next(new AppError("User Does not Exist!", 400));
  }

  res.status(200).json({
    status: "Success",
    user,
  });
});

exports.getFriends = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const user = await UserModel.findById(userId);
  const friends = await Promise.all(
    user.followings.map((friendId) => {
      return UserModel.findById(friendId);
    })
  );
  let friendList = [];
  friends.map((friend) => {
    const { _id, username, profilePicture } = friend;
    friendList.push({ _id, username, profilePicture });
  });

  res.status(200).json({
    status: "Success",
    friendList,
  });
});

exports.followAUser = catchAsync(async (req, res, next) => {
  const { userId, currentUserId } = req.body;

  if (userId !== currentUserId) {
    const user = await UserModel.findById(userId);
    const currentUser = await UserModel.findById(currentUserId);
    if (!user.followers.includes(currentUserId)) {
      await user.updateOne({ $push: { followers: currentUserId } });
      await currentUser.updateOne({ $push: { followings: userId } });
    } else {
      return next(new AppError("You already follow this user!", 403));
    }
  } else {
    return next(new AppError("You can not follow yourself!", 403));
  }
  res.status(200).json({
    status: "Success",
    // user,
  });
});

exports.unFollowAUser = catchAsync(async (req, res, next) => {
  const { userId, currentUserId } = req.body;

  if (userId !== currentUserId) {
    const user = await UserModel.findById(userId);
    const currentUser = await UserModel.findById(currentUserId);
    if (user.followers.includes(currentUserId)) {
      await user.updateOne({ $pull: { followers: currentUserId } });
      await currentUser.updateOne({ $pull: { followings: userId } });
    } else {
      return next(new AppError("You do not follow this user!", 403));
    }
  } else {
    return next(new AppError("You can not unfollow yourself!", 403));
  }
  res.status(200).json({
    status: "Success",
    // user,
  });
});
