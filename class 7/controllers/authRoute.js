const { signupController } = require("./authController");
const router = require("express").Router();

router.post("/api/auth/signup", signupController);

module.exports = router