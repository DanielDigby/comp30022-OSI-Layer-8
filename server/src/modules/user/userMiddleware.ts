import express from "express";
import mongoose from "mongoose";
import { hashPassword } from "../../helpers/security";
import { IRequestWithUser } from "../../interfaces/expressInterfaces";

// import model
import { IUser } from "./userModel";
const User = mongoose.model<IUser>("User");

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
            password: hashPassword(req.body.password1),
            profilePic: req.body?.profilePic,
        });

        newUser.save();
        req.user = newUser;
        next();
    } catch (err) {
        console.log(err);
        return res.send(err);
    }
};
