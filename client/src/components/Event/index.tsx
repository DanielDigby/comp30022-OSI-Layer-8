import React from "react";
import "semantic-ui-css/semantic.min.css";
import styles from "./Event.module.css";
import { Icon } from "semantic-ui-react";

type EventProps = {
    eventName: string;
};

const Event = ({ eventName }: EventProps): JSX.Element => {
    // api call
    return (
        <div className={styles.event}>
            {eventName + "  "}
            <Icon name="calendar alternate" color="grey" />
        </div>
    );
};
export default Event;
