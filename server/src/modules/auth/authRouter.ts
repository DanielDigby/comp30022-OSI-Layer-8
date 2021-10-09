import express from "express";
import passport from "passport";
import { validate } from "../../helpers/security/middleware";

import { loginSchema, registerSchema } from "./authValidation";
import { createUser } from "../user/userMiddleware";

const authController = require("./authController");
const authRouter = express.Router();

// post a user register action
authRouter.post("/register", createUser, authController.postLogin);

// post a user logout action
authRouter.get(
    "/logout",
    passport.authenticate("jwt", { session: false }),
    validate(registerSchema),
    authController.getLogout
);

if (process.env.CACHE !== "false") {
    const cache = require("../../helpers/security/cache");
    authRouter.post(
        "/login",
        cache.watchBruteforce,
        validate(loginSchema),
        passport.authenticate("local", { session: false }),
        authController.postLogin
    );
} else {
    // post a user login action
    authRouter.post(
        "/login",
        validate(loginSchema),
        passport.authenticate("local", { session: false }),
        authController.postLogin
    );
}

module.exports = authRouter;
