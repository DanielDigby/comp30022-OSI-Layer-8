import passport, { PassportStatic } from "passport";
import mongoose from "mongoose";
import passportLocal from "passport-local";
import passportLjwt from "passport-jwt";
import { IUser } from "../../src/modules/user/userModel";

const LocalStrategy = passportLocal.Strategy;

const User = mongoose.model("User");

// Match username and password to locally stored values
passport.use(
    new LocalStrategy(function (username, password, done) {
        User.findOne(
            { username: username },
            function (err: Error, user: IUser) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                if (!user.validatePassword(password)) {
                    return done(null, false);
                }
                return done(null, user);
            }
        );
    })
);
