import React from "react";
import styles from "./EditNote.module.css";
import "semantic-ui-css/semantic.min.css";
import { NoteProps } from "../../interfaces/note";
import Text from "../ContentText/index";
import { NoteModes } from "../../interfaces/note";

import { Segment, Icon } from "semantic-ui-react";
import Pin from "../NoteIcons/Pin/index";
import Time from "../NoteIcons/Time/index";
import Contact from "../NoteIcons/Contact/index";
import Reminder from "../NoteIcons/Reminder/index";

// Added a the <Route path="/note" component={Note} /> for this
import Tag from "../NoteIcons/Tag";
import HeadingText from "../HeadingText";

const EditNote = ({ note }: NoteProps): JSX.Element => {
    return (
        <div className={styles.Segment}>
            <Segment.Group raised>
                <Segment>
                    <div className={styles.wholeContainer}>
                        <div className={styles.leftContainer}>
                            <div className={styles.title}>
                                <HeadingText
                                    headingText={note.title ? note.title : ""}
                                    noteMode={NoteModes.EDIT}
                                />
                            </div>
                            <div className={styles.content}></div>
                        </div>
                        <div className={styles.rightContainer}>
                            <div className={styles.doneRow}>
                                <div className={styles.doneText}>Done</div>
                                <Icon name="check" size="big" color="orange" />
                            </div>
                            <div className={styles.fillerContainer}></div>
                            <div className={styles.buttonRows}>
                                <Pin
                                    pinned={note.pinned}
                                    noteMode={NoteModes.EDIT}
                                />
                                <Contact
                                    tags={note.tags}
                                    noteMode={NoteModes.EDIT}
                                />
                                <Reminder
                                    reminderTime={
                                        note.reminderTime
                                            ? note.reminderTime
                                            : null
                                    }
                                    noteMode={NoteModes.EDIT}
                                />
                                <Time
                                    timeVar={
                                        note.reminderTime
                                            ? note.reminderTime
                                            : null
                                    }
                                    noteMode={NoteModes.EDIT}
                                />
                            </div>
                        </div>
                    </div>
                </Segment>
            </Segment.Group>
        </div>
    );
};

export default EditNote;
