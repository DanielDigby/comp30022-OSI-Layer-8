import React from "react";
import styles from "./Note.module.css";
import { Icon } from "semantic-ui-react";

const styleProp = {
    fontSize: "17px",
    marginBottom: "5px",
    marginRight: "-2px",
};

export const Tag = ({ tag }: { tag: string }): JSX.Element => {
    if (tag)
        return (
            <div className={styles.tag}>
                <Icon name="tag" style={styleProp} color="grey" />
                <span className={styles.tagText}>{tag}</span>
            </div>
        );
    return <div />;
};

export const Pin = ({ pinned }: { pinned: boolean }): JSX.Element => {
    return (
        <Icon
            name="thumbtack"
            style={styleProp}
            color={pinned ? "orange" : "grey"}
        />
    );
};

export const Contact = ({ tags }: { tags: Array<string> }): JSX.Element => {
    return (
        <Icon
            name="address book outline"
            style={styleProp}
            color={tags.includes("contact") ? "orange" : "grey"}
        />
    );
};

export const Reminder = ({
    displayReminder,
}: {
    displayReminder: string;
}): JSX.Element => {
    return (
        <Icon
            name={displayReminder ? "bell outline" : "bell slash outline"}
            style={styleProp}
            color={displayReminder !== "" ? "orange" : "grey"}
        />
    );
};

export const Event = ({
    displayEvent,
}: {
    displayEvent: string;
}): JSX.Element => {
    return (
        <Icon
            name="clock outline"
            style={styleProp}
            color={displayEvent !== "" ? "orange" : "grey"}
        />
    );
};
