import React from "react";
import styles from "./ColourBlocks.module.css";

import { Segment } from "semantic-ui-react";

const ColourBlocks = (): JSX.Element => {
    return (
        <div className={styles.blocks}>
            <div className={styles.block}>
                <Segment raised className={styles.colour}>
                    dark
                </Segment>
            </div>
            <div className={styles.block}>
                <Segment raised className={styles.colour}>
                    <div className={styles.dark}>ey</div>
                </Segment>
            </div>
        </div>
    );
};

export default ColourBlocks;
