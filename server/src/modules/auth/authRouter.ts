import express from "express";
import passport from "passport";
import { createUser } from "../user/userMiddleware";

const authController = require("./authController");
const authRouter = express.Router();

// post a user register action
authRouter.post("/register", createUser, authController.postLogin);

// post a user login action
authRouter.post(
    "/login",
    passport.authenticate("local", { session: false, failWithError: true }),
    authController.postLogin
);

// post a user logout action
authRouter.post(
    "/logut",
    passport.authenticate("jwt", { session: false, failWithError: true }),
    authController.postLogout
);

module.exports = authRouter;
