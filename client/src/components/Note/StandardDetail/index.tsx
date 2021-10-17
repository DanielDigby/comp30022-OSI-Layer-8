import React from "react";
import styles from "./StandardDetailNote.module.css";
import { INote } from "../../../interfaces/note";
import { Tag, Event, Reminder, Pin } from "../icons";
import { Segment, Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { setEditing } from "../../../config/redux/noteSlice";

const StandardDetail = ({ note }: { note: INote }): JSX.Element => {
    const dispatch = useDispatch();
    const {
        reminderTime,
        eventTime,
        tags,
        pinned,
        // title,
        // text,
        // _id,
        // _clientId,
        // user,
        // image,
        // relatedNotes,
    } = note;

    const edit = () => {
        dispatch(setEditing(note));
    };

    // api call
    return (
        <div className={styles.outerContainer}>
            <Segment.Group raised>
                <div className={styles.edit} onClick={edit}>
                    <Button circular icon="edit" size="tiny" />
                </div>
                <Segment color="orange" styles={{ zIndex: "0" }}>
                    <div className={styles.topContainer}>
                        <div className={styles.titleContainer}>
                            <b>{note.title ? note.title : ""}</b>
                        </div>
                        <div className={styles.pinContainer}>
                            <Pin pinned={pinned} />
                        </div>
                    </div>
                    <br />
                    <div className={styles.noteContainer}>
                        {note.text ? note.text : ""}
                    </div>
                    <br />
                    <div className={styles.tagContainer}>
                        {note.tags[0] && <Tag tag={tags[0]} />}
                    </div>
                    <div className={styles.timeContainer}>
                        {reminderTime && <Reminder time={reminderTime} />}

                        {eventTime && <Event time={eventTime} />}
                    </div>
                </Segment>
            </Segment.Group>
        </div>
    );
};

export default StandardDetail;
