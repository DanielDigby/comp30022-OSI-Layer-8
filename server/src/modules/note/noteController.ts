import express from "express";
import { AppError } from "../../helpers/errors";
import mongoose, { Document } from "mongoose";
import { IRequestWithUser } from "../../interfaces/expressInterfaces";
import { INote } from "./noteModel";

// import model
const Note = mongoose.model("Note");

// controller for getting all notes
const getNotes = async (req: IRequestWithUser, res: express.Response) => {
    try {
        const notes = await Note.find({ user: req.user._id });

        if (
            notes.length > 0 &&
            (notes[0] as unknown as INote).user.toString() !==
                req.user._id.toString()
        )
            throw new AppError(
                "Forbidden",
                403,
                "Not able to modify note",
                true
            );

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

        if (
            (note as unknown as INote).user.toString() !==
            req.user._id.toString()
        )
            throw new AppError("Forbidden", 403, "Not able to get note", true);

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

        if (
            (newNote as unknown as INote).user.toString() !==
            req.user._id.toString()
        )
            throw new AppError("Forbidden", 403, "Not able to post note", true);

        await newNote.save();
        return res.status(200).send(newNote);
    } catch (err) {
        return res.send(err);
    }
};

// controller for updating a specific note
const putNote = async (req: IRequestWithUser, res: express.Response) => {
    try {
        const updatedNote = req.body;
        const note = await Note.findOne(
            { _clientId: updatedNote._clientId },
            {}
        );
        if (
            (note as unknown as INote).user.toString() !==
            req.user._id.toString()
        )
            throw new AppError(
                "Forbidden",
                403,
                "Not able to modify note",
                true
            );

        Object.assign(note, updatedNote);

        await note.save();
        return res.status(200).send(note);
        // return res.send({message: 'No blah Found'});
    } catch (err) {
        return res.send(err);
    }
};

// controller for deleting a specific note
const deleteNote = async (req: IRequestWithUser, res: express.Response) => {
    try {
        const id = req.params.Id;
        let note = await Note.findById(id);

        if (
            (note as unknown as INote).user.toString() !==
            req.user._id.toString()
        )
            throw new AppError(
                "Forbidden",
                403,
                "Not able to delete note",
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
