import express from "express";

const noteController = require("./noteController");
const noteRouter = express.Router();

// create a new note in database
noteRouter.post("/", express.json(), noteController.postNote);

// get all notes in database
noteRouter.get("/", noteController.getNotes);

// update a note
noteRouter.put("/:Id", express.json(), noteController.updateNote);

module.exports = noteRouter;
