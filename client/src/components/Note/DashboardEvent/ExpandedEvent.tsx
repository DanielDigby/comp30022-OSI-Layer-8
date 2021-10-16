import React from "react";
import styles from "./ExpandedEvent.module.css";
import "semantic-ui-css/semantic.min.css";
import { INote } from "../../../interfaces/note";

import { Tag, Event } from "../icons";
import { Icon } from "semantic-ui-react";

const note: INote = {
    user: null,
    _id: "sdjfasdfa",
    _clientId: "sfhkjasd",
    title: "event title here",
    text: "test",
    image: "test",
    reminderTime: null,
    eventTime: null,
    pinned: false,
    tags: ["family"],
    relatedNotes: [],
};

const ExpandedEvent = ({ note }: { note: INote }): JSX.Element => {
    return (
        <div className={styles.Segment}>
            <div className="ui raised segment">
                <div className={styles.topContainer}>
                    <div className={styles.headingContainer}>
                        <div className={styles.heading}>
                            <b>{note.title}</b>
                        </div>
                        <div className={styles.spaceBetween}></div>
                        <div className={styles.bellContainer}>
                            <Icon name="bell slash outline" size="large" />
                        </div>
                    </div>
                    <div className={styles.textContainer}>{note.text}</div>
                    <a>{note.tags[0] && <Tag tag={note.tags[0]} />}</a>
                </div>

                <div className={styles.footerContainer}>
                    <div className={styles.goToNote}>
                        Go to Note
                        <Icon name="angle right" size="large" />
                    </div>
                    <div className={styles.timeAndClock}>
                        {note.eventTime && <Event time={""} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpandedEvent;
