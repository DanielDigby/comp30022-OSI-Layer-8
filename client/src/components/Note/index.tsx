import React from "react";
// import styles from "./Note.module.css";
import "semantic-ui-css/semantic.min.css";
import { INote, NoteModes } from "../../interfaces/note";

import { Segment } from "semantic-ui-react";

// Added a the <Route path="/note" component={Note} /> for this
import Tag from "../NoteIcons/Tag";
import HeadingText from "../HeadingText";
import StandardDetailNote from "../StandardDetailNote/index";
import EditNote from "../EditNote/index";

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
    return <div></div>;
    // return (
    //     <div className={styles.Segment}>
    //         <Segment.Group raised>
    //             <Segment>
    //                 <HeadingText headingText={note.title ? note.title : ""} />
    //                 <p></p>
    //                 <HeadingText headingText={note.text ? note.text : ""} />
    //                 <p></p>
    //                 <a>
    //                     <Tag tagName="Event" />
    //                 </a>
    //             </Segment>
    //         </Segment.Group>
    //     </div>
    // );
};

export default Note;
