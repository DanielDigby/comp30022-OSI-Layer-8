import express = require("express");

const noteController = require("./noteController");
const noteRouter = express.Router();

// create a new note in database
noteRouter.post("/", noteController.postNote);

// get all notes in database
noteRouter.get("/", noteController.getNotes);

module.exports = noteRouter;
