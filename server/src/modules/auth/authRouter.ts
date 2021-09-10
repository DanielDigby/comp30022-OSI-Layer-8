import express from "express";
import passport from "passport";
import { createUserMiddleware } from "../user/userController";

const authController = require("./authController");
const authRouter = express.Router();

// post a user register action
authRouter.post("/register", createUserMiddleware, authController.postRegister);

// post a user login action
authRouter.post(
    "/login",
    passport.authenticate("local"),
    authController.postLogin
);

// post a user logout action
authRouter.post(
    "/logut",
    passport.authenticate("jwt"),
    authController.postLogout
);

module.exports = authRouter;
