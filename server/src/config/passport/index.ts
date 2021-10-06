import express from "express";
import passport from "passport";
import mongoose from "mongoose";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
import {
    extractJwt,
    checkJwtBlacklist,
    validatePassword,
} from "../../helpers/security";

import { IUser } from "../../modules/user/userModel";
import {
    countBruteForce,
    resetBruteForce,
} from "../../helpers/security/bruteforce";
const User = mongoose.model("User");

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;

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
                countBruteForce(user, email, req.ip);

                if (!user || !validatePassword(password, user.password)) {
                    return done(null, false);
                }

                // success
                user.password = "redacted";
                resetBruteForce(req.ip, email);
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

// Decrypt incoming jwt to find associated user
// TODO (Daniel) change secret to environment variable
passport.use(
    new JwtStrategy(
        {
            secretOrKey: "secret",
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
                await checkJwtBlacklist(req);

                const user = <IUser>await User.findOne({ id: jwt_payload._id });
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
