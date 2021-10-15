import React from "react";
import Edit from "./Edit";
import Standard from "./Standard";
import StandardDetail from "./StandardDetail";
import { INote, NoteModes } from "../../interfaces/note";

interface NoteProps {
    note: INote;
    mode: NoteModes;
}
const Note = ({ note, mode }: NoteProps): JSX.Element => {
    switch (mode) {
        case NoteModes.STANDARD:
            return <Standard note={note} />;
        case NoteModes.STANDARD_DETAIL:
            return <StandardDetail note={note} />;
        case NoteModes.EVENT:
            return <div />;
        case NoteModes.EVENT_DETAIL:
            return <div />;
        case NoteModes.EDIT:
            return <Edit note={note} />;
        default:
            return <div />;
    }
};

export default Note;
