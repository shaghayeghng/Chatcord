const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const conversationSchema = new Schema(
  {
    members: {
      type: [mongoose.Types.ObjectId],
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const conversation = mongoose.model("conversation", conversationSchema);
module.exports = conversation;
