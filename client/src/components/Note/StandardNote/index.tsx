import React from "react";
import styles from "./StandardNote.module.css";
import "semantic-ui-css/semantic.min.css";
import { INote } from "../../../interfaces/note";

import { Segment, Icon } from "semantic-ui-react";

// Added a the <Route path="/note" component={Note} /> for this
import Tag from "../../Tag";
import Event from "../../Event";
import Time from "../../Time";

/* Deleted NotesText folder and it's working now */
interface NoteProps {
    note: INote;
}
const StandardNote = ({ note }: NoteProps): JSX.Element => {
    // api call
    return (
        <div className={styles.outerContainer}>
            <Segment.Group raised>
                <Segment>
                    <div className={styles.topContainer}>
                        <div className={styles.titleContainer}>
                            <b>{note.title ? note.title : ""}</b>
                        </div>
                        <div className={styles.pinContainer}>
                            <Icon name="pin" color="grey" />
                        </div>
                    </div>
                    <br />
                    <div className={styles.noteContainer}>
                        {" "}
                        {note.text ? note.text : ""}{" "}
                    </div>
                    <br />
                    <div className={styles.tagContainer}>
                        <Tag tagName="Tag" />
                    </div>
                    <div className={styles.eventContainer}>
                        <Event eventName="1 Event" />
                    </div>
                    <div className={styles.timeContainer}>
                        <Time timeVar="Sep 5, 9:00 AM" />
                    </div>
                </Segment>
            </Segment.Group>
        </div>
    );
};

export default StandardNote;
