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
    eventTime: null,
    pinned: false,
    tags: [],
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
                        <Icon name="clock outline" size="large" />
                        <div className={styles.space}></div>
                        November 16
                    </div>
                </div>
                <p></p>
                <p></p>
                <a>
                    <Tag tag="Social" />
                </a>
            </div>
        </div>
    );
};

export default EventNoteView;
