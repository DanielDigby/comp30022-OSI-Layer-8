import React from "react";
import styles from "./ExpandedEvent.module.css";
import "semantic-ui-css/semantic.min.css";
import { INote } from "../../../interfaces/note";

import { Tag, Event, Reminder, Pin } from "../icons";
import { Icon } from "semantic-ui-react";

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
                        <div className={styles.pinContainer}>
                            <Pin pinned={note.pinned} />
                        </div>
                    </div>
                    <div className={styles.textContainer}>{note.text}</div>
                    <div className={styles.tagContainer}>
                        {note.tags[0] && <Tag tag={note.tags[0]} />}
                    </div>
                </div>

                <div className={styles.footerContainer}>
                    <div className={styles.goToNote}>
                        Go to Note
                        <Icon name="angle right" size="large" />
                    </div>
                    <div className={styles.timeContainer}>
                        {note.reminderTime && (
                            <Reminder time={note.reminderTime} />
                        )}

                        {note.eventTime && <Event time={note.eventTime} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpandedEvent;
