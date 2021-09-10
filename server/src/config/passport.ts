import passport, { PassportStatic } from "passport";
import mongoose from "mongoose";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
import { extractJwt, validatePassword } from "../helpers/security";

import { IUser } from "../modules/user/userModel";
const User = mongoose.model("User");

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;

// Match username and password to locally stored values
passport.use(
    new LocalStrategy(function localStrategyCB(username, password, done) {
        User.findOne(
            { username: username },
            function localStrategyResult(err: Error, user: IUser) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                if (!validatePassword(password, user.password)) {
                    return done(null, false);
                }
                return done(null, user);
            }
        );
    })
);

// Decrypt incoming jwt to find associated user
// TODO (Daniel) change secret to environment variable
const JWTStrategyConfig = {
    secretOrKey: "secret",
    jwtFromRequest: extractJwt,
};
passport.use(
    new JwtStrategy(JWTStrategyConfig, function jwtStrategyCB(
        jwt_payload,
        done
    ) {
        User.findOne(
            { id: jwt_payload._id },
            function jwtStrategyResult(err: Error, user: IUser) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }
        );
    })
);
