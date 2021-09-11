import express from "express";
import { hashPassword } from "../../helpers/security";
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
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashPassword(req.body.password),
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
