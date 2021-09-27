import express from "express";
import { verifyJwt } from "../auth/authMiddleware"

const userController = require("./userController");
const userRouter = express.Router();

// Update a user's details
userRouter.put("/:Id", verifyJwt, userController.updateUser);

module.exports = userRouter;
