import express  from "express";
import mongoose from "mongoose";

// import model
const Note = mongoose.model("Note");

// controller for the action of posting a note
const postNote = async (req: express.Request, res: express.Response) => {
    try {
        const newNote = new Note({
            title: req.body?.title,
            text: req.body?.text,
            reminderTime: req.body?.reminderTime,
            eventTime: req.body?.eventTime,
            pinned: req.body?.pinned,
            tags: req.body?.tags,
            relatedNotes: req.body?.relatedNotes
        });
    
        newNote.save();
            //.then(() => res.status(200).send(newNote))
        return res.status(200).send(newNote);
    } catch (err) {
        console.log(err)
        return res.send(err);
    }
};

// controller for the action of getting all notes
const getNotes = async (req: express.Request, res: express.Response) => {
    const notes = await Note.find({}, {});

    res.status(200).send(notes);
};

module.exports = {
    getNotes,
    postNote
};
