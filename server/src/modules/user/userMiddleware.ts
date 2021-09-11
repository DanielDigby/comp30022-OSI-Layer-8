import express from "express";
import mongoose from "mongoose";
import { IRequestWithUser } from "../../interfaces/expressInterfaces";

// import model
const User = require("./userModel");
mongoose.model("User");

// create a user and attach to request object
export const createUser = async (
    req: IRequestWithUser,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: User.generateHash(req.body.password),
            profilePic: req.body?.profilePic,
            colourScheme: req.body.colourScheme,
            tags: req.body.tags,
        });

        newUser.save();
        req.user = newUser;
        next();
    } catch (err) {
        return res.send(err);
    }
};
