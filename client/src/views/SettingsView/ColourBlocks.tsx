import React from "react";
import styles from "./ColourBlocks.module.css";

import { Grid } from "semantic-ui-react";

const ColourBlocks = (): JSX.Element => {
    return (
        <div className={styles.blocks}>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
        </div>
    );
};

export default ColourBlocks;
