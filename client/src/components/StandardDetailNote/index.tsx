import React from "react";
import styles from "./StandardDetailNote.module.css";
import "semantic-ui-css/semantic.min.css";
import { NoteProps } from "../../interfaces/note";
import Text from "../ContentText/index";

import { Segment, Icon } from "semantic-ui-react";

// Added a the <Route path="/note" component={Note} /> for this
import Tag from "../Tag";
import HeadingText from "../HeadingText";

const StandardDetailNote = ({ note }: NoteProps): JSX.Element => {
    return (
        <div className={styles.Segment}>
            <Segment.Group raised>
                <Segment>
                    <div className={styles.whole}>
                        <div className={styles.top}>
                            <HeadingText
                                headingText={note.title ? note.title : ""}
                            />
                            <div className={styles.thumbtack}>
                                <Icon name="thumbtack" size="big" />
                            </div>
                        </div>
                        <div className={styles.middle}>
                            <Text text={note.text ? note.text : ""} />
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles.leftBottom}>
                                <Tag tagName={note.tags[0]} />
                                <div className={styles.editRow}>
                                    <Icon name="edit outline" size="big" />
                                    <div className={styles.editText}>
                                        Edit note
                                    </div>
                                </div>
                            </div>
                            <div className={styles.rightBottom}>
                                <Icon name="address book outline" size="big" />
                                <Icon name="bell slash outline" size="big" />
                                <Icon name="clock outline" size="big" />
                            </div>
                        </div>
                    </div>
                </Segment>
            </Segment.Group>
        </div>
    );
};

export default StandardDetailNote;
