import express from "express";
import passport from "passport";
import { validate } from "../../helpers/security/middleware";
import { watchBruteforce } from "../../helpers/security/bruteforce";
import { loginSchema, registerSchema } from "./authValidation";
import { createUser } from "../user/userMiddleware";

const authController = require("./authController");
const authRouter = express.Router();

// post a user register action
authRouter.post("/register", createUser, authController.postLogin);

// post a user login action
authRouter.post(
    "/login",
    watchBruteforce,
    validate(loginSchema),
    passport.authenticate("local", { session: false }),
    authController.postLogin
);

// post a user logout action
authRouter.get(
    "/logout",
    passport.authenticate("jwt", { session: false }),
    validate(registerSchema),
    authController.getLogout
);

module.exports = authRouter;
