import express from "express";
import { verifyJwt } from "../../helpers/security/index"

const noteController = require("./noteController");
const noteRouter = express.Router();

// get all notes in database
noteRouter.get("/", verifyJwt, noteController.getNotes);

// get a specific note in database
noteRouter.get("/:Id", verifyJwt, noteController.getNote);

// create a new note in database
noteRouter.post("/", verifyJwt, noteController.postNote);

// update a note
noteRouter.put("/:Id", verifyJwt, noteController.putNote);

// delete a note
noteRouter.delete("/:Id", verifyJwt, noteController.deleteNote);

module.exports = noteRouter;
