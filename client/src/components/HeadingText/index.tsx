import React from "react";
import styles from "./Note.module.css";
import "semantic-ui-css/semantic.min.css";

type HeadingProps = {
    headingText: string;
};

const HeadingText = ({ headingText }: HeadingProps): JSX.Element => {
    // api call
    return (
        <div>
            {headingText}
        </div>
    );
};
export default HeadingText;
