import React from "react";
import styles from "./Note.module.css";
import "semantic-ui-css/semantic.min.css";

import { Segment } from "semantic-ui-react";

// Added a the <Route path="/note" component={Note} /> for this
import Tag from "../Tag";
import HeadingText from "../HeadingText";

/* Deleted NotesText folder and it's working now */

const Note = (): JSX.Element => {
    // api call
    return (
        <div className={styles.Segment}>
            <Segment.Group raised>
                <Segment>
                    <HeadingText headingText="Heading here hopefully" />
                    <p></p>
                    <HeadingText headingText="Content here" />
                    <p></p>
                    <a>
                        <Tag tagName="Event" />
                    </a>
                </Segment>
            </Segment.Group>
        </div>
    );
};

export default Note;
