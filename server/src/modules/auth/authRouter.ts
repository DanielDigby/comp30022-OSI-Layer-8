import express from "express";
import passport from "passport";

const authController = require("./authController");
const authRouter = express.Router();

// post a user register action
authRouter.post("/register", (req, res) => {
    res.redirect("../user");
});

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
