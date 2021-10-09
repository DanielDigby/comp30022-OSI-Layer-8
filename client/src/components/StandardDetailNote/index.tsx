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
                    <div className={styles.top}>
                        <HeadingText
                            headingText={note.title ? note.title : ""}
                        />
                        <Icon name="thumbtack" size="large" />
                    </div>
                    <div className={styles.middle}>
                        <Text text={note.text ? note.text : ""} />
                    </div>
                    <div className={styles.bottom}>
                        <a>
                            <Tag tagName={note.tags[0]} />
                        </a>
                    </div>
                </Segment>
            </Segment.Group>
        </div>
    );
};

export default StandardDetailNote;
