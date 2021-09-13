import express from "express";

const userController = require("./userController");
const userRouter = express.Router();

// update a user's details
userRouter.put("/:Id", userController.updateUser);

module.exports = userRouter;
