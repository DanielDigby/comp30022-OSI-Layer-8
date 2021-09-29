import express from "express";
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
        if (id !== req.user._id)
            throw new AppError("Unauthorized", 403, "Forbidden ", true);

        const newData = req.body;
        const user = await User.findByIdAndUpdate(id, newData).setOptions({
            new: true,
            overwrite: true,
        });

        return res.status(200).send(user);
    } catch (err) {
        return res.send(err);
    }
};

module.exports = {
    updateUser,
};
