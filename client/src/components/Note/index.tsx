import React from "react";
import "semantic-ui-css/semantic.min.css";
import { INote, NoteModes } from "../../interfaces/note";

// Added a the <Route path="/note" component={Note} /> for this
import StandardDetailNote from "../StandardDetailNote/index";
import EditNote from "../EditNote/index";

/* Deleted NotesText folder and it's working now */
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
    return <div></div>;
};

export default Note;
