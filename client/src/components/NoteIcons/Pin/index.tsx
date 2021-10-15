import React from "react";
import "semantic-ui-css/semantic.min.css";
import { NoteModes } from "../../../interfaces/note";

import { Icon } from "semantic-ui-react";
import styles from "./Pin.module.css";

type PinProps = {
    pinned: boolean;
    noteMode: NoteModes;
};

const Pin = ({ pinned, noteMode }: PinProps): JSX.Element => {
    if (noteMode === NoteModes.EDIT) {
        if (pinned === false) {
            return (
                <div className={styles.editMode}>
                    {"Pin"}
                    <Icon name="thumbtack" size="large" color="grey" />
                </div>
            );
        }
        if (pinned === true) {
            return (
                <div className={styles.editMode}>
                    {"Pinned"}
                    <Icon name="thumbtack" size="large" color="orange" />
                </div>
            );
        }
    }

    return <div></div>;
    // return (
    //     <div className={styles.time}>
    //         {timeVar + "  "}
    //         <Icon name="clock outline" color="grey" />
    //     </div>
    // );
};
export default Pin;
