const messageModel = require("../models/messageModel");
const userModel = require("../models/userModel");
const conversationModel = require("../models/conversationModel");

const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");

// create new message
exports.createMessage = catchAsync(async (req, res, next) => {
  const { senderId, conversationId } = req.body;
  if (!senderId || !conversationId) {
    return next(
      new AppError(
        "Request is not Providing sender ID or conversation ID!",
        400
      )
    );
  }

  const sender = await userModel.findById(senderId);
  const conversation = await conversationModel.findById(conversationId);
  if (!sender || !conversation) {
    return next(new AppError("Not found with this IDs!", 404));
  }

  const newMessage = await messageModel.create({
    conversationId: conversationId,
    senderId: senderId,
    text: req.body.text,
  });

  res.status(200).json({
    status: "Success",
    newMessage,
  });
});


// get messages of a conversation
exports.getMessage = catchAsync(async (req, res, next) => {
  const { conversationId } = req.params;
  if (!conversationId) {
    return next(
      new AppError("Request is not Providing conversation ID!", 400)
    );
  }

  const message = await messageModel.find({
    conversationId: conversationId,
  });

  if (!message) {
    return next(new AppError("No message found!", 404));
  }

  res.status(200).json({
    status: "Success",
    message,
  });
});
