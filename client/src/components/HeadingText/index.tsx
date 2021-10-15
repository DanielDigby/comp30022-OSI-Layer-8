import React from "react";
import "semantic-ui-css/semantic.min.css";
import styles from "./HeadingText.module.css";

type HeadingProps = {
    headingText: string;
};

const HeadingText = ({ headingText }: HeadingProps): JSX.Element => {
    // api call
    return <div className={styles.title}>{headingText}</div>;
};
export default HeadingText;
