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
        if (req.body.password1 !== req.body.password2)
            throw "Password mismatch";

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
        return res.send(err);
    }
};