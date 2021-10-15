import React from "react";
import styles from "./StandardNote.module.css";
import { INote } from "../../../interfaces/note";
import { Tag, Event, Reminder } from "../icons";
import { Segment, Icon } from "semantic-ui-react";

const StandardNote = ({ note }: { note: INote }): JSX.Element => {
    const {
        reminderTime,
        eventTime,
        tags,
        // title,
        // text,
        // pinned,
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
                            <Icon name="pin" color="grey" />
                        </div>
                    </div>
                    <br />
                    <div className={styles.noteContainer}>
                        {" "}
                        {note.text ? note.text : ""}{" "}
                    </div>
                    <br />
                    <div className={styles.tagContainer}>
                        <Tag tag={tags[0]} />
                    </div>
                    <div className={styles.eventContainer}>
                        <Event displayEvent={displayEvent} />
                    </div>
                    <div className={styles.timeContainer}>
                        <Reminder displayReminder={displayReminder} />
                    </div>
                </Segment>
            </Segment.Group>
        </div>
    );
};

export default StandardNote;
