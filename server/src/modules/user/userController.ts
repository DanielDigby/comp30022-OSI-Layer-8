import express from "express";
import { hashPassword } from "../../helpers/security";
import mongoose from "mongoose";
import { AppError } from "../../helpers/errors";
import { IRequestWithUser } from "../../interfaces/expressInterfaces";

// import model
const User = require("./userModel");
mongoose.model("User");

// controller for updating a user's profile details
const updateUser = async (req: IRequestWithUser, res: express.Response) => {
    try {
        const id = req.params.Id;
        if (id.toString() !== req.user._id.toString())
            throw new AppError("Unauthorized", 403, "Forbidden", true);

        const newData = req.body;
        delete newData.password;

        const user = await User.findById(id);
        Object.assign(user, newData);
        await user.save();
        newData.password = "redacted";

        return res.status(200).send(newData);
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
};

// controller for updating a user's password
const updatePassword = async (req: IRequestWithUser, res: express.Response) => {
    try {
        const id = req.params.Id;
        if (id.toString() !== req.user._id.toString())
            throw new AppError("Unauthorized", 403, "Forbidden", true);

        const { password1, password2 } = req.body;
        if (password1 !== password2)
            throw new AppError("Fail", 400, "Non matching passwords", true);

        const user = await User.findById(id);
        user.password = hashPassword(password1);
        await user.save();
        user.password = "redacted";

        return res.status(200).send(user);
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
};

module.exports = {
    updateUser,
    updatePassword,
};
