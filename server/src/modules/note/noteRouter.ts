import express from "express";
import { authenticate } from "passport";

const noteController = require("./noteController");
const noteRouter = express.Router();

// get all notes in database
noteRouter.get(
    "/",
    authenticate("jwt", { session: false }),
    noteController.getNotes
);

// get a specific note in database
noteRouter.get(
    "/:Id",
    authenticate("jwt", { session: false }),
    noteController.getNote
);

// create a new note in database
noteRouter.post(
    "/",
    authenticate("jwt", { session: false }),
    noteController.postNote
);

// update a note
noteRouter.put(
    "/:Id",
    authenticate("jwt", { session: false }),
    noteController.putNote
);

// delete a note
noteRouter.delete(
    "/:Id",
    authenticate("jwt", { session: false }),
    noteController.deleteNote
);

module.exports = noteRouter;
