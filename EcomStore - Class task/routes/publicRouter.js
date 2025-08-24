const { signupController, signinController } = require("../controller/userController");

const publicRouter = require("express").Router();

publicRouter.post("/signup", signupController)
publicRouter.post("/signin", signinController)


module.exports = publicRouter;