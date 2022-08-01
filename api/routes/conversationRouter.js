const express = require("express");

const conversationConroller = require("../controllers/conversationController");

const router = express.Router();

router
  .route("/")
  .get(conversationConroller.getConversations)
  .post(conversationConroller.createConversation);

router
  .route("/:senderId/:recieverId")
  .get(conversationConroller.getAConversation);

module.exports = router;
