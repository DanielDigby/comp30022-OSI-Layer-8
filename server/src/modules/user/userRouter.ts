import express from "express";

const userController = require("./userController");
const userRouter = express.Router();


// create a new note in database
userRouter.post("/", userController.createUser);

// update a user's details
userRouter.put('/:Id', userController.updateUser);

module.exports = userRouter;
