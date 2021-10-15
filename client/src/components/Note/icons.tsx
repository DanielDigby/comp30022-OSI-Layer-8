import React from "react";
import styles from "./Note.module.css";
import { Icon } from "semantic-ui-react";

export const Tag = ({ tag }: { tag: string }): JSX.Element => {
    return (
        <div className={styles.tag}>
            <Icon name="tag" size="large" color="grey" />
            {tag ? tag : "Add tag?"}
        </div>
    );
};

export const Pin = ({ pinned }: { pinned: boolean }): JSX.Element => {
    return (
        <Icon
            name="thumbtack"
            size="large"
            color={pinned ? "orange" : "grey"}
        />
    );
};

export const Contact = ({ tags }: { tags: Array<string> }): JSX.Element => {
    return (
        <Icon
            name="address book outline"
            size="large"
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
            size="large"
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
            size="large"
            color={displayEvent !== "" ? "orange" : "grey"}
        />
    );
};
