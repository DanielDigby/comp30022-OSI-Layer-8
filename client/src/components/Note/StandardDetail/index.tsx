import React from "react";
import styles from "./StandardDetailNote.module.css";
import { Tag } from "../icons";
import { INote } from "../../../interfaces/note";
import { Segment, Icon } from "semantic-ui-react";

const StandardDetail = ({ note }: { note: INote }): JSX.Element => {
    return (
        <div className={styles.Segment}>
            <Segment.Group raised>
                <Segment>
                    <div className={styles.whole}>
                        <div className={styles.top}>
                            <div className={styles.title}>{note.title}</div>
                            <Icon name="thumbtack" size="big" color="grey" />
                        </div>
                        <div className={styles.text}>{note.text}</div>
                        <div className={styles.bottom}>
                            <div className={styles.leftBottom}>
                                <Tag tag={note.tags[0]} />
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

export default StandardDetail;
