import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Segment, Icon } from "semantic-ui-react";
import styles from "./NewNote.module.css";

const NewNote = (): JSX.Element => {
    // api call
    return (
        <div className={styles.container}>
            <Segment.Group raised>
                <Segment>
                    <div className={styles.body}>
                        <Icon name="edit outline" size="large" color="grey" />
                        <div className={styles.text}>Add a new note</div>
                        <br />
                    </div>
                </Segment>
            </Segment.Group>
        </div>
    );
};
export default NewNote;
