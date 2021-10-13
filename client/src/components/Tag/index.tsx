import React from "react";
import "semantic-ui-css/semantic.min.css";
import styles from "./Tag.module.css";

import { Icon } from "semantic-ui-react";

type TagProps = {
    tagName: string;
};

const Tag = ({ tagName }: TagProps): JSX.Element => {
    // api call
    return (
        <div className={styles.tagRow}>
            <Icon name="tag" size="big" />
            <div className={styles.tagName}>{tagName}</div>
        </div>
    );
};
export default Tag;
