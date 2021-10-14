import React from "react";
import "semantic-ui-css/semantic.min.css";

import { Icon } from "semantic-ui-react";
import { NoteModes } from "../../../interfaces/note";
import styles from "./Reminder.module.css";

type ReminderProps = {
    reminderTime: Date | null;
    noteMode: NoteModes;
};

const Reminder = ({ reminderTime, noteMode }: ReminderProps): JSX.Element => {
    if (noteMode === NoteModes.EDIT) {
        if (reminderTime === null) {
            return (
                <div className={styles.editMode}>
                    {"Add reminder"}
                    <Icon name="bell slash outline" size="large" color="grey" />
                </div>
            );
        }
        if (reminderTime !== null) {
            return (
                <div className={styles.editMode}>
                    {reminderTime}
                    <Icon
                        name="bell slash outline"
                        size="large"
                        color="orange"
                    />
                </div>
            );
        }
    }
    return <div></div>;
};
export default Reminder;
