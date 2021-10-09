import React from "react";
import styles from "./StandardDetailNote.module.css";
import "semantic-ui-css/semantic.min.css";
import { NoteProps } from "../../interfaces/note";
import Text from "../ContentText/index";

import { Segment } from "semantic-ui-react";

// Added a the <Route path="/note" component={Note} /> for this
import Tag from "../Tag";
import HeadingText from "../HeadingText";

const StandardDetailNote = ({ note }: NoteProps): JSX.Element => {
    return (
        <div className={styles.Segment}>
            <Segment.Group raised>
                <Segment>
                    <HeadingText headingText={note.title ? note.title : ""} />
                    <Text text={note.text ? note.text : ""} />
                    <a>
                        <Tag tagName={note.tags[0]} />
                    </a>
                </Segment>
            </Segment.Group>
        </div>
    );
};

export default StandardDetailNote;
