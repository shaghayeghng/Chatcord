const express = require("express");

const userConroller = require("../controllers/userController");

const router = express.Router();

router.route("/profile").get(userConroller.getProfile);

router.route("/friends/:userId").get(userConroller.getFriends);

router.route("/follow-friend").put(userConroller.followAUser);
router.route("/unfollow-friend").put(userConroller.unFollowAUser);

module.exports = router;
