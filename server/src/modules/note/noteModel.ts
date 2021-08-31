import mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: { type: String },
    text: { type: String },
    reminderTime: { type: Date },
    eventTime: { type: Date },
    pinned: { type: Boolean },
    tags: { type: [String], required: true },
    relatedNotes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Note",
        required: true,
    },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
