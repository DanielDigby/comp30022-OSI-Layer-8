import express from "express";

const noteController = require("./noteController");
const noteRouter = express.Router();

// get all notes in database
noteRouter.get("/", noteController.getNotes);

// get a specific note in database
noteRouter.get("/:Id", noteController.getNote);

// create a new note in database
noteRouter.post("/", noteController.postNote);

// update a note
noteRouter.put("/:Id", noteController.putNote);

// delete a note
noteRouter.delete("/:Id", noteController.deleteNote);

module.exports = noteRouter;
