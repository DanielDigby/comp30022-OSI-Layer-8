import React from "react";
import { INote, NoteModes } from "../../interfaces/note";

// Added a the <Route path="/note" component={Note} /> for this
import StandardDetail from "./StandardDetail/index";
import EditNote from "./Edit/index";

/* Deleted NotesText folder and it's working now */
interface NoteProps {
    note: INote;
    mode: NoteModes;
}
const Note = ({ note, mode }: NoteProps): JSX.Element => {
    if (mode == NoteModes.STANDARD) {
        return <StandardDetail note={note} />;
    } else if (mode == NoteModes.EDIT) {
        return <EditNote note={note} />;
    }
};

export default Note;
