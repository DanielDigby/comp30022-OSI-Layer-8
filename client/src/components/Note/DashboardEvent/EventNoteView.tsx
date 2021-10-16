import React from "react";
import styles from "./EventNote.module.css";
import "semantic-ui-css/semantic.min.css";
//import { INote, NoteModes } from "../../interfaces/note";
import { INote } from "../../../interfaces/note";

import { Tag, Event } from "../icons";
import { Icon } from "semantic-ui-react";

//import { store } from "../../config/redux/store";

/* Deleted NotesText folder and it's working now */
/*
interface NoteProps {
    note: INote;
    mode: NoteModes;
} */

//const sept = new Date("August 19, 2022");
//sept.setFullYear(2021, 8, 10);

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

const EventNoteView = (): JSX.Element => {
    // api call
    return (
        <div className={styles.Segment}>
            <div className="ui raised segment">
                <div className={styles.headingContainer}>
                    <div className={styles.heading}>
                        <b>{testNote.title}</b>
                    </div>
                    <div className={styles.time}>
                        {testNote.eventTime && (
                            <Event time={testNote.eventTime} />
                        )}
                    </div>
                </div>
                <p></p>
                <p></p>
                <a>{testNote.tags[0] && <Tag tag={testNote.tags[0]} />}</a>
            </div>
        </div>
    );
};

export default EventNoteView;
