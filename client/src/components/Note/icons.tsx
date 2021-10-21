import React from "react";
import styles from "./Note.module.css";
import { capitalize } from "lodash";
import { Icon, Button } from "semantic-ui-react";
import { getColourScheme } from "../../helpers/api/users";

const styleProp = {
    fontSize: "17px",
    marginBottom: "5px",
    marginLeft: "5px",
    marginRight: "-2px",
};

export const Tag = ({ tag }: { tag: string }): JSX.Element => {
    if (tag)
        return (
            <div className={styles.tag}>
                <Icon name="tag" color="grey" />
                {capitalize(tag)}
            </div>
        );
    return <div />;
};

export const Bin = ({
    shouldDelete,
}: {
    shouldDelete: boolean;
}): JSX.Element => {
    return (
        <div className={styles.bin}>
            {shouldDelete ? (
                <Icon name="trash alternate" color="red" />
            ) : (
                <Icon name="trash alternate outline" color="grey" />
            )}
        </div>
    );
};

export const Upload = ({
    handleFile,
}: {
    handleFile: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}): JSX.Element => {
    return (
        <div>
            <Button
                as="label"
                htmlFor="file"
                size="large"
                icon="upload"
                style={{
                    backgroundColor: "transparent",
                    padding: "0px",
                    marginRight: "-1px",
                    marginLeft: "3px",
                }}
            />
            <input type="file" id="file" hidden onChange={handleFile} />
        </div>
    );
};

export const Pin = ({ pinned }: { pinned: boolean }): JSX.Element => {
    return (
        <Icon
            name="thumbtack"
            style={styleProp}
            color={pinned ? getColourScheme() : "grey"}
        />
    );
};

export const Contact = ({ tags }: { tags: Array<string> }): JSX.Element => {
    return (
        <Icon
            name="address book outline"
            style={styleProp}
            color={tags.includes("contact") ? getColourScheme() : "grey"}
        />
    );
};

export const Reminder = ({ time }: { time: string | null }): JSX.Element => {
    let display;
    if (time)
        display = new Date(time).toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    return (
        <div className={styles.time} id="reminder-time">
            {display}
            <Icon
                name={time ? "bell outline" : "bell slash outline"}
                style={styleProp}
                color={time ? getColourScheme() : "grey"}
            />
        </div>
    );
};

export const Event = ({ time }: { time: string | null }): JSX.Element => {
    let display;
    if (time)
        display = new Date(time).toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            day: "numeric",
            month: "short",
        });
    return (
        <div className={styles.time} id="event-time">
            {display}
            <Icon
                name="clock outline"
                style={styleProp}
                color={time ? getColourScheme() : "grey"}
            />
        </div>
    );
};
