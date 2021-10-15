import React from "react";
import { INote, NoteModes } from "../../interfaces/note";

interface NoteProps {
    note: INote;
    mode: NoteModes;
}
const Note = ({ note, mode }: NoteProps): JSX.Element => {
    if (mode == NoteModes.STANDARD) {
        return <StandardDetailNote note={note} mode={NoteModes.STANDARD} />;
    } else if (mode == NoteModes.EDIT) {
        return <EditNote note={note} mode={NoteModes.EDIT} />;
    }
};

export default Note;
