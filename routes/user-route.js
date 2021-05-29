const userController = require("../controller/user");
const express = require("express");

const userRouter = express.Router();

userRouter
	.post("/signup", userController.signup)
	.post("/login", userController.login);

module.exports = userRouter;
