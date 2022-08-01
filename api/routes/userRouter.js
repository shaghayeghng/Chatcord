const express = require("express");

const userConroller = require("../controllers/userController");

const router = express.Router();


router.route("/my-profile").get(userConroller.getProfile);

router.route('/other-profile/:username').get(userConroller.getOtherProfile)

module.exports = router;
