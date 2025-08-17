
const { signupController } = require("../controllers/signUpController");
const { signinController } = require("../controllers/signInController");
const publicRouter = require("express").Router();

publicRouter.post("/auth/signup", signupController);
publicRouter.post("/auth/signin", signinController);

module.exports = publicRouter