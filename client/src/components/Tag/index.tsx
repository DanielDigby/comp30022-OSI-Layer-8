import React from "react";
import "semantic-ui-css/semantic.min.css";
import styles from "./Tag.module.css";

import { Icon } from "semantic-ui-react";

type TagProps = {
    tagName: string;
};

const Tag = ({ tagName }: TagProps): JSX.Element => {
    return (
<<<<<<< HEAD
        <div className={styles.tag}>
            <Icon name="tag" color="grey" />
            {tagName}
=======
        <div className={styles.tagRow}>
            <Icon name="tag" size="big" />
            <div className={styles.tagName}>{tagName}</div>
>>>>>>> 6e67809... feat: add all button symbols and format note
        </div>
    );
};
export default Tag;
