import express from "express";
import mongoose from "mongoose";

// import model
const User = require("./userModel");
mongoose.model("User");

// controller for creating a new user
const createUser = async (req: express.Request, res: express.Response) => {
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
        return res.status(200).send(newUser);
    } catch (err) {
        return res.send(err);
    }
};

// controller for updating a user's profile details
const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.Id;
        const newData = req.body;
        const note = await User.findByIdAndUpdate(id, newData).setOptions({
            new: true,
            overwrite: true,
        });

        return res.status(200).send(note);
    } catch (err) {
        return res.send(err);
    }
};

module.exports = {
    createUser,
    updateUser,
};
