import express from "express";

const noteController = require("./noteController");
const noteRouter = express.Router();

// get all notes in database
noteRouter.get("/", noteController.getNotes);

// get a specific note in database
noteRouter.get("/:Id", noteController.getNote); 

// create a new note in database
noteRouter.post("/", express.json(), noteController.postNote);

// update a note
noteRouter.put("/:Id", express.json(), noteController.updateNote);

// delete a note
noteRouter.delete("/:Id", express.json(), noteController.deleteNote);

module.exports = noteRouter;
