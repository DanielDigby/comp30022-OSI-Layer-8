import React from "react";
import "semantic-ui-css/semantic.min.css";
import { NoteModes } from "../../interfaces/note";
import styles from "./ContentText.module.css";

type TextProps = {
    text: string;
    noteMode: NoteModes;
};

const Text = ({ text, noteMode }: TextProps): JSX.Element => {
    if (noteMode === NoteModes.STANDARD_DETAIL) {
        return <div className={styles.standardDetailNote}>{text}</div>;
    } else if (noteMode === NoteModes.EDIT) {
        if (text === "") {
            return <div className={styles.emptyEditMode}>{"Add text"}</div>;
        } else {
            return <div className={styles.existingEditMode}>{text}</div>;
        }
    }
    return <div></div>;
};
export default Text;
