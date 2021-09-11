import express from "express";
import mongoose from "mongoose";

// import model
const User = require("./userModel");
mongoose.model("User");

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
    updateUser,
};
