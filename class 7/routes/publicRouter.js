
const { signupController } = require("../controllers/signUpController");
const { signinController } = require("../controllers/signInController");
const { getAvgAgeOfStd } = require("../controllers/getUsersController");
const publicRouter = require("express").Router();

publicRouter.post("/auth/signup", signupController);
publicRouter.post("/auth/signin", signinController);
publicRouter.get("/get-avg-users", getAvgAgeOfStd)

module.exports = publicRouter