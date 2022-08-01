const conversationModel = require("../models/conversationModel");
const userModel = require("../models/userModel");

const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");

// create new conversation
exports.createConversation = catchAsync(async (req, res, next) => {
  const { senderId, recieverId } = req.body;
  if (!senderId || !recieverId) {
    return next(
      new AppError("Request is not Providing sender ID or reciever ID!", 400)
    );
  }

  const sender = await userModel.findById(senderId);
  const reciever = await userModel.findById(recieverId);
  if (!sender || !reciever) {
    return next(new AppError("No users found with this IDs!", 404));
  }

  const newConversation = await conversationModel.create({
    members: [senderId, recieverId],
  });

  res.status(200).json({
    status: "Success",
    newConversation,
  });
});

// get conversations of a user
exports.getConversations = catchAsync(async (req, res, next) => {
  const conversation = await conversationModel.find({
    members: { $in: [req.user._id] },
  });

  if (!conversation) {
    return next(new AppError("No conversation found!", 404));
  }

  res.status(200).json({
    status: "Success",
    conversation,
  });
});

// get a conversation include 2 users
exports.getAConversation = catchAsync(async (req, res, next) => {
    const { senderId, recieverId } = req.params;
    if (!senderId || !recieverId) {
      return next(
        new AppError("Request is not Providing sender ID or reciever ID!", 400)
      );
    }

    const conversation = await conversationModel.findOne({
        members: { $all: [senderId, recieverId] },
    });
  
    if (!conversation) {
      return next(new AppError("No conversation found!", 404));
    }
  
    res.status(200).json({
      status: "Success",
      conversation,
    });
  });
  