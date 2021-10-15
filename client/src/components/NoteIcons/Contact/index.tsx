import React from "react";
import "semantic-ui-css/semantic.min.css";
import styles from "./Contact.module.css";

import { Icon } from "semantic-ui-react";
import { NoteModes } from "../../../interfaces/note";

type ContactProps = {
    tags: string[];
    noteMode: NoteModes;
};

const Contact = ({ tags, noteMode }: ContactProps): JSX.Element => {
    if (noteMode === NoteModes.EDIT) {
        if (!tags.includes("contact")) {
            return (
                <div className={styles.editMode}>
                    {"Add as contact"}
                    <Icon
                        name="address book outline"
                        size="large"
                        color="grey"
                    />
                </div>
            );
        }
        if (tags.includes("contact")) {
            return (
                <div className={styles.editMode}>
                    {"Added as contact"}
                    <Icon
                        name="address book outline"
                        size="large"
                        color="orange"
                    />
                </div>
            );
        }
    }
    return <div></div>;
};
export default Contact;
