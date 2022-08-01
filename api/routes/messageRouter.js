const express = require("express");

const messageConroller = require("../controllers/messageController");

const router = express.Router();

router.route("/").post(messageConroller.createMessage);

router.route("/:conversationId").get(messageConroller.getMessage);

module.exports = router;
