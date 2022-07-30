const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    conversationId: {
      type: mongoose.Types.ObjectId,
      ref: "conversation",
      required: true,
    },
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    text: {
      type: String,
      required: true,
      default: ""
    },
  },
  { timestamps: true }
);

const message = mongoose.model("message", messageSchema);
module.exports = message;
