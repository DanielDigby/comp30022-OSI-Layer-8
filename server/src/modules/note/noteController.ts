import express from "express";
import { AppError } from "../../helpers/errors";
import mongoose from "mongoose";
import { IRequestWithUser } from "../../interfaces/expressInterfaces";
import { INote } from "./noteModel";

// import model
const Note = mongoose.model("Note");

// controller for getting all notes
const getNotes = async (req: IRequestWithUser, res: express.Response) => {
    try {
        const notes = await Note.find({ user: req.user._id });

        return res.status(200).send(notes);
    } catch (err) {
        return res.send(err);
    }
};

// controller for getting a specific note
const getNote = async (req: IRequestWithUser, res: express.Response) => {
    try {
        const id = req.params.Id;
        const note = await Note.findById(id);

        if ((note as unknown as INote).user !== req.user._id)
            throw new AppError(
                "Forbidden",
                403,
                "Not able to modify note",
                true
            );

        return res.status(200).send(note);
    } catch (err) {
        return res.send(err);
    }
};

// controller for the action of posting a note
const postNote = async (req: IRequestWithUser, res: express.Response) => {
    try {
        const newNote = new Note({
            _clientId: req.body._clientId,
            user: req.user._id,
            title: req.body?.title,
            text: req.body?.text,
            image: req.body?.image,
            reminderTime: req.body?.reminderTime,
            eventTime: req.body?.eventTime,
            pinned: req.body?.pinned,
            tags: req.body?.tags,
            relatedNotes: req.body?.relatedNotes,
        });

        await newNote.save();
        return res.status(200).send(newNote);
    } catch (err) {
        return res.send(err);
    }
};

// controller for updating a specific note
const putNote = async (req: IRequestWithUser, res: express.Response) => {
    try {
        const id = req.params.Id;
        const newData = req.body;
        let note = await Note.findById(id);

        if ((note as unknown as INote).user !== req.user._id)
            throw new AppError(
                "Forbidden",
                403,
                "Not able to modify note",
                true
            );

        note = Object.assign(newData);

        await note.save();
        return res.status(200).send(note);
    } catch (err) {
        return res.send(err);
    }
};

// controller for deleting a specific note
const deleteNote = async (req: IRequestWithUser, res: express.Response) => {
    try {
        const id = req.params.Id;
        let note = await Note.findById(id);

        if ((note as unknown as INote).user !== req.user._id)
            throw new AppError(
                "Forbidden",
                403,
                "Not able to modify note",
                true
            );

        await note.remove();
        return res.status(200).send();
    } catch (err) {
        return res.send(err);
    }
};

module.exports = {
    getNotes,
    getNote,
    postNote,
    putNote,
    deleteNote,
};
