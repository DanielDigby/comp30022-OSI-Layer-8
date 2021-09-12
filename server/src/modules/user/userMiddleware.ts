import express from "express";
import mongoose from "mongoose";
import { hashPassword } from "../../helpers/security";
import { AppError } from "../../helpers/errors";
import { IRequestWithUser } from "../../interfaces/expressInterfaces";

// import model
const User = require("./userModel");

// create a user and attach to request object
export const createUser = async (
    req: IRequestWithUser,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        if (req.body.password1 !== req.body.password2)
            throw new AppError(
                "Password Error",
                400,
                "user passwords are not able to be unified",
                true
            );

        const newUser = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashPassword(req.body.password),
            profilePic: req.body?.profilePic,
        });

        newUser.save();
        req.user = newUser;
        next();
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            err = new AppError(
                "Validation Error",
                400,
                "incorrect user fields",
                true
            );
        }
        next(err);
    }
};
