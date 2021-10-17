import React, { useState } from "react";
import { Segment, Icon } from "semantic-ui-react";
import { INote, NoteModes } from "../../../interfaces/note";
import Note from "../../../components/Note";
import styles from "./NewNote.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../config/redux/store";
import { clearEditing } from "../../../config/redux/noteSlice";

const NewNote = (): JSX.Element => {
    const dispatch = useDispatch();
    const editing = useSelector((state: RootState) => state.notes.editing);
    const [newEdit, toggleNewEdit] = useState(false);
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
        toggleNewEdit(true);
    };
    const toggleOff = () => {
        toggleNewEdit(false);
    };

    if (newEdit)
        return (
            <div className={styles.edit}>
                <Note
                    note={emptyNote}
                    mode={NoteModes.EDIT}
                    doneEditing={toggleOff}
                />
            </div>
        );
    else if (editing)
        return (
            <div className={styles.edit}>
                <Note
                    note={editing}
                    mode={NoteModes.EDIT}
                    doneEditing={() => dispatch(clearEditing())}
                />
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
