import React from "react";
import "semantic-ui-css/semantic.min.css";

import { Icon } from "semantic-ui-react";

type TimeProps = {
    timeVar: string;
};

const Time = ({ timeVar }: TimeProps): JSX.Element => {
    // api call
    return (
        <div>
            {timeVar + "  "}
            <Icon name="clock outline" color="grey" />
        </div>
    );
};
export default Time;
