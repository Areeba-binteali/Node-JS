const authMiddleware = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/checkAdmin");
const { signupController, getAllUsersforAdmin, signinController } = require("./authController");
const router = require("express").Router();

router.post("/auth/signup", signupController);
router.post("/auth/signin", signinController);
router.get("/admin/get-all-users", authMiddleware, adminOnly, getAllUsersforAdmin);

module.exports = router