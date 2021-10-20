import React from "react";
import styles from "./StandardNote.module.css";
import { Segment } from "semantic-ui-react";
import test from "./test.jpeg";

const Image = (): JSX.Element => {
    // api call
    return (
        <div className={styles.outerContainer}>
            <Segment.Group raised className={styles.imageSegmentStyle}>
                <img src={test} className={styles.image} />
            </Segment.Group>
        </div>
    );
};

export default Image;
