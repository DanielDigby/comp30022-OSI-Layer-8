import React from "react";
import styles from "./ColourBlocks.module.css";

import { Segment, Checkbox } from "semantic-ui-react";

const ColourBlocks = (): JSX.Element => {
    return (
        <div className={styles.blocks}>
            <div className={styles.block}>
                <Segment raised className={styles.colour}>
                    light
                </Segment>
                <Checkbox className={styles.checkbox} label="light" />
            </div>
            <div className={styles.block}>
                <Segment raised className={styles.colour}>
                    dark
                </Segment>
                <Checkbox className={styles.checkbox} label="dark" />
            </div>
            <div className={styles.block}>
                <Segment raised className={styles.colour}>
                    peach
                </Segment>
                <Checkbox className={styles.checkbox} label="peach" />
            </div>
            <div className={styles.block}>
                <Segment raised className={styles.colour}>
                    blue
                </Segment>
                <Checkbox className={styles.checkbox} label="blue" />
            </div>
            <div className={styles.block}>
                <Segment raised className={styles.colour}>
                    pink
                </Segment>
                <Checkbox className={styles.checkbox} label="pink" />
            </div>
        </div>
    );
};

export default ColourBlocks;
