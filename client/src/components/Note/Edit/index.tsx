import React from "react";
import styles from "./EditNote.module.css";
import { INote } from "../../../interfaces/note";
import { Segment, Icon } from "semantic-ui-react";
import { Tag, Pin, Contact, Reminder, Event } from "../icons";

const EditNote = ({ note }: { note: INote }): JSX.Element => {
    const {
        title,
        text,
        reminderTime,
        eventTime,
        pinned,
        tags,
        // _id,
        // _clientId,
        // user,
        // image,
        // relatedNotes,
    } = note;

    return (
        <div className={styles.Segment}>
            <Segment.Group raised>
                <Segment>
                    <div className={styles.wholeContainer}>
                        <div className={styles.scroll}>
                            <div className={styles.body}>
                                <div className={styles.title}>
                                    {title ? title : "Add title"}
                                </div>
                                <div className={styles.content}>
                                    {text ? text : "Add text"}
                                </div>

                                <div className={styles.tag}>
                                    {tags[0] ? (
                                        <Tag tag={tags[0]} />
                                    ) : (
                                        <Tag tag="Add tag?" />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.rightContainer}>
                            <div className={styles.doneRow}>
                                <div className={styles.doneText}>Done</div>
                                <Icon
                                    name="check"
                                    style={{ fontSize: "17px" }}
                                    color="orange"
                                />
                            </div>
                            <div className={styles.buttonRows}>
                                <div className={styles.button}>
                                    {pinned ? "Pinned" : "Pin"}
                                    <Pin pinned={pinned} />
                                </div>
                                <div className={styles.button}>
                                    {tags.includes("contact")
                                        ? "Added"
                                        : "Add as contact"}
                                    <Contact tags={tags} />
                                </div>
                                <div className={styles.button}>
                                    {!reminderTime && "Add reminder"}
                                    <Reminder time={reminderTime} />
                                </div>
                                <div className={styles.button}>
                                    {!eventTime && "Add event"}
                                    <Event time={eventTime} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Segment>
            </Segment.Group>
        </div>
    );
};

export default EditNote;
