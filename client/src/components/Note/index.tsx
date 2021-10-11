import React from "react";
import styles from "./Note.module.css";
import "semantic-ui-css/semantic.min.css";
import { INote, NoteModes } from "../../interfaces/note";

import { Segment } from "semantic-ui-react";

// Added a the <Route path="/note" component={Note} /> for this
import Tag from "../Tag";

/* Deleted NotesText folder and it's working now */
interface NoteProps {
    note: INote;
    mode: NoteModes;
}
const Note = ({ note }: NoteProps): JSX.Element => {
    // api call
    return (
        <div className={styles.container}>
            <Segment.Group raised>
                <Segment>
                    <div className={styles.body}>
                        <div className={styles.title}>
                            {note.title ? note.title : ""}
                        </div>
                        {note.text ? note.text : ""}
                        <br />
                        <br />
                        <Tag tagName="Event" />
                    </div>
                </Segment>
            </Segment.Group>
        </div>
    );
};

export default Note;
