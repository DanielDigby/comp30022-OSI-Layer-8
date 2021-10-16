import React from "react";
import styles from "./EventNote.module.css";
import "semantic-ui-css/semantic.min.css";
import { INote } from "../../../interfaces/note";

import { Tag, Event } from "../icons";

const testNote: INote = {
    user: null,
    _id: "sdjfasdfa",
    _clientId: "sfhkjasd",
    title: "event title here",
    text: "test",
    image: "test",
    reminderTime: null,
    eventTime: "August 19, 2022",
    pinned: false,
    tags: ["social"],
    relatedNotes: [],
};

const EventNoteView = ({ note }: { note: INote }): JSX.Element => {
    // api call
    return (
        <div className={styles.Segment}>
            <div className="ui raised segment">
                <div className={styles.headingContainer}>
                    <div className={styles.heading}>
                        <b>{note.title}</b>
                    </div>
                    <div className={styles.time}>
                        {note.eventTime && <Event time={note.eventTime} />}
                    </div>
                </div>
                <p></p>
                <p></p>
                <a>{note.tags[0] && <Tag tag={note.tags[0]} />}</a>
            </div>
        </div>
    );
};

export default EventNoteView;
