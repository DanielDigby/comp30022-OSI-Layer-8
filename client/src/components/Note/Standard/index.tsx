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

    let displayReminder;
    let displayEvent;
    if (reminderTime)
        displayReminder = reminderTime.toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            day: "numeric",
            month: "short",
        });
    else displayReminder = "";
    if (eventTime)
        displayEvent = eventTime.toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            day: "numeric",
            month: "short",
        });
    else displayEvent = "";
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
                    <div className={styles.eventContainer}>
                        {displayEvent && (
                            <span>
                                {/* {displayEvent} */}
                                <Event displayEvent={displayEvent} />
                            </span>
                        )}
                    </div>
                    <div className={styles.timeContainer}>
                        {displayReminder && (
                            <span>
                                {/* {displayReminder} */}
                                <Reminder displayReminder={displayReminder} />
                            </span>
                        )}
                    </div>
                </Segment>
            </Segment.Group>
        </div>
    );
};

export default StandardNote;
