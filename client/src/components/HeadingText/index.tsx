import React from "react";
import "semantic-ui-css/semantic.min.css";
import { NoteModes } from "../../interfaces/note";
import styles from "./HeadingText.module.css";

type HeadingProps = {
    headingText: string;
    noteMode: NoteModes;
};

const HeadingText = ({ headingText, noteMode }: HeadingProps): JSX.Element => {
    if (noteMode === NoteModes.STANDARD_DETAIL) {
        return <div className={styles.standardDetailMode}>{headingText}</div>;
    } else if (noteMode === NoteModes.EDIT) {
        if (headingText === "") {
            return (
                <div className={styles.editPlaceholderMode}>{"Add title"}</div>
            );
        } else {
            return <div className={styles.editExistingMode}>{headingText}</div>;
        }
    }
    return <div></div>;
};
export default HeadingText;
