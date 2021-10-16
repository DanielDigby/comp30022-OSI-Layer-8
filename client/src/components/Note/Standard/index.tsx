import React from "react";
import styles from "./StandardNote.module.css";
import { INote } from "../../../interfaces/note";
import { Tag, Event, Reminder, Pin } from "../icons";
import { Segment } from "semantic-ui-react";

const StandardNote = ({ note }: { note: INote }): JSX.Element => {
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

export default StandardNote;
