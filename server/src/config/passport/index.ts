import passport from "passport";
import mongoose from "mongoose";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
import { AppError } from "../../helpers/errors";
import { extractJwt, validatePassword } from "../../helpers/security";

import { IUser } from "../../modules/user/userModel";
import { resetBruteForce } from "../../helpers/security/bruteforce";
const User = mongoose.model("User");

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;

// Match email and password to locally stored values
var LocalStrategyConfig = {
    usernameField: "email",
    passwordField: "password",
};
passport.use(
    new LocalStrategy(LocalStrategyConfig, async function localStrategyCB(
        email,
        password,
        done
    ) {
        try {
            const user = <IUser>await User.findOne({ email: email });
            if (!user || !validatePassword(password, user.password)) {
                // TODO (Daniel) rate limit failed login attempts
                return done(null, false);
            }
            // TODO (Daniel) reset rate limiter on successful login
            user.password = "redacted";
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

// Decrypt incoming jwt to find associated user
// TODO (Daniel) change secret to environment variable
const JWTStrategyConfig = {
    secretOrKey: "secret",
    jwtFromRequest: extractJwt,
};
passport.use(
    new JwtStrategy(JWTStrategyConfig, async function jwtStrategyCB(
        jwt_payload,
        done
    ) {
        try {
            const user = <IUser>await User.findOne({ id: jwt_payload._id });
            if (!user) {
                // TODO (Daniel) rate limit failed login attempts
                return done(null, false);
            }
            // TODO (Daniel) reset rate limiter on successful login
            user.password = "redacted";
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);
