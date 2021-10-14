import React from "react";
import "semantic-ui-css/semantic.min.css";

import { Icon } from "semantic-ui-react";
import styles from "./Time.module.css";

type TimeProps = {
    timeVar: string;
};

const Time = ({ timeVar }: TimeProps): JSX.Element => {
    // api call
    return (
        <div className={styles.time}>
            {timeVar + "  "}
            <Icon name="clock outline" color="grey" />
        </div>
    );
};
export default Time;
