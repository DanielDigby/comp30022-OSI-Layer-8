import React from "react";
import "semantic-ui-css/semantic.min.css";
import styles from "./ExpandedEvent.module.css";
import { useHistory } from "react-router";
import { INote } from "../../../interfaces/note";
import { Segment, Button } from "semantic-ui-react";
import { Tag, Event, Reminder, Pin } from "../icons";
import { useDispatch } from "react-redux";
import { setEditing } from "../../../config/redux/noteSlice";
import { getColourScheme } from "../../../helpers/api/users";

const ExpandedEvent = ({ note }: { note: INote }): JSX.Element => {
    const history = useHistory();
    const dispatch = useDispatch();
    const edit = () => {
        dispatch(setEditing(note));
        history.push("/notes");
    };
    return (
        <div className={styles.Segment}>
            <Segment.Group raised>
                <div className={styles.edit} onClick={edit}>
                    <Button circular icon="edit" size="tiny" />
                </div>
                <Segment color={getColourScheme()} styles={{ zIndex: "0" }}>
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
                        <div className={styles.timeContainer}>
                            {note.reminderTime && (
                                <Reminder time={note.reminderTime} />
                            )}

                            {note.eventTime && <Event time={note.eventTime} />}
                        </div>
                    </div>
                </Segment>
            </Segment.Group>
        </div>
    );
};

export default ExpandedEvent;
