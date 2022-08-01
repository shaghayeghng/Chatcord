const express = require("express");

const conversationConroller = require("../controllers/conversationController");

const router = express.Router();

router.route("/").post(conversationConroller.createConversation);

router.route("/:userId").get(conversationConroller.getConversations);

router
  .route("/:senderId/:recieverId")
  .get(conversationConroller.getAConversation);

module.exports = router;
