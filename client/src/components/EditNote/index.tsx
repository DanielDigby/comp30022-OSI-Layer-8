import React from "react";
import styles from "./EditNote.module.css";
import "semantic-ui-css/semantic.min.css";
import { NoteProps } from "../../interfaces/note";
import Text from "../ContentText/index";

import { Segment, Icon } from "semantic-ui-react";

// Added a the <Route path="/note" component={Note} /> for this
import Tag from "../Tag";
import HeadingText from "../HeadingText";

const EditNote = ({ note }: NoteProps): JSX.Element => {
    return (
        <div className={styles.Segment}>
            <Segment.Group raised>
                <Segment>
                    <div className={styles.whole}>
                        <div className={styles.left}></div>
                        <div className={styles.right}>
                            <div className={styles.doneRow}>
                                <Icon name="check" size="big" />
                            </div>
                        </div>
                    </div>
                </Segment>
            </Segment.Group>
        </div>
    );
};

export default EditNote;
