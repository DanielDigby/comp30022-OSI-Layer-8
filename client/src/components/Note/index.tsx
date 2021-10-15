import React from "react";
// import styles from "./Note.module.css";
import "semantic-ui-css/semantic.min.css";
import { INote, NoteModes } from "../../interfaces/note";

/* Deleted NotesText folder and it's working now */
interface NoteProps {
    note: INote;
    mode: NoteModes;
}
const Note = ({ note, mode }: NoteProps): JSX.Element => {
    // api call
    if (mode == NoteModes.STANDARD) {
        return <StandardDetailNote note={note} mode={NoteModes.STANDARD} />;
    } else if (mode == NoteModes.EDIT) {
        return <EditNote note={note} mode={NoteModes.EDIT} />;
    }
};

export default Note;
