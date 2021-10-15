import React, { useState } from "react";
import { Segment, Icon } from "semantic-ui-react";
import { INote, NoteModes } from "../../../interfaces/note";
import Note from "../../../components/Note";
import styles from "./NewNote.module.css";

const NewNote = (): JSX.Element => {
    const [isEditing, toggleEditing] = useState(false);
    const emptyNote: INote = {
        title: null,
        user: null,
        _id: null,
        _clientId: "",
        text: null,
        image: null,
        reminderTime: null,
        eventTime: null,
        pinned: false,
        tags: [],
        relatedNotes: [],
    };

    const toggleOn = () => {
        toggleEditing(true);
    };
    const toggleOff = () => {
        toggleEditing(false);
    };

    // api call
    if (isEditing)
        return (
            <div onClick={toggleOff}>
                <Note note={emptyNote} mode={NoteModes.EDIT} />
            </div>
        );
    else
        return (
            <div className={styles.container} onClick={toggleOn}>
                <Segment.Group raised>
                    <Segment>
                        <div className={styles.body}>
                            <Icon
                                name="edit outline"
                                size="large"
                                color="grey"
                            />
                            <div className={styles.text}>Add a new note</div>
                            <br />
                        </div>
                    </Segment>
                </Segment.Group>
            </div>
        );
};
export default NewNote;
