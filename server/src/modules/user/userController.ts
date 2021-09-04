import express from "express";
import mongoose from "mongoose";

// import model
const User = require('./userModel');
mongoose.model("User");

// controller for creating a new user
const createUser = async (req: express.Request, res: express.Response) => {
    try {
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            profilePic: req.body?.profilePic,
            colourScheme: req.body.colourScheme,
            tags: req.body.tags
        });

        newUser.save();
        return res.status(200).send(newUser);
    } catch (err) {
        return res.send(err);
    }
}

module.exports = {
    createUser,
};