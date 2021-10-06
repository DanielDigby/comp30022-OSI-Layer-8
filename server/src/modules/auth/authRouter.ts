import express from "express";
import passport from "passport";
import { validator } from "../../helpers/security/middleware";
import { loginSchema, registerSchema } from "./authValidation";
import { createUser } from "../user/userMiddleware";

const authController = require("./authController");
const authRouter = express.Router();

// post a user register action
authRouter.post("/register", createUser, authController.postLogin);

// post a user login action
authRouter.post(
    "/login",
    passport.authenticate("local", { session: false }),
    validator(loginSchema),
    authController.postLogin
);

// post a user logout action
authRouter.get(
    "/logout",
    passport.authenticate("jwt", { session: false }),
    validator(registerSchema),
    authController.getLogout
);

module.exports = authRouter;
