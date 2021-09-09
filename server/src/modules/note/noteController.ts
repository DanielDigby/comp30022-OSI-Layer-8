import express from "express";
import mongoose from "mongoose";

// import model
const Note = mongoose.model("Note");

// controller for getting all notes
const getNotes = async (req: express.Request, res: express.Response) => {
    try {
        const notes = await Note.find({}, {});

        return res.status(200).send(notes);
    } catch (err) {
        return res.send(err);
    }
    
};

// controller for getting a specific note
const getNote = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.Id;
        const note = Note.findById(id);

        return res.status(200).send(note);
    } catch (err) {
        return res.send(err);
    }
}

// controller for the action of posting a note
const postNote = async (req: express.Request, res: express.Response) => {
    try {
        const newNote = new Note({
            title: req.body?.title,
            text: req.body?.text,
            image: req.body?.image,
            reminderTime: req.body?.reminderTime,
            eventTime: req.body?.eventTime,
            pinned: req.body?.pinned,
            tags: req.body?.tags,
            relatedNotes: req.body?.relatedNotes
        });
    
        newNote.save();
        return res.status(200).send(newNote);
    } catch (err) {
        return res.send(err);
    }
};

// controller for updating a specific note
const putNote = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.Id;
        const newData  = req.body;
        const note = await Note.findByIdAndUpdate(id, newData).setOptions({ new: true, overwrite: true });

        return res.status(200).send(note);
    } catch (err) {
        return res.send(err);
    }
}

// controller for deleting a specific note
const deleteNote = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.Id;
        const deletedNote = await Note.findByIdAndDelete(id);

        return res.status(200).send(deletedNote);
    } catch (err) {
        return res.send(err);
    }
}

module.exports = {
    getNotes,
    getNote,
    postNote,
    putNote,
    deleteNote
};
