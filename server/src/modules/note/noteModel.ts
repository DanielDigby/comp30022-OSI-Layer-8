import mongoose, { ObjectId } from "mongoose";

export interface INote extends Document {
    _clientId: string;
    user: ObjectId;
    title: string | null;
    text: string | null;
    image: string | null;
    reminderTime: Date | null;
    eventTime: Date | null;
    pinned: boolean;
    tags: Array<String>;
    relatedNotes: Array<ObjectId>;
}

const noteSchema = new mongoose.Schema({
    _clientId: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: { type: String },
    text: { type: String },
    image: { type: String },
    reminderTime: { type: Date },
    eventTime: { type: Date },
    pinned: { type: Boolean, default: false, required: true },
    tags: { type: [String], required: true },
    relatedNotes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Note",
        required: true,
    },
});

const Note = mongoose.model<INote>("Note", noteSchema);

module.exports = Note;
