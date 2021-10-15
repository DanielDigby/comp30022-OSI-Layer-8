import React from "react";
import "semantic-ui-css/semantic.min.css";

import { Icon } from "semantic-ui-react";
import { NoteModes } from "../../../interfaces/note";
import styles from "./Time.module.css";

type TimeProps = {
    timeVar: Date | null;
    noteMode: NoteModes;
};

const Time = ({ timeVar, noteMode }: TimeProps): JSX.Element => {
    if (noteMode === NoteModes.EDIT) {
        return (
            <div className={styles.editMode}>
                {"Add event"}
                <Icon name="clock outline" size="large" color="grey" />
            </div>
        );
    }

    if (noteMode === NoteModes.STANDARD) {
        return (
            <div className={styles.standardMode}>
                {timeVar + "  "}
                <Icon name="clock outline" color="grey" />
            </div>
        );
    }
    return <div></div>;
};
export default Time;
