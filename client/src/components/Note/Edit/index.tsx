import React, { useState } from "react";
import styles from "./EditNote.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../config/redux/store";
import { INote, INoteWithoutIds } from "../../../interfaces/note";
import TextareaAutosize from "react-textarea-autosize";
import { Segment, Form, TextArea, Input } from "semantic-ui-react";
import { Tag, Pin, Contact, Reminder, Event } from "../icons";
import { createNoteAPI } from "../../../helpers/api/notes";

const EditNote = ({ note }: { note: INote }): JSX.Element => {
    const user = useSelector((state: RootState) => state.user.account);
    const {
        // title,
        // text,
        reminderTime,
        eventTime,
        // pinned,
        tags,
        // _id,
        // _clientId,
        // user,
        // image,
        // relatedNotes,
    } = note;

    const [title, setTitle] = useState(note.title ? note.title : "");
    const [text, setText] = useState(note.text ? note.text : "");
    const [pinned, togglePinned] = useState(note.pinned);

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };
    const pinOnClick = () => {
        togglePinned(!pinned);
    };

    const handleSubmit = async () => {
        const newNote: INoteWithoutIds = {
            title: title,
            user: user._id,
            text: text,
            image: null,
            reminderTime: null,
            eventTime: null,
            pinned: pinned,
            tags: [],
            relatedNotes: [],
        };
        createNoteAPI(newNote);
    };

    return (
        <div className={styles.Segment}>
            <Segment.Group raised>
                <Segment>
                    <Form onSubmit={handleSubmit}>
                        <div className={styles.wholeContainer}>
                            <div className={styles.scroll}>
                                <div className={styles.body}>
                                    <div className={styles.title}>
                                        <Input
                                            transparent
                                            placeholder="Add title"
                                            value={title}
                                            onChange={handleTitle}
                                        />
                                    </div>
                                    <div className={styles.content}>
                                        <Form.TextArea
                                            control={TextareaAutosize}
                                            style={{
                                                padding: "0px",
                                                border: "none",
                                                overflow: "hidden",
                                            }}
                                            placeholder="Tell us more"
                                            value={text}
                                            onChange={handleText}
                                        />
                                        <div className={styles.tag}>
                                            {tags[0] ? (
                                                <Tag tag={tags[0]} />
                                            ) : (
                                                <Tag tag="Add tag?" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.rightContainer}>
                                <div className={styles.doneRow}>
                                    <Form.Button
                                        icon="check"
                                        size="tiny"
                                        color="orange"
                                    />
                                </div>
                                <div className={styles.buttonRows}>
                                    <div
                                        className={styles.button}
                                        onClick={pinOnClick}
                                    >
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
                    </Form>
                </Segment>
            </Segment.Group>
        </div>
    );
};

export default EditNote;
