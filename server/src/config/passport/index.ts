import express from "express";
import passport from "passport";
import mongoose from "mongoose";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
import { extractJwt, validatePassword } from "../../helpers/security";
import { IUser } from "../../modules/user/userModel";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
const User = mongoose.model("User");

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;

let cache: {
    countBruteForce: (arg0: IUser, arg1: string, arg2: string) => void;
    resetBruteForce: (arg0: string, arg1: string) => void;
    checkJwtBlacklist: (
        arg0: express.Request<
            ParamsDictionary,
            any,
            any,
            ParsedQs,
            Record<string, any>
        >
    ) => any;
};
if (process.env.CACHE !== "false")
    cache = require("../../helpers/security/cache");

// Match email and password to locally stored values
passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        async function localStrategyCB(req, email, password, done) {
            try {
                const user = <IUser>await User.findOne({ email: email });
                if (process.env.CACHE !== "false")
                    cache.countBruteForce(user, email, req.ip);

                if (!user || !validatePassword(password, user.password)) {
                    return done(null, false);
                }

                // success
                user.password = "redacted";
                if (process.env.CACHE !== "false")
                    cache.resetBruteForce(req.ip, email);
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

// Decrypt incoming jwt to find associated user
passport.use(
    new JwtStrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: extractJwt,
            passReqToCallback: true,
        },
        async function jwtStrategyCB(
            req: express.Request,
            jwt_payload: { _id: string },
            done: (
                error: any,
                user?: any,
                options?: passportLocal.IVerifyOptions
            ) => void
        ) {
            try {
                if (process.env.CACHE !== "false")
                    await cache.checkJwtBlacklist(req);

                const user = <IUser>(
                    await User.findOne({ _id: jwt_payload._id })
                );
                if (!user) {
                    return done(null, false);
                }

                // success
                user.password = "redacted";
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);
