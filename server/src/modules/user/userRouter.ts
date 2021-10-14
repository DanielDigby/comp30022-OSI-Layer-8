import express from "express";
import { authenticate } from "passport";

const userController = require("./userController");
const userRouter = express.Router();

// Update a user's details
userRouter.put(
    "/:Id",
    authenticate("jwt", { session: false }),
    userController.updateUser
);

userRouter.put(
    "/password/:Id",
    authenticate("jwt", { session: false }),
    userController.updatePassword
);

module.exports = userRouter;
